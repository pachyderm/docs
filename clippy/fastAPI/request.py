import requests

url = "http://localhost:8000/answer"

question = "What is Pachyderm?"

response = requests.post(url, json={"question": question})

print(response.json())
