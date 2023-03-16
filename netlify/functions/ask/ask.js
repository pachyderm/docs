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
  if (normA === 0 || normB === 0) {
    return 0;
  }
  return dotProduct / (normA * normB);
}

function euclideanDistance(a, b) {
  const squares = a.map((val, i) => Math.pow(val - b[i], 2));
  const sum = squares.reduce((acc, val) => acc + val, 0);
  return Math.sqrt(sum);
}

  // create a context for a question using the most similar article

  function createContext(question, embeddings) {
    const similarities = embeddings.map((embedding) => {
      const articleVector = embedding.embeddings.split(',').map(parseFloat);
      const articleWords = embedding.text.split(' ');
      const questionWords = question.split(' ');
      const questionVector = questionWords.map((word) => {
        const index = articleWords.indexOf(word);
        if (index === -1) {
          return 0;
        } else {
          return articleVector[index];
        }
      });
      const similarity = euclideanDistance(articleVector, questionVector);
      return { article: embedding.text, similarity, articleVector, questionVector};
    });
    
    // Sort the similarities in ascending order by the similarity score
    similarities.sort((a, b) => a.similarity - b.similarity);
    
    // Return the top 1 article
    return {
      article: similarities[0].article.substring(0, 1500),
      similarity: similarities[0].similarity,
      articleVector: similarities[0].articleVector,
      questionVector: similarities[0].questionVector
    };
  }
  
  

async function handler(event) {
    try {
        const embeddings = await getEmbeddings();

        const userQuestion = event.queryStringParameters.question || 'What is Pachw?'

        if (embeddings === undefined || embeddings.length === 0 ) {
            return { statusCode: 500, body: "Embeddings not found" }
        }
        
        let context = createContext(userQuestion, embeddings)
        
        const prompt = `Answer the question using the context. Question:${userQuestion}\n Context:${context.article} Similiarity: ${context.similarity} articleVector: ${context.articleVector} questionVector: ${context.questionVector}`;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0,
            max_tokens: 200,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: response.data.choices[0].text,
            prompt: prompt,
          }),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    } 
}

module.exports = { handler }