const { load_dotenv } = require('dotenv');
const tiktoken = require('@dqbd/tiktoken');
const { Embedding } = require('openai');
const openai = require('openai');
const os = require('os');
const pandas = require('pandas-js');
const { join } = require('path');
const np = require('numpy');

load_dotenv();

// OpenAI API Creds
const key = process.env.OPENAI_API_KEY;
const max_tokens = 500;
const texts = [];
const shortened = [];
const tokenizer = tiktoken.get_encoding('cl100k_base');

openai.api_key = key;

async function create_context(question, df, max_len = 1800, size = 'ada') {
  const q_embeddings = (await Embedding.create({
    input: question,
    engine: 'text-embedding-ada-002',
  })).data[0].embedding;
  const distances = Embedding.distancesFromEmbeddings(
    q_embeddings,
    df.get('embeddings').values,
    'cosine'
  );
  const df_sorted = df.iloc[np.array(distances).argsort()];
  const returns = [];
  let cur_len = 0;
  df_sorted.iterrows().forEach(([index, row]) => {
    cur_len += row.n_tokens + 4;
    if (cur_len > max_len) {
      return;
    }
    returns.push(row.text);
  });

  return returns.join('\n\n###\n\n');
}

async function answer_question(
  df,
  model = 'text-davinci-003',
  question = 'Am I allowed to publish model outputs to Twitter, without a human review?',
  max_len = 1800,
  size = 'ada',
  debug = false,
  max_tokens = 500,
  stop_sequence = null
) {
  const context = await create_context(df, question, max_len, size);
  if (debug) {
    console.log('Context:\n' + context);
    console.log('\n\n');
  }
  try {
    const response = await openai.Completion.create({
      prompt: `Answer the question based on the context below, and if the question can't be answered based on the context, say "I don't know"\n\nContext: ${context}\n\n---\n\nQuestion: ${question}\nAnswer:`,
      temperature: 0,
      max_tokens: max_tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: stop_sequence,
      model: model,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    console.log(error);
    return '';
  }
}

async function load_embeddings(file_path) {
  const fs = require('fs');
  const csv = require('csv-parse/lib/sync');
  const content = fs.readFileSync(file_path);
  const records = csv(content, { columns: true });
  records.forEach((record) => {
    record.embeddings = JSON.parse(record.embeddings);
  });
  const df = pandas.DataFrame.fromRecords(records);
  df.columns = ['title', 'text', 'embeddings'];
  df.set('embeddings', df.get('embeddings').apply((embeddings) => {
    return np.array(embeddings);
  }));
  return df;
}

exports.handler = async (event, context) => {
  const df = load_embeddings('processed/embeddings.csv');
  const { question } = JSON.parse(event.body);
  try {
    const answer = await answer_question(df, question);
    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred while answering the question.' }),
    };
  }
};



