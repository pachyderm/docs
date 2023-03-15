const { ChatGPTAPI } = await import('chatgpt')

const handler = async (event) => {
  try {
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

export { handler }
