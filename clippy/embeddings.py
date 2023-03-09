################################################################################
### Step 1
################################################################################

import json
import requests
import re
import urllib.request
from bs4 import BeautifulSoup
from collections import deque
from html.parser import HTMLParser
from urllib.parse import urlparse
import os
import pandas as pd
import tiktoken
import openai
from openai.embeddings_utils import distances_from_embeddings
import numpy as np
from openai.embeddings_utils import distances_from_embeddings, cosine_similarity
 
# Set up OpenAI API credentials
openai.api_key = "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"

# Load the docs.json file
with open("docs.json", "r") as f:
    docs = json.load(f)

# Create a list to store the texts
texts = []

# Extract the text from the body attribute of each document in docs, if it's not an empty string
for doc in docs:
    text = doc.get("body", "")
    if text:
        # Omit the "latest" version string from the filename
        fname = doc["title"]
        texts.append((fname, text))

# Create a dataframe from the list of texts
df = pd.DataFrame(texts, columns=["fname", "text"])

# Set the text column to be the raw text 
df["text"] = df.text

# Save the processed dataframe to a CSV file
df.to_csv("processed/docs.csv")

# Load the cl100k_base tokenizer which is designed to work with the ada-002 model
tokenizer = tiktoken.get_encoding("cl100k_base")

# Load the processed dataframe
df = pd.read_csv("processed/docs.csv", index_col=0)

# Rename the "body" column to "text"
df = df.rename(columns={"body": "text"})

# Check if the embeddings file exists
if os.path.isfile("processed/embeddings.csv"):
    # Load the embeddings from the file
    df_embeddings = pd.read_csv("processed/embeddings.csv", index_col=0)
    df_embeddings["embeddings"] = df_embeddings["embeddings"].apply(eval).apply(np.array)
    df = pd.merge(df, df_embeddings, on="text")
else:
    # Tokenize the text and save the number of tokens to a new column
    df["n_tokens"] = df.text.apply(lambda x: len(tokenizer.encode(x)))

    # Split the text into chunks and save the number of tokens to a new column
    max_tokens = 500
    df["chunks"] = df.text.apply(lambda x: split_into_many(x, max_tokens))
    df["n_tokens_chunks"] = df.chunks.apply(lambda x: [len(tokenizer.encode(" " + chunk)) for chunk in x])

    # Flatten the list of chunks and their token counts into separate rows
    df = df.explode(["chunks", "n_tokens_chunks"]).reset_index(drop=True)

    # Convert the token counts to integers
    df["n_tokens_chunks"] = df["n_tokens_chunks"].astype(int)

    # Compute the embeddings for each chunk
    df_embeddings = df.groupby(["chunks"]).apply(lambda x: compute_embeddings(x["text"], x["n_tokens_chunks"])).reset_index().rename(columns={0: "embeddings"})

    # Merge the embeddings back into the original dataframe
    df = pd.merge(df, df_embeddings, on="chunks")

    # Save the embeddings to a CSV file
    df_embeddings.to_csv("processed/embeddings.csv", index=False)

# Visualize the distribution of the number of tokens per row using a histogram
df.n_tokens.hist()

################################################################################
### Step 3
################################################################################

max_tokens = 500

# Function to split the text into chunks of a maximum number of tokens
def split_into_many(text, max_tokens = max_tokens):

    # Split the text into sentences
    sentences = text.split('. ')

    # Get the number of tokens for each sentence
    n_tokens = [len(tokenizer.encode(" " + sentence)) for sentence in sentences]
    
    chunks = []
    tokens_so_far = 0
    chunk = []

    # Loop through the sentences and tokens joined together in a tuple
    for sentence, token in zip(sentences, n_tokens):

        # If the number of tokens so far plus the number of tokens in the current sentence is greater 
        # than the max number of tokens, then add the chunk to the list of chunks and reset
        # the chunk and tokens so far
        if tokens_so_far + token > max_tokens:
            chunks.append(". ".join(chunk) + ".")
            chunk = []
            tokens_so_far = 0

        # If the number of tokens in the current sentence is greater than the max number of 
        # tokens, go to the next sentence
        if token > max_tokens:
            continue

        # Otherwise, add the sentence to the chunk and add the number of tokens to the total
        chunk.append(sentence)
        tokens_so_far += token + 1

    return chunks
    

shortened = []

# Loop through the dataframe
for row in df.iterrows():

    # If the text is None, go to the next row
    if row[1]['text'] is None:
        continue

    # If the number of tokens is greater than the max number of tokens, split the text into chunks
    if row[1]['n_tokens'] > max_tokens:
        shortened += split_into_many(row[1]['text'])
    
    # Otherwise, add the text to the list of shortened texts
    else:
        shortened.append( row[1]['text'] )

################################################################################
### Step 4
################################################################################

df = pd.DataFrame(shortened, columns = ['text'])
df['n_tokens'] = df.text.apply(lambda x: len(tokenizer.encode(x)))
df.n_tokens.hist()

################################################################################
### Step 5
################################################################################

# Note that you may run into rate limit issues depending on how many files you try to embed
# Please check out our rate limit guide to learn more on how to handle this: https://platform.openai.com/docs/guides/rate-limits

df['embeddings'] = df.text.apply(lambda x: openai.Embedding.create(input=x, engine='text-embedding-ada-002')['data'][0]['embedding'])
df.to_csv('processed/embeddings.csv')
df.head()

################################################################################
### Step 6
################################################################################

df=pd.read_csv('processed/embeddings.csv', index_col=0)
df['embeddings'] = df['embeddings'].apply(eval).apply(np.array)

df.head()

################################################################################
### Step 7
################################################################################

def create_context(
    question, df, max_len=1800, size="ada"
):
    """
    Create a context for a question by finding the most similar context from the dataframe
    """

    # Get the embeddings for the question
    q_embeddings = openai.Embedding.create(input=question, engine='text-embedding-ada-002')['data'][0]['embedding']

    # Get the distances from the embeddings
    df['distances'] = distances_from_embeddings(q_embeddings, df['embeddings'].values, distance_metric='cosine')


    returns = []
    cur_len = 0

    # Sort by distance and add the text to the context until the context is too long
    for i, row in df.sort_values('distances', ascending=True).iterrows():
        
        # Add the length of the text to the current length
        cur_len += row['n_tokens'] + 4
        
        # If the context is too long, break
        if cur_len > max_len:
            break
        
        # Else add it to the text that is being returned
        returns.append(row["text"])

    # Return the context
    return "\n\n###\n\n".join(returns)

def answer_question(
    df,
    model="text-davinci-003",
    question="Am I allowed to publish model outputs to Twitter, without a human review?",
    max_len=1800,
    size="ada",
    debug=False,
    max_tokens=300,
    stop_sequence=None
):
    """
    Answer a question based on the most similar context from the dataframe texts
    """
    context = create_context(
        question,
        df,
        max_len=max_len,
        size=size,
    )
    # If debug, print the raw model response
    if debug:
        print("Context:\n" + context)
        print("\n\n")

    try:
        # Create a completions using the questin and context
        response = openai.Completion.create(
            prompt=f"Answer the question based on the context below, and if the question can't be answered based on the context, say \"I don't know\"\n\nContext: {context}\n\n---\n\nQuestion: {question}\nAnswer:",
            temperature=0,
            max_tokens=max_tokens,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            stop=stop_sequence,
            model=model,
        )
        return response["choices"][0]["text"].strip()
    except Exception as e:
        print(e)
        return ""

################################################################################
### Step 8
################################################################################

print(answer_question(df, question="How do I install pachyderm with docker desktop?", debug=False))

