import json
import os
import pandas as pd
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from embeddings import create_context, answer_question
import numpy as np

# Define the app and its endpoints
app = FastAPI()

# Define the request body
class Question(BaseModel):
    question: str

# Define the response body
class Answer(BaseModel):
    answer: str

# Load the processed dataframe
df = pd.read_csv("processed/embeddings.csv", index_col=0)
df['embeddings'] = df['embeddings'].apply(eval).apply(np.array)

@app.post("/answer", response_model=Answer)
async def get_answer(question: Question):
    """
    Given a question, return the answer based on the most similar context from the dataframe texts
    """
    context = create_context(question.question, df, max_len=1800, size="ada")
    answer = answer_question(df, question=question.question, debug=False)
    return Answer(answer=answer)