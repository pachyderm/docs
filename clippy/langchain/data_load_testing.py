## Data Loader & Imported Data 

from langchain.document_loaders import JSONLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Chunk function; Pinecone has a limit of 100 documents per request
def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


# Get any other details we want from the json index associated with an article.
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


print(f'{texts[0].metadata}')
print(f'{texts[1].metadata}')
print(f'{texts[2]}')
print(f'{texts[3]}')


