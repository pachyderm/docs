## VectorStores & OpenAI Embeddings  

from langchain.vectorstores import Pinecone 
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone 
import keys

embeddings = OpenAIEmbeddings(openai_api_key=keys.openai_key)

### Initialize Pinecone Vector Store

pinecone.init(
    api_key=keys.pinecone_key,
    environment=keys.pinecone_environment,
)
pinecone_index = "langchain1"


