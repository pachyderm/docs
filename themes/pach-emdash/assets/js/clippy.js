const chatTrayContainer = document.getElementById('answers');
let conversation = [];

document.addEventListener('DOMContentLoaded', () => {
  loadConversation();
  scrollToLastQuestion();
});

async function submitQuestion(event) {
  event.preventDefault();

  const question = document.getElementById('question').value;
  const qaContainer = createQuestionContainer(question);

  try {
    const response = await fetch(`https://pach-docs-chatgpt-6ukzwpb5kq-uc.a.run.app/?query=${encodeURIComponent(question)}`);
    const data = await response.json();

    const answer = createAnswerContainer(data.error || `<strong>A:</strong> ${data.answer}`);
    const docsContainer = createDocsContainer(data.docs);
    answer.appendChild(docsContainer);

    qaContainer.appendChild(answer);
    qaContainer.appendChild(createRemoveButton(qaContainer.id));

    conversation.push({ id: qaContainer.id, question, answer: data.answer, docs: data.docs });
    storeConversation();
    scrollToLastQuestion();
  } catch (error) {
    console.error('Error:', error);
  }
}

function createAnswerContainer(html) {
  const answer = document.createElement('div');
  answer.classList.add('py-2');
  answer.innerHTML = html;
  return answer;
}

function createDocsContainer(docs) {
  const docsContainer = document.createElement('div');
  docsContainer.classList.add('spread-left', 'm-1', 'py-1', 'c-sp-2', 'rounded-2');

  docs.forEach(doc => {
    const docLink = document.createElement('a');
    docLink.classList.add('black', 'rounded-2', 'is-fit', 'xs', 'outlined');
    docLink.href = doc.relURI;
    docLink.target = '_blank';
    docLink.innerText = doc.title;
    docsContainer.appendChild(docLink);
  });

  return docsContainer;
}

function createRemoveButton(id) {
  const removeButton = document.createElement('button');
  removeButton.classList.add('remove', 'sp-1', 'rounded-2');
  removeButton.innerHTML = '🗑️';
  removeButton.addEventListener('click', () => clearQASet(id));
  return removeButton;
}

function createQuestionContainer(question) {
  // Contains the question, answer, and docs
  const qaSetContainer = document.createElement('div');
  qaSetContainer.id = Date.now().toString();
  qaSetContainer.classList.add('darken-1', 'p-1', 'rounded-2')

  // Contains the question
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('py-2')
  questionContainer.innerHTML = `<strong>Q:</strong> ${question}`;
  qaSetContainer.appendChild(questionContainer);

  chatTrayContainer.appendChild(qaSetContainer);
  clearQuestionInput();
  scrollToLastQuestion();

  return qaSetContainer;
}

function clearQuestionInput() {
  document.getElementById('question').value = '';
}

function storeConversation() {
  localStorage.setItem('conversation', JSON.stringify(conversation));
  console.log(conversation);
}

function loadConversation() {
  const storedConversation = localStorage.getItem('conversation');
  if (storedConversation) {
    conversation = JSON.parse(storedConversation);
    chatTrayContainer.innerHTML = '';
    conversation.forEach(({ id, question, answer, docs }) => {
      const qaContainer = createQuestionContainer(question);
      qaContainer.id = id;

      qaContainer.appendChild(createAnswerContainer(`<strong>A:</strong> ${answer}`));
      qaContainer.appendChild(createDocsContainer(docs));
      qaContainer.appendChild(createRemoveButton(qaContainer.id));
    });
  }
}

function clearConversation() {
  localStorage.removeItem('conversation');
  location.reload();
}

function clearQASet(id) {
  const qaContainer = document.getElementById(id);
  qaContainer.remove();
  conversation = conversation.filter(qaPair => qaPair.id !== id);
  storeConversation();
}

function scrollToLastQuestion() {
  chatTrayContainer.scrollTop = chatTrayContainer.scrollHeight;
}

function openDocument(relURI) {
  window.open(relURI, '_blank');
}
