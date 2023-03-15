 
from dotenv import load_dotenv
import json
import numpy as np
import openai
from openai.embeddings_utils import distances_from_embeddings
import os
import pandas as pd
import tiktoken


load_dotenv()

# OpenAI API Creds

key = os.getenv("OPENAI_API_KEY")
max_tokens = 500
texts = []
shortened = []
tokenizer = tiktoken.get_encoding("cl100k_base")
context = ""

openai.api_key = key

def create_context(question, df, max_len=1800, size="ada"):
    """
    Create a context for a question by finding the most similar context from the dataframe
    """
    # Get the embeddings for the question
    q_embeddings = openai.Embedding.create(input=question, engine='text-embedding-ada-002')['data'][0]['embedding']

    # Compute distances from embeddings
    distances = distances_from_embeddings(q_embeddings, df['embeddings'].values, distance_metric='cosine')

    # Sort by distance
    df_sorted = df.loc[np.array(distances).argsort()]

    returns = []
    cur_len = 0

    # Add the text to the context until the context is too long
    for _, row in df_sorted.iterrows():
        # Add the length of the text to the current length
        cur_len += row['n_tokens'] + 4
        
        # If the context is too long, break
        if cur_len > max_len:
            break
        
        # Else add it to the text that is being returned
        returns.append(row["text"])

    # Return the context
    return "\n\n###\n\n".join(returns)

def answer_question(df, model="text-davinci-003", question="Am I allowed to publish model outputs to Twitter, without a human review?", max_len=1800, size="ada", debug=False, max_tokens=500, stop_sequence=None):
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

def load_embeddings(file_path):
    df = pd.read_csv(file_path, index_col=0)
    df['embeddings'] = df['embeddings'].apply(eval).apply(np.array)
    return df

def start(df):

    while True:
        # Prompt the user to input their question
        question = input("What is your question? (Type 'exit' to quit) ")
        if question.lower() == 'exit':
            break
        # Call the answer_question function with the user's question
        print("\n\n")
        print(answer_question(df, question=question, debug=False))
        print("\n\n")

def split_into_many(text, max_tokens=max_tokens):
    # Split the text into sentences
    sentences = text.split('. ')

    # Get the number of tokens for each sentence
    n_tokens = [len(tokenizer.encode(" " + sentence)) for sentence in sentences]

    chunks = []
    chunk_tokens = 0
    chunk = []

    # Loop through the sentences and tokens joined together in a tuple
    for sentence, token in zip(sentences, n_tokens):
        # If the number of tokens so far plus the number of tokens in the current sentence is greater
        # than the max number of tokens, then add the chunk to the list of chunks and reset
        # the chunk and tokens so far
        if chunk_tokens + token > max_tokens:
            chunks.append(". ".join(chunk) + ".")
            chunk = []
            chunk_tokens = 0

        # If the number of tokens in the current sentence is greater than the max number of
        # tokens, go to the next sentence
        if token > max_tokens:
            continue

        # Otherwise, add the sentence to the chunk and add the number of tokens to the total
        chunk.append(sentence)
        chunk_tokens += token + 1

    # Add the last chunk to the list of chunks
    if chunk:
        chunks.append(". ".join(chunk) + ".")

    return chunks

def loadDataframe():
    # Check if embeddings exist, if yes, load the dataframe from embeddings.csv
    if os.path.exists('processed/embeddings.csv'):
        df = load_embeddings('processed/embeddings.csv')
        return df 

    else:
        # Load the docs.json file
        with open("docs.json", "r") as f:
            docs = json.load(f)

        # Extract article body attribute if not empty string and push to texts array.
        for doc in docs:
            text = doc.get("body", "")
            if text:
                fname = doc["title"]
                texts.append((fname, text))

        # Create a dataframe from the list of texts
        df = pd.DataFrame(texts, columns=["fname", "text"])

        print("dataframe: ", df)

        # Set the text column to be the raw text 
        df["text"] = df.text
        df.to_csv("processed/docs.csv")
        df.head()

        df = pd.read_csv('processed/docs.csv', index_col=0)
        df.columns = ['title', 'text']

        # Tokenize the text and save the number of tokens to a new column
        df['n_tokens'] = df.text.apply(lambda x: len(tokenizer.encode(x)))

        # Visualize the distribution of the number of tokens per row using a histogram
        df.n_tokens.hist()


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

def handler(event):
    # Get the question from the event
    question = event['queryStringParameters'].get('question', 'What is Pachyderm?')

    # Load the dataframe
    df = loadDataframe()

    # Get the answer
    answer = answer_question(df, question=question, debug=False)

    # Create the response
    response = {
        "statusCode": 200,
        "body": json.dumps({"answer": answer}),
        "headers": {
            "Content-Type": "application/json"
        }
    }

    return response


df = loadDataframe()
start(df)