

async function submitQuestion(event) {

    loading()

    console.log('submitting question...');
    event.preventDefault();

    const question = document.getElementById('question').value;
    console.log("question: ", question)

    const response = await fetch(`http://localhost:8000/ask?question=${encodeURIComponent(question)}`);
    console.log("response: ",  response)

    const data = await response.json();
    console.log("data: ", data)

    if (data.error) {
        document.getElementById('answer').innerText = data.error;
        return;
    }

    if (data.answer) {
    
        document.getElementById('answer').innerText = data.answer;
        return;
    }
}

function loading() {
    content = {
        1: 'Searching the docs...',
        2: 'Looking for an answer...',
        3: 'Thinking...',
    }

    document.getElementById('answer').classList.toggle('is-hidden');
    document.getElementById('answer').innerText = content[Math.floor(Math.random() * 3) + 1];
}