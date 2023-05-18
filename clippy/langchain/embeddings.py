## Data Loader & Imported Data 
from langchain.document_loaders import JSONLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

def metadata_func(record: dict, metadata: dict) -> dict:
    metadata["title"] = record.get("title")
    metadata["relURI"] = record.get("relURI")
    return metadata

docs_index_path = "./docs.json" 
docs_index_schema = ".[]" # [{"body:..."}] -> .[].body; see JSONLoader docs for more info
loader = JSONLoader(docs_index_path, jq_schema=docs_index_schema, metadata_func=metadata_func, content_key="body") 
data = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0,) # separators=["\n\n", "\n", " ", ""]
texts = text_splitter.split_documents(data) 

## VectorStores & OpenAI Embeddings  

from langchain.vectorstores import Pinecone 
from store import embeddings, pinecone_index
import pinecone 
import store

if pinecone_index in pinecone.list_indexes():
    print(f'The {pinecone_index} index already exists! We need to replace it with a new one.')
    print("Erasing existing index...")
    pinecone.delete_index(pinecone_index) # delete index if it exists so we can recreate it

print("Recreating index...")
pinecone.create_index(pinecone_index, metric="dotproduct", dimension=1536, pods=1, pod_type="p1") 


print(f'Loading {len(texts)} texts to index {pinecone_index}...')
print(f"This may take a while. Here's a preview of the first text: \n {texts[0].metadata} \n {texts[0].page_content}")
for chunk in chunks(texts, 50):
    for doc in chunk:
        if doc.page_content.strip():  # Check if the content is not blank or empty
            Pinecone.from_texts([doc.page_content], embeddings, index_name=pinecone_index)
        else:
            print("Ignoring blank document")
print("Done!")  

