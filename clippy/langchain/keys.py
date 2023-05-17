import os

openai_key = os.environ.get('OPENAI_API_KEY')
pinecone_key = os.environ.get('PINECONE_API_KEY') or "be596285-2253-4a51-b363-13ffd1cc589f"
pinecone_environment = os.environ.get('PINECONE_ENVIRONMENT') or "us-central1-gcp"