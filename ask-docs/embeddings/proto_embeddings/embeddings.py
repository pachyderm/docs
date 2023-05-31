import os
from dotenv import load_dotenv
import time

from langchain.document_loaders import TextLoader
from langchain.text_splitter import  RecursiveCharacterTextSplitter, Language
from langchain.vectorstores import Pinecone 
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone 

load_dotenv()
openai_key = os.environ.get('OPENAI_API_KEY')
pinecone_key = os.environ.get('PINECONE_API_KEY')
pinecone_environment = os.environ.get('PINECONE_ENVIRONMENT')
pinecone_index = "langchain1"

proto_path = "./main.proto" 
embeddings = OpenAIEmbeddings(openai_api_key=openai_key)
text_splitter = RecursiveCharacterTextSplitter.from_language(Language.PROTO)

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


loader = TextLoader(proto_path) 

data = loader.load()
print(f"Loaded {len(data)} documents from {proto_path}")
texts = text_splitter.split_documents(data) 
print(f"Split {len(texts)} documents into sentences")
print (texts[0])

pinecone.init(
    api_key=pinecone_key,
    environment=pinecone_environment,
)

# if pinecone_index in pinecone.list_indexes():
#     print(f'The {pinecone_index} index already exists! We need to replace it with a new one.')
#     print("Erasing existing index...")
#     pinecone.delete_index(pinecone_index) 

# time.sleep(60)
# print("Recreating index...")
# # wait a minute for the index to be deleted
# pinecone.create_index(pinecone_index, metric="dotproduct", dimension=1536, pods=1, pod_type="p1") 


if pinecone_index in pinecone.list_indexes():

    print(f"Loading {len(texts)} texts to index {pinecone_index}... \n This may take a while. Here's a preview of the first text: \n {texts[0].metadata} \n {texts[0].page_content}")

    for chunk in chunks(texts, 50):
        for doc in chunk:
            if doc.page_content.strip(): 
                
                print(f"Content: {doc.page_content}")
                Pinecone.from_texts([doc.page_content], embedding=embeddings, index_name=pinecone_index)
            else:
                print("Ignoring blank document")
    print("Done!")  

