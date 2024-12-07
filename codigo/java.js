


function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();
    if (message !== '') {
        appendMessage('Você', message);
        messageInput.value = '';
        receiveMessage();
    }
}

function receiveMessage() {
    var messagesContainer = document.getElementById('chat-window');
    var receivedMessage = 'Resposta da empresa';
    appendMessage('Empresa', receivedMessage);
}

function appendMessage(sender, message) {
    var messagesContainer = document.getElementById('chat-window');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = '<strong>' + sender + ':</strong> ' + message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
}

