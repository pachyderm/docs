let conversation = [];

document.addEventListener('DOMContentLoaded', () => {
    loadConversation();
    console.log("conversation ", conversation)
});


async function submitQuestion(event) {
    const question = document.getElementById('question').value;
    loading(question);
  
    event.preventDefault();
  
  
    const response = await fetch(`https://pach-docs-chatgpt-6ukzwpb5kq-uc.a.run.app/?query=${encodeURIComponent(question)}`);
    const data = await response.json();
  
    const reply = document.createElement('div');
    reply.classList.add('notification', 'is-success');
  
    if (data.error) {
      reply.textContent = data.error;
    }
  
    if (data.answer) {
      reply.textContent = data.answer;
    }
  
    const answersContainer = document.getElementById('answers');
    const firstChild = answersContainer.firstChild;
    answersContainer.insertBefore(reply, firstChild);
  }
  
  function loading(question) {
    
    const loading = document.createElement('div');
    loading.innerHTML = `> <strong>${question}</strong>`
  
    const answersContainer = document.getElementById('answers');
    const firstChild = answersContainer.firstChild;
    answersContainer.insertBefore(loading, firstChild);
  }
  

async function submitQuestion2(event) {
    const question = document.getElementById('question').value;
    loading(question);
  
    event.preventDefault();
  
    const response = await fetch(`https://pach-docs-chatgpt-6ukzwpb5kq-uc.a.run.app/?query=${encodeURIComponent(question)}`);
    const data = await response.json();
  
    const reply = document.createElement('div');
  
    if (data.error) {
      reply.textContent = data.error;
    }
  
    if (data.answer) {
      reply.textContent = data.answer;
    }
  
    const answersContainer = document.getElementById('answers');
    answersContainer.appendChild(reply);
    conversation.push(reply.innerText);

    storeConversation();
    
  }
  
function loading(question) {
    
    const loading = document.createElement('div');
    loading.innerHTML = `> <strong>${question}</strong>`
    conversation.push(loading.innerText);
  
    const answersContainer = document.getElementById('answers');
    answersContainer.appendChild(loading);

    clearQuestion();

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
        console.log("storedConversation ", storedConversation)
        conversation = JSON.parse(storedConversation);
        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = '';
        conversation.forEach((message) => {
            const reply = document.createElement('div');
            if (message.includes('>')) {
            reply.classList.add('black');
        }
            reply.textContent = message;
            answersContainer.appendChild(reply);
        }
        );
    }
}

function clearConversation() {
    localStorage.removeItem('conversation');
    location.reload();
    }