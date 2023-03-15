const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function handler(event) {
    try {
        const subject = event.queryStringParameters.name || 'Hello World'
        console.log("subject", subject)

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: subject,
            temperature: 0,
            max_tokens: 7,
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