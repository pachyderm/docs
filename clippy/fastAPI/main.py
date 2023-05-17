from fastapi import FastAPI, Query
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from embeddings import loadDataframe, create_context, answer_question




# Define the app and its endpoints
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request body
class Question(BaseModel):
    question: str

# Define the response body
class Answer(BaseModel):
    answer: str

# # Load the processed dataframe
# df = pd.read_csv("processed/embeddings.csv", index_col=0)
# df['embeddings'] = df['embeddings'].apply(eval).apply(np.array)

@app.get("/ask")
def root(question: str = Query("What is Pachyderm?")):

    df = loadDataframe()
    create_context(question, df)
    answer = answer_question(df, question=question, debug=False)

    return {"answer": answer}

 