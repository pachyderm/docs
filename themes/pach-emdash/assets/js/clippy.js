const chatTrayContainer = document.getElementById('answers');
let conversation = [];

document.addEventListener('DOMContentLoaded', () => {
  loadConversation();
  scrollToLastQuestion();
});

async function submitQuestion(event) {
  event.preventDefault();

  const question = document.getElementById('question').value;
  const qaSetContainer = createQASetContainer(question);

  try {
    qaSetContainer.classList.add('pulse');
    const data = await fetchAnswerFromFunction(question);
    qaSetContainer.classList.remove('pulse');
    

    const answerContainer = createAnswerContainer(data.error || `<strong>A:</strong> ${data.answer}`);
    const docsContainer = createDocsContainer(data.docs);
    
    appendElementsToContainer(qaSetContainer, [answerContainer, docsContainer, createRemoveButton(qaSetContainer.id)]);

    conversation.push({ id: qaSetContainer.id, question, answer: data.answer, docs: data.docs });
    storeConversation();
    scrollToLastQuestion();
  } catch (error) {
    console.error('Error:', error);
  }
}

function appendElementsToContainer(container, elements) {
  elements.forEach(element => container.appendChild(element));
}

async function fetchAnswerFromFunction(question) {
  const response = await fetch(`https://pach-docs-chatgpt-6ukzwpb5kq-uc.a.run.app/?query=${encodeURIComponent(question)}`);
  return await response.json();
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

function createQASetContainer(question) {
  
  const qaSetContainer = document.createElement('div');
  qaSetContainer.id = Date.now().toString();
  qaSetContainer.classList.add('darken-1', 'p-1', 'rounded-2')

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
      const qaSetContainer = createQASetContainer(question);
      qaSetContainer.id = id;

      const answerContainer = createAnswerContainer(`<strong>A:</strong> ${answer}`);
      const docsContainer = createDocsContainer(docs);
      
      appendElementsToContainer(qaSetContainer, [answerContainer, docsContainer, createRemoveButton(qaSetContainer.id)]);
    });
  }
}

function clearConversation() {
  localStorage.removeItem('conversation');
  location.reload();
}

function clearQASet(id) {
  const qaSetContainer = document.getElementById(id);
  qaSetContainer.remove();
  conversation = conversation.filter(qaPair => qaPair.id !== id);
  storeConversation();
}

function scrollToLastQuestion() {
  chatTrayContainer.scrollTop = chatTrayContainer.scrollHeight;
}

function openDocument(relURI) {
  window.open(relURI, '_blank');
}
