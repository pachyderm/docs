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

  function createContext(question, embeddings) {
    const similarities = embeddings.map((embedding) => {
      const article = embedding.text;
      const embeddingVector = embedding.embeddings.split(',').map(parseFloat);
      const questionVector = question.split(' ').map((word) => embeddingVector[embedding.text.indexOf(word)] || 0);
      const similarity = cosineSimilarity(embeddingVector, questionVector);
      return { article, similarity };
    });
  
    // Sort the similarities in descending order by the similarity score
    similarities.sort((a, b) => b.similarity - a.similarity);
  
    // Return the top 1 article
    return similarities.slice(0, 1).map((similarity) => similarity.article.substring(0, 1500));
  }

async function handler(event) {
    try {
        const embeddings = await getEmbeddings();

        const userQuestion = event.queryStringParameters.question || 'What is Pachw?'

        if (embeddings === undefined || embeddings.length === 0 ) {
            return { statusCode: 500, body: "Embeddings not found" }
        }
        
        let context = createContext(userQuestion, embeddings)
        
        const maxLength = 1500;
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