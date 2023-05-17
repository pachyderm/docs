## Data Loader & Imported Data 

from langchain.document_loaders.pdf import UnstructuredPDFLoader, OnlinePDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = OnlinePDFLoader("https://www.wolfpaulus.com/wp-content/uploads/2017/05/field-guide-to-data-science.pdf")
data = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(data)

## VectorStores & OpenAI Embeddings  

from langchain.vectorstores import Pinecone 
import vectorstore

Pinecone.add_texts([t.page_content for t in texts], vectorstore.embeddings, index_name=vectorstore.pinecone_index)

