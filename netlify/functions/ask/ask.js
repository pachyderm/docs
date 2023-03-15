// This function takes a question from the /ask endpoint and returns an answer from the ChatGPT API.

import { ChatGPTAPI } from 'chatgpt'

const handler = async (event) => {
    try {
        console.log("event: ", event)
        const question = event.queryStringParameters.question || 'Hello World!'
        const api = new ChatGPTAPI({
            apiKey: process.env.OPENAI_API_KEY
        })
        const res = await api.sendMessage(question, {
            // print the partial response as the AI is "typing"
            onProgress: (partialResponse) => console.log(partialResponse.text)
          })
        return {
            statusCode: 200,
            body: JSON.stringify({ message: res.text }),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
  }
  
  module.exports = { handler }
