import { OpenAI } from "https://esm.sh/langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "https://esm.sh/langchain/chains";
import { PineconeStore } from "https://esm.sh/langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "https://esm.sh/langchain/embeddings/openai";
import { config } from "https://deno.land/x/dotenv/mod.ts";

config();

const openai_key = Deno.env.get("OPENAI_API_KEY");
const pinecone_index = "langchain1";

class Document {
  constructor(page_content, metadata) {
    this.page_content = page_content;
    this.metadata = metadata;
  }
}

async function answerQuestion(question, vs, chain, memory) {
  const query = question;
  const docs = await vs.similaritySearch(query);
  const conversation_history = memory.loadMemoryVariables({})["history"];
  const context_window = conversation_history.split("\n").slice(-3);
  const conversation_document = new Document(context_window);
  const input_documents = [...docs, conversation_document];

  const answer = chain.run({ input_documents, question: query });
  memory.saveContext({ inputs: { question }, outputs: { answer } });
  return { answer };
}

const llm = new OpenAI({ temperature: 0, openai_api_key: openai_key, max_tokens: -1 });
const chain = ConversationalRetrievalQAChain(llm, { chain_type: "stuff" });
const embeddings = new OpenAIEmbeddings({ openai_api_key: openai_key });
const docsearch = PineconeStore.fromExistingIndex(pinecone_index, embeddings);
const memory = new ConversationBufferMemory();

function promptQuestion(memory) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function processQuestion(question) {
    if (question.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    console.log(answerQuestion(question, docsearch, chain, memory));
    console.log('\n');

    rl.question('What is your question? (Type "exit" to quit) ', processQuestion);
  }

  rl.question('What is your question? (Type "exit" to quit) ', processQuestion);

  rl.on('close', () => {
    const conversation_history = memory.loadMemoryVariables({})["history"];
    console.log('Conversation History:');
    console.log(conversation_history);
  });
}

promptQuestion(memory);

export default async (request) => {
  const { searchParams } = new URL(request.url);
  const question = searchParams.get('question');

  if (question) {
    const answer = await answerQuestion(question, docsearch, chain, memory);
    return new Response(JSON.stringify(answer), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  }
};
