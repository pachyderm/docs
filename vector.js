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
          const value = articleVector[index];
          return isNaN(value) ? 0 : value;
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
    };
  }
  
  

async function blah() {
    try {
        console.log("getting embeddings")

        const embeddings = await getEmbeddings();

        console.log("got embeddings")
        console.log(embeddings[0])

        const context = createContext("What is Pachyderm?", embeddings);

        console.log("got context")
        console.log(context)
    }
    catch (error) {
        return { statusCode: 500, body: error.toString() }
    } 
}


blah()