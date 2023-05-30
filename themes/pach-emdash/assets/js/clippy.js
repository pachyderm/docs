const answersContainer = document.getElementById('answers');
let conversation = [];

document.addEventListener('DOMContentLoaded', () => {
  loadConversation();
  scrollToLastQuestion();
});

async function submitQuestion(event) {
  event.preventDefault();

  const question = document.getElementById('question').value;
  const qaContainer = loadQuestion(question);

  try {
    const response = await fetch(`https://pach-docs-chatgpt-6ukzwpb5kq-uc.a.run.app/?query=${encodeURIComponent(question)}`);
    const data = await response.json();

    const answer = document.createElement('div');
    answer.innerHTML = data.error || '<strong>A:</strong> ' + data.answer;

    const docsContainer = createDocsContainer(data.docs);
    answer.appendChild(docsContainer);

    qaContainer.appendChild(answer);

    const removeButton = createRemoveButton(qaContainer.id);
    qaContainer.appendChild(removeButton);

    conversation.push({ id: qaContainer.id, question: question, answer: data.answer, docs: data.docs });
    storeConversation();
    scrollToLastQuestion();
  } catch (error) {
    console.error('Error:', error);
  }
}

function createDocsContainer(docs) {
  const docsContainer = document.createElement('div');
  docsContainer.classList.add('stack', 'm-1', 'p-3', 'c-sp-2', 'gray', 'rounded-2');
  
  docs.forEach(doc => {
    const docLink = document.createElement('a');
    docLink.classList.add('black', 'rounded-2', 'is-fit', 'xs');
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
  removeButton.addEventListener('click', () => removeAnswer(id));
  return removeButton;
}

function loadQuestion(question) {
  const qaContainer = document.createElement('div');
  qaContainer.id = Date.now().toString();
  const questionContainer = document.createElement('div');
  questionContainer.innerHTML = `<strong>Q:</strong> ${question}`;
  qaContainer.appendChild(questionContainer);

  answersContainer.appendChild(qaContainer);
  clearQuestion();
  scrollToLastQuestion();

  return qaContainer;
}

function clearQuestion() {
  document.getElementById('question').value = '';
}

function storeConversation() {
  localStorage.setItem('conversation', JSON.stringify(conversation));
  console.log(conversation)
}

function loadConversation() {
  const storedConversation = localStorage.getItem('conversation');
  if (storedConversation) {
    conversation = JSON.parse(storedConversation);
    answersContainer.innerHTML = '';
    conversation.forEach(({ id, question, answer, docs }) => {
      const qaContainer = loadQuestion(question);
      qaContainer.id = id;
      const answerContainer = document.createElement('div');
      answerContainer.innerHTML = `<strong>A:</strong> ${answer}`;

      const docsContainer = createDocsContainer(docs);
      answerContainer.appendChild(docsContainer);

      const removeButton = createRemoveButton(qaContainer.id);
      qaContainer.appendChild(answerContainer);
      qaContainer.appendChild(removeButton);
    });
  }
}

function clearConversation() {
  localStorage.removeItem('conversation');
  location.reload();
}

function removeAnswer(id) {
  const qaContainer = document.getElementById(id);
  qaContainer.remove();
  const index = conversation.findIndex(qaPair => qaPair.id === id);
  if (index > -1) {
    conversation.splice(index, 1);
  }

  storeConversation();
}

function scrollToLastQuestion(){
  answersContainer.scrollTop = answersContainer.scrollHeight;
}

function openDocument(relURI) {
  window.open(relURI, '_blank');
}
