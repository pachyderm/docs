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

async function handler(event) {
    try {
        const embeddings = await getEmbeddings();

        const userQuestion = event.queryStringParameters.question || 'What is Pachw?'
        console.log("subject", userQuestion)

        const similarities = embeddings.map((embedding) => {
            const article = embedding.text;
            const embeddingVector = embedding.embeddings.split(',').map(parseFloat);
            const userQuestionVector = userQuestion.split(' ').map((word) => embeddingVector[embedding.text.indexOf(word)] || 0);
            const similarity = cosineSimilarity(embeddingVector, userQuestionVector);
            return { article, similarity };
          });
        
        // Sort the similarities in descending order by the similarity score

        similarities.sort((a, b) => b.similarity - a.similarity);
        
        const maxLength = 1500;
        const prompt = `${userQuestion}\n${similarities[0].article.substring(0, maxLength)}`;
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
            body: JSON.stringify({ message: response.data.choices[0].text  }),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    } 
}

module.exports = { handler }