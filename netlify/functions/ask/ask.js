import { ChatGPTAPI } from 'chatgpt'
import LRU from 'lru-cache'

// Create a cache instance with a max size of 100 items
const cache = new LRU({ max: 100 })

const handler = async (event) => {
  try {
    const question = event.queryStringParameters.question || 'Hello World!'

    // Check if the question is already in the cache
    if (cache.has(question)) {
      const answer = cache.get(question)
      return { statusCode: 200, body: JSON.stringify({ message: answer }) }
    }

    const api = new ChatGPTAPI({
      apiKey: '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'
    })

    const res = await api.sendMessage(question)

    // Cache the response for future requests
    cache.set(question, res.text)

    return { statusCode: 200, body: JSON.stringify({ message: res.text }) }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

export { handler }
