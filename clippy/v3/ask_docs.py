import os
from dotenv import load_dotenv
import uvicorn

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from langchain.llms import OpenAI 
from langchain.chains.question_answering import load_qa_chain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone 
from langchain.memory import ConversationBufferMemory

load_dotenv()
openai_key = os.environ.get('OPENAI_API_KEY')
pinecone_key = os.environ.get('PINECONE_API_KEY')
pinecone_environment = os.environ.get('PINECONE_ENVIRONMENT')
pinecone_index = "langchain1"

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

def convert_to_document(message):
    class Document:
        def __init__(self, page_content, metadata):
            self.page_content = page_content
            self.metadata = metadata
    return Document(page_content=message, metadata={})

def answer_question(question: str, vs, chain, memory):
    query = question
    docs = vs.similarity_search(query)
    conversation_history = memory.load_memory_variables(inputs={})["history"]
    context_window = conversation_history.split("\n")[-3:] 
    conversation_document = convert_to_document(context_window)
    input_documents = docs + [conversation_document]

    answer = chain.run(input_documents=input_documents, question=query)
    memory.save_context(inputs={"question": question}, outputs={"answer": answer})
    return {"answer": answer}

llm = OpenAI(temperature=0, openai_api_key=openai_key, max_tokens=-1) 
chain = load_qa_chain(llm, chain_type="stuff")
embeddings = OpenAIEmbeddings(openai_api_key=openai_key)
docsearch = Pinecone.from_existing_index(pinecone_index, embeddings)
memory = ConversationBufferMemory()

@app.get("/ask")
async def ask_question(query: str = Query(...)):
    return answer_question(question=query, vs=docsearch, chain=chain, memory=memory)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
