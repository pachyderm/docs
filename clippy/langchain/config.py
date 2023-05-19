import os
from dotenv import load_dotenv

load_dotenv()
openai_key = os.environ.get('OPENAI_API_KEY')
pinecone_key = os.environ.get('PINECONE_API_KEY')
pinecone_environment = os.environ.get('PINECONE_ENVIRONMENT')
pinecone_index = "langchain1"