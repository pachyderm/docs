## Data Loader & Imported Data 

from langchain.document_loaders.pdf import UnstructuredPDFLoader, OnlinePDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

##### Notes: needed to install dependencies such as pip install unstructured, pytesseract, pdf2image; 
##### you can use various loader options, such as UnstructuredPDFLoader, OnlinePDFLoader, OnlinePDFLoader, etc. 

loader = OnlinePDFLoader("https://www.wolfpaulus.com/wp-content/uploads/2017/05/field-guide-to-data-science.pdf")
data = loader.load()
print(f'You have {len(data)} pages of data')
print(f'There are {len(data[0].page_content)} characters in your document')

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(data)
print(f'You now have {len(texts)} chunks of text')

## VectorStores & OpenAI Embeddings  

from langchain.vectorstores import Pinecone 
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone 
import os

openai_key = os.environ.get('OPENAI_API_KEY')
pinecone_key = os.environ.get('PINECONE_API_KEY') or "be596285-2253-4a51-b363-13ffd1cc589f"
pinecone_environment = os.environ.get('PINECONE_ENVIRONMENT') or "us-central1-gcp"

embeddings = OpenAIEmbeddings(openai_api_key=openai_key)

### Initialize Pinecone Vector Store

pinecone.init(
    api_key=pinecone_key,
    environment=pinecone_environment,
)
pinecone_index = "langchain1"

docsearch = Pinecone.from_texts([t.page_content for t in texts], embeddings, index_name=pinecone_index)

### Query via OpenAI 

from langchain.llms import OpenAI 
from langchain.chains.question_answering import load_qa_chain

llm = OpenAI(temperature=0, openai_api_key=openai_key) 
 
chain = load_qa_chain(llm, chain_type="stuff")

query = "What are examples of good data science teams?"
docs = docsearch.similarity_search(query)

chain.run(input_documents=docs, question=query)