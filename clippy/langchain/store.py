## VectorStores & OpenAI Embeddings  

from langchain.vectorstores import Pinecone 
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone 
import config

embeddings = OpenAIEmbeddings(openai_api_key=config.openai_key)

### Initialize Pinecone Vector Store

pinecone.init(
    api_key=config.pinecone_key,
    environment=config.pinecone_environment,
)

docsearch = Pinecone.from_existing_index(config.pinecone_index, embeddings)

