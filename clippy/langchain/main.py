from fastapi import FastAPI, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from langchain.llms import OpenAI 
from langchain.chains.question_answering import load_qa_chain
from langchain.vectorstores import Pinecone 
import keys
import store

app = FastAPI(
    title="LangChain DocsGPT",
    description="The backend for LangChain DocsGPT.",
    version="0.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


llm = OpenAI(temperature=0, openai_api_key=keys.openai_key) 
chain = load_qa_chain(llm, chain_type="stuff")

def answer_question(question: str):
    docs = Pinecone.similarity_search(question)
    answer = chain.run(input_documents=docs, question=question)
    print(answer)
    return answer["answer"]

@app.get("/ask")
def ask_question_get(request: Request, question: str = Query(None)):
    if question:
        return {"answer": answer_question(question)}
    else:
        return {"message": "Please provide a question."}

@app.post("/ask")
async def ask_question_post(request: Request):
    question = await request.json()
    return {"answer": answer_question(question["question"])}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
