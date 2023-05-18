from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain.llms import OpenAI 
from langchain.chains.question_answering import load_qa_chain
import keys
from store import docsearch

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

def answer_question(question: str, vs, chain):
    query = question
    docs = vs.similarity_search(query)
    answer = chain.run(input_documents=docs, question=query)
    return {"answer": answer}


llm = OpenAI(temperature=0, openai_api_key=keys.openai_key) 
chain = load_qa_chain(llm, chain_type="stuff")

def prompt_question():
    while True:
        question = input("What is your question? (Type 'exit' to quit) ")
        if question.lower() == 'exit':
            break
        print(answer_question(question=question, vs=docsearch, chain=chain))
        print("\n")

if __name__ == "__main__":
    prompt_question()
