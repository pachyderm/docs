const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getEmbeddings(texts) {
    const embeddings = [];

    for (let i = 0; i < texts.length; i++) {
        const response = await openai.embed(texts[i], "text-embedding-2020-09-01");
        embeddings.push(response.data.embeddings[0]);
    }

    return embeddings;
}

async function answerQuestion(question, embeddings) {
    const response = await openai.search(
        question,
        embeddings,
        "text-embedding-2020-09-01"
    );

    return response.data.results[0].text;
}


async function handler(event) {
    try {
        const subject = event.queryStringParameters.question || 'What is Pachyderm?'
        console.log("subject", subject)

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: subject,
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