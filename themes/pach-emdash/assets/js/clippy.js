

async function submitQuestion(event) {

    loading()

    console.log('submitting question...');
    event.preventDefault();

    const question = document.getElementById('question').value;
    console.log("question: ", question)

    const response = await fetch(`https://pach-docs-chatgpt-6ukzwpb5kq-uc.a.run.app/?query=${encodeURIComponent(question)}`);
    console.log("response: ",  response)

    const data = await response.json();
    console.log("data: ", data)

    if (data.error) {
        document.getElementById('answers').innerHTML = `<div class="notification is-danger">${data.error}</div>`;
        return;
    }

    if (data.answer) {
        document.getElementById('answers').innerHTML = `<div class="notification is-success">${data.answer}</div>`;
        return;
    }
}

function loading() {
    content = {
        1: 'Searching the docs...',
        2: 'Looking for an answer...',
        3: 'Thinking...',
    }

    document.getElementById('answers').innerHTML = `<div class="notification is-info">${content[Math.floor(Math.random() * 3) + 1]}</div>`;
}