const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Papa = require("papaparse");
const axios = require("axios");

async function getEmbeddings() {
    const response = await axios.get("https://deploy-preview-39--pach-docs.netlify.app/embeddings/embeddings.csv");
    const embeddings = Papa.parse(response.data, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    }).data;
    return embeddings;
  }
  

// function to calculate cosine similarity between two vectors
function cosineSimilarity(a, b) {
    const dotProduct = a.reduce((acc, val, i) => acc + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
    const normB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (normA * normB);
  }

  // create a context for a queestion using the most similar article

  async function createContext(question, embeddings, maxLength = 1800, model = "text-embedding-ada-002") {
    // Get the embeddings for the question
    const response = await openai.embeddings.create({
      engine: model,
      input: [question],
    });
  
    const q_embeddings = response.data[0].embedding;
  
    // Compute distances from embeddings
    const distances = embeddings.map((embedding) => {
      const embeddingVector = embedding.embeddings.split(",").map(parseFloat);
      const distance = cosineSimilarity(q_embeddings, embeddingVector);
      return { ...embedding, distance };
    });
  
    // Sort by distance
    distances.sort((a, b) => a.distance - b.distance);
  
    let context = [];
    let curLength = 0;
  
    // Add the text to the context until the context is too long
    for (let i = 0; i < distances.length; i++) {
      const row = distances[i];
      // Add the length of the text to the current length
      curLength += row.n_tokens + 4;
  
      // If the context is too long, break
      if (curLength > maxLength) {
        break;
      }
  
      // Else add it to the text that is being returned
      context.push(row.text);
    }
  
    // Return the context
    return context.join("\n\n###\n\n");
  }
  

async function handler(event) {
    try {
        const embeddings = await getEmbeddings();

        const userQuestion = event.queryStringParameters.question || 'What is Pachw?'

        if (embeddings === undefined || embeddings.length === 0 ) {
            return { statusCode: 500, body: "Embeddings not found" }
        }
        
        let context = createContext(userQuestion, embeddings)
        
        const prompt = `Answer the question using the context. Question:${userQuestion}\n Context:${context}`;
        console.log("prompt", prompt)

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0,
            max_tokens: 200,
        });

        console.log("response", response)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: response.data.choices[0].text,
            prompt: prompt,  }),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    } 
}

module.exports = { handler }