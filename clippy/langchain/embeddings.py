## Data Loader & Imported Data 

from langchain.document_loaders import JSONLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

docs_index_path = "./docs.json"
docs_index_schema = ".[].body" # [{"body:..."}] -> .[].body; see JSONLoader docs for more info
loader = JSONLoader(docs_index_path, jq_schema=docs_index_schema) 
data = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=0)
texts = text_splitter.split_documents(data) 

## VectorStores & OpenAI Embeddings  

from langchain.vectorstores import Pinecone 
from store import embeddings, pinecone_index
import pinecone 
import store


print(pinecone.list_indexes())
indexExists = pinecone.describe_index(pinecone_index)

if indexExists:
    print("Index already exists! We need to replace it with a new one.")
    print("Erasing existing index...")
    pinecone.delete_index(pinecone_index) # delete index if it exists so we can recreate it

print("Recreating index...")
pinecone.create_index(pinecone_index, metric="cosine", dimension=1536, pods=1, pod_type="p1") 
print(f'Loading {len(texts)} texts to index {pinecone_index}...')
print(f"This may take a while. Here's a preview of the first text: \n {texts[0].page_content}")
Pinecone.from_texts([t.page_content for t in texts], embeddings, index_name=pinecone_index)
print("Done!")

