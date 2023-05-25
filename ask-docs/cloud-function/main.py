import os

from langchain.llms import OpenAI 
from langchain.chains.question_answering import load_qa_chain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone 
from langchain.memory import ConversationBufferMemory

openai_key = ""
pinecone_key = ""
pinecone_environment = ""
pinecone_index = ""


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

import functions_framework

@functions_framework.http
def start(request):
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'query' in request_json:
        query = request_json['query']

    elif request_args and 'query' in request_args:
        query = request_args['query']
    else:
        query = 'What is Pachyderm?'

    return answer_question(question=query, vs=docsearch, chain=chain, memory=memory)