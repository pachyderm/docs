const { load_dotenv } = require('dotenv');
const tiktoken = require('tiktok-text-tokenizer');
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
  /**
   * Create a context for a question by finding the most similar context from the dataframe
   */
  // Get the embeddings for the question
  const q_embeddings = (await Embedding.create({
    input: question,
    engine: 'text-embedding-ada-002',
  })).data[0].embedding;

  // Compute distances from embeddings
  const distances = Embedding.distancesFromEmbeddings(
    q_embeddings,
    df.get('embeddings').values,
    'cosine'
  );

  // Sort by distance
  const df_sorted = df.iloc[np.array(distances).argsort()];

  const returns = [];
  let cur_len = 0;

  // Add the text to the context until the context is too long
  df_sorted.iterrows().forEach(([index, row]) => {
    // Add the length of the text to the current length
    cur_len += row.n_tokens + 4;

    // If the context is too long, break
    if (cur_len > max_len) {
      return;
    }

    // Else add it to the text that is being returned
    returns.push(row.text);
  });

  // Return the context
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
  /**
   * Answer a question based on the most similar context from the dataframe texts
   */
  const context = await create_context(df, question, max_len, size);

  // If debug, print the raw model response
  if (debug) {
    console.log('Context:\n' + context);
    console.log('\n\n');
  }

  try {
    // Create a completions using the questin and context
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

  // Load the embeddings from the CSV file
  const content = fs.readFileSync(file_path);
  const records = csv(content, { columns: true });

  // Convert the embeddings from JSON strings to arrays
  records.forEach((record) => {
    record.embeddings = JSON.parse(record.embeddings);
  });

  // Convert the records to a Pandas DataFrame
  const df = pandas.DataFrame.fromRecords(records);

  // Rename the columns
  df.columns = ['title', 'text', 'embeddings'];

  // Convert the embeddings to NumPy arrays
  df.set('embeddings', df.get('embeddings').apply((embeddings) => {
    return np.array(embeddings);
  }));

  return df;
}


exports.handler = async (event, context) => {
  // Load the embeddings
  const df = load_embeddings('processed/embeddings.csv');

  // Extract the question from the request body
  const { question } = JSON.parse(event.body);

  try {
    // Answer the question
    const answer = await answer_question(df, question);

    // Return the answer
    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (error) {
    console.error(error);

    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred while answering the question.' }),
    };
  }
};



