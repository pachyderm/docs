const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Papa = require("papaparse");
const axios = require("axios");

async function getEmbeddings(chunkSize) {
  const response = await axios.get(
    "https://deploy-preview-39--pach-docs.netlify.app/embeddings/embeddings.csv"
  );
  const embeddings = Papa.parse(response.data, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;

  // Split the embeddings into chunks of size `chunkSize`
  const chunks = [];
  for (let i = 0; i < embeddings.length; i += chunkSize) {
    chunks.push(embeddings.slice(i, i + chunkSize));
  }

  return chunks;
}


function euclideanDistance(a, b) {
  const squares = a.map((val, i) => Math.pow(val - b[i], 2));
  const sum = squares.reduce((acc, val) => acc + val, 0);
  return Math.sqrt(sum);
}

 
// create a context for a question using the most similar article
function createContext(question, embeddings) {
  const similarities = [];
  for (let i = 0; i < embeddings.length; i++) {
    const embedding = embeddings[i];
    const articleVector = embedding.embeddings.split(',').map(parseFloat);
    const articleWords = embedding.text.split(' ');
    const questionWords = question.split(' ');
    const questionVector = questionWords.map((word) => {
      const index = articleWords.indexOf(word);
      if (index === -1) {
        return 0;
      } else {
        const value = articleVector[index];
        return isNaN(value) ? 0 : value;
      }
    });      
    const similarity = euclideanDistance(articleVector, questionVector);
    similarities.push({ article: embedding.text, similarity, articleVector, questionVector});
  }

  // Sort the similarities in ascending order by the similarity score
  similarities.sort((a, b) => a.similarity - b.similarity);

  // Return the top 1 article
  return {
    article: similarities[0].article.substring(0, 1500),
    similarity: similarities[0].similarity,
  };
}

async function handler(event) {
  try {
    const chunkSize = 1000; // adjust as needed
    const embeddingsChunks = await getEmbeddings(chunkSize);

    const userQuestion = event.queryStringParameters.question || 'What is Pachw?'

    if (embeddingsChunks === undefined || embeddingsChunks.length === 0 ) {
      return { statusCode: 500, body: "Embeddings not found" }
    }

    const similarities = [];
    for (let i = 0; i < embeddingsChunks.length; i++) {
      const embeddings = embeddingsChunks[i];
      const context = createContext(userQuestion, embeddings);
      similarities.push(context);
    }
    const context = similarities.reduce((max, curr) => max.similarity > curr.similarity ? max : curr);

    const prompt = `Answer the question using the context. Question:${userQuestion}\n Context:${context.article} Similiarity: ${context.similarity} `;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 200,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: response.data.choices[0].text,
        prompt: prompt,
      }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  } 
}

module.exports = { handler }