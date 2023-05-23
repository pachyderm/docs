import { OpenAI } from "langchain/llms/openai";

 
 
 export default (request, context) => {
    const url = new URL(request.url);

    let question

    if (url.searchParams.get('question')) {
        question = url.searchParams.get('question')
        return new Response(` You asked: ${url.searchParams.get('question')}`);
    }

}