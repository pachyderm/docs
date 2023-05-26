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
  