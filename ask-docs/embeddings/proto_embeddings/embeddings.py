import os
from dotenv import load_dotenv
import time

from langchain.document_loaders import TextLoader
from langchain.text_splitter import  RecursiveCharacterTextSplitter, Language
from langchain.vectorstores import Pinecone 
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone 

load_dotenv()
openai_key = os.environ.get('OPENAI_API_KEY')
pinecone_key = os.environ.get('PINECONE_API_KEY')
pinecone_environment = os.environ.get('PINECONE_ENVIRONMENT')
pinecone_index = "langchain1"


def metadataFunc(record: dict, metadata: dict) -> dict:
    # use the filename as the title
    metadata["title"] = record.get("title")
    # use the string after "package" as the package name
    metadata["package"] = record.get("package")
    print(f"Metadata: {metadata}")
    return metadata

# get all of the proto files in /all-protos
protos = []
for filename in os.listdir('protobufs'):
    if filename.endswith(".proto"):
        protos.append(os.path.join('protobufs', filename))
embeddings = OpenAIEmbeddings(openai_api_key=openai_key)

text_splitter = RecursiveCharacterTextSplitter.from_language(Language.PROTO, chunk_size=600, chunk_overlap=60)

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

all_texts = []

for proto in protos:
    print(f"Loading {proto}...")
    loader = TextLoader(proto) 
    loadedData = loader.load()
    texts = text_splitter.split_documents(loadedData) 
    print(f"Number of texts: {len(texts)}")
    all_texts.append(texts) 

# print the total number of texts
print(f"Total number of all_texts: {len(all_texts)}")

# store all_texts in a file
with open('texts.txt', 'w') as f:
    for item in all_texts:
        f.write("%s\n" % item)
        f.write("\n")
        f.write("\n")
        
pinecone.init(
    api_key=pinecone_key,
    environment=pinecone_environment,
)

# # if pinecone_index in pinecone.list_indexes():
# #     print(f'The {pinecone_index} index already exists! We need to replace it with a new one.')
# #     print("Erasing existing index...")
# #     pinecone.delete_index(pinecone_index) 

# # time.sleep(60)
# # print("Recreating index...")
# # # wait a minute for the index to be deleted
# # pinecone.create_index(pinecone_index, metric="dotproduct", dimension=1536, pods=1, pod_type="p1") 


if pinecone_index in pinecone.list_indexes():

    print(f"Loading {len(all_texts)} texts to index {pinecone_index}... \n This may take a while. Here's a preview of the first text: \n {texts[0].metadata} \n {texts[0].page_content}")

    for texts in all_texts:
        for text in texts:
            print(f"Content: {text.page_content}")
            Pinecone.from_texts([text.page_content], embedding=embeddings, index_name=pinecone_index, metadatas=[text.metadata])

    print("Done!")  
