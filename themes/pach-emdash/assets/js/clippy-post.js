const axios = require('axios');

async function makePostRequest() {
  const url = 'https://pach-docs-chatgpt-6ukzwpb5kq-uc.a.run.app/'; 

  const requestBody = {
    query: 'What is pachyderm?', // Replace with your question
    conversation:'blah'
  };

  try {
    const response = await axios.post(url, requestBody);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

makePostRequest();
