// This function takes a question from the /ask endpoint and returns an answer from the ChatGPT API.

import { ChatGPTAPI } from 'chatgpt'

const handler = async (event) => {
    try {
        const question = event.queryStringParameters.question || 'Hello World!'
        const api = new ChatGPTAPI({
            apiKey: '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'
        })
        const res = await api.sendMessage(question)
        return {
            statusCode: 200,
            body: JSON.stringify({ message: res.text }),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
  }
  
  module.exports = { handler }
  