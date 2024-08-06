document.getElementById('notifyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value; 
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;

    fetch('/notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, country })
    })
    .then(response => response.text())
    .then(data => { displayMessage(data);})
    .catch(error => { displayMessage('Erro ao cadastrar. Tente novamente.'); });

    // Limpar os campos do formulário
    this.reset();
});

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}
