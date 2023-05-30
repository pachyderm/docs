const answersContainer = document.getElementById('answers')
let conversation = [];

document.addEventListener('DOMContentLoaded', () => {
    loadConversation();
    console.log("conversation ", conversation)
    scrollToLastQuestion();
});

async function submitQuestion(event) {
  event.preventDefault();
  const question = document.getElementById('question').value;
  loadQuestion(question);

  try {
    const response = await fetch(`https://pach-docs-chatgpt-6ukzwpb5kq-uc.a.run.app/?query=${encodeURIComponent(question)}`);
    const data = await response.json();
    const reply = document.createElement('div');
    reply.textContent = data.error || data.answer;
    answersContainer.appendChild(reply);
    conversation.push(reply.textContent);
    storeConversation();
    scrollToLastQuestion();
  } catch (error) {
    console.error('Error:', error);
  }
}
  
function loadQuestion(question) {
  const questionContainer = document.createElement('div');
  questionContainer.innerHTML = `> <strong>${question}</strong>`
  conversation.push(questionContainer.innerText);
  answersContainer.appendChild(questionContainer);
  clearQuestion();
  scrollToLastQuestion();
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
      const fragment = document.createDocumentFragment();
      conversation.forEach((message) => {
          const reply = document.createElement('div');
          if (message.includes('>')) {
              reply.classList.add('black');
          }
          reply.textContent = message;
          fragment.appendChild(reply);
      });
      answersContainer.appendChild(fragment);
  }
}

function clearConversation() {
  localStorage.removeItem('conversation');
  location.reload();
}

function removeAnswer(element){
  element.remove();
  const index = conversation.indexOf(element.innerText);
  if (index > -1) {
    conversation.splice(index, 1);
  }
  storeConversation();
}

function scrollToLastQuestion(){
  answersContainer.scrollTop = answersContainer.scrollHeight;
  // const lastElement = answersContainer.lastElementChild;
  // lastElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
}