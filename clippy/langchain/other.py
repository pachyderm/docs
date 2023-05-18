from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import JSONLoader
import tiktoken

tokenizer = tiktoken.get_encoding('cl100k_base')

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=20,
    length_function=tiktoken_len,
    separators=["\n\n", "\n", " ", ""]
)

docs_index_path = "./docs.json" 
docs_index_schema = ".[]" # [{"body:..."}] -> .[].body; see JSONLoader docs for more info
loader = JSONLoader(docs_index_path, jq_schema=docs_index_schema, metadata_func=metadata_func, content_key="body") 
data = loader.load()

chunks = text_splitter.split_text(data[6]['text'])[:3]
chunks


# create the length function
def tiktoken_len(text):
    tokens = tokenizer.encode(
        text,
        disallowed_special=()
    )
    return len(tokens)