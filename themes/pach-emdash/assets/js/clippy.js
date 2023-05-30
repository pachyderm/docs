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
    qaContainer.appendChild(answer);
    
    const removeButton = createRemoveButton(qaContainer.id);
    qaContainer.appendChild(removeButton);

    conversation.push({ id: qaContainer.id, question: question, answer: data.answer });
    storeConversation();
    scrollToLastQuestion();
  } catch (error) {
    console.error('Error:', error);
  }
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
}

function loadConversation() {
  const storedConversation = localStorage.getItem('conversation');
  if (storedConversation) {
    conversation = JSON.parse(storedConversation);
    answersContainer.innerHTML = '';
    conversation.forEach(({ id, question, answer }) => {
      const qaContainer = loadQuestion(question);
      qaContainer.id = id;
      const answerContainer = document.createElement('div');
      answerContainer.innerHTML = `<strong>A:</strong> ${answer}`;

      const removeButton = createRemoveButton(qaContainer);
      qaContainer.appendChild(answerContainer);
      qaContainer.appendChild(removeButton);
    });
  }
  console.log(conversation)
}

function clearConversation() {
  localStorage.removeItem('conversation');
  location.reload();
}

function removeAnswer(id) {
  const qaContainer = document.getElementById(id);
  console.log("container ", qaContainer, "id ", id)
  qaContainer.remove();
  const index = conversation.findIndex(qaPair => qaPair.id === id);
  if (index > -1) {
    conversation.splice(index, 1);
  }
  console.log(conversation)
  storeConversation();
}

function scrollToLastQuestion(){
  answersContainer.scrollTop = answersContainer.scrollHeight;
}
