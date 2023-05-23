import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

 
 
 export default (request, context) => {
    const url = new URL(request.url);

    let question

    if (url.searchParams.get('question')) {
        question = url.searchParams.get('question')
        return new Response(` You asked: ${url.searchParams.get('question')}`);
    }

}