const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const axios = require("axios");


function euclideanDistance(a, b) {
  const squares = a.map((val, i) => Math.pow(val - b[i], 2));
  const sum = squares.reduce((acc, val) => acc + val, 0);
  return Math.sqrt(sum);
}

// create a context for a question using the most similar article
function createContext(question, embeddings) {
  const similarities = embeddings.map((embedding) => {
    const articleVector = embedding.embeddings.split(",").map(parseFloat);
    const articleWords = embedding.text.split(" ");
    const questionWords = question.split(" ");
    const questionVector = questionWords.map((word) => {
      const index = articleWords.indexOf(word);
      if (index === -1) {
        return 0;
      } else {
        return articleVector[index];
      }
    });
    const similarity = euclideanDistance(articleVector, questionVector);
    return { article: embedding.text, similarity, articleVector, questionVector };
  });

  // Sort the similarities in ascending order by the similarity score
  similarities.sort((a, b) => a.similarity - b.similarity);

  // Return the top 1 article
  return {
    article: similarities[0].article.substring(0, 1500),
    similarity: similarities[0].similarity,
    articleVector: similarities[0].articleVector,
    questionVector: similarities[0].questionVector,
  };
}

async function handler(event) {
    try {
      // Fetch latest Pachyderm documentation from docs.pachyderm.com/latest/index.json
      const docs = await axios.get("https://docs.pachyderm.com/latest/index.json");
      const pages = docs.data.pages;
  
      // Create embeddings for each page
      const embeddings = pages.map((page) => {
        const articleWords = page.body.toLowerCase().replace(/[^\w\s]|_/g, "").split(/\s+/);
        const articleVector = createEmbedding(articleWords);
        return { article: page.title, embeddings: articleVector };
      });
  
      const userQuestion = event.queryStringParameters.question || 'What is Pachyderm?';
  
      if (embeddings === undefined || embeddings.length === 0 ) {
        return { statusCode: 500, body: "Embeddings not found" }
      }
  
      let context = createContext(userQuestion, embeddings)
  
      const prompt = `Answer the question using the context. Question:${userQuestion}\n Context:${context.article} Similiarity: ${context.similarity}`;
  
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
  