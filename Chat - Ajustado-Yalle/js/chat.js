document.addEventListener('DOMContentLoaded', function() {
    fetch('json/users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded:', data);
            const contactList = document.getElementById('contact-list');
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', function() {
                filterContacts(data, searchInput.value);
            });
            displayContacts(data);
        })
        .catch(error => console.error('Error loading user data:', error));
});

function displayContacts(contacts) {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    contacts.forEach(user => {
        const li = document.createElement('li');
        li.className = 'contact-card';
        const a = document.createElement('a');
        a.href = user.link;
        a.innerHTML = `
            <img src="${user.img}" alt="">
            <div class="contact-details">
                <div class="contact-name">${user.name}</div>
                <div class="contact-email">${user.email}</div>
            </div>
        `;
        a.addEventListener('click', function() {
            openChat(user.name);
        });
        li.appendChild(a);
        contactList.appendChild(li);
    });
}

function filterContacts(contacts, searchTerm) {
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayContacts(filteredContacts);
}

function openChat(userName) {
    const chatWith = document.getElementById('chat-with');
    const chatMessages = document.getElementById('chat-messages');
    chatWith.textContent = `${userName}`;
    chatMessages.innerHTML = ''; // Clear previous messages

    // Load messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem(userName)) || [];
    storedMessages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.textContent = msg;
        chatMessages.appendChild(msgDiv);
    });

    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    sendButton.onclick = function() {
        sendMessage(userName, messageInput.value);
        messageInput.value = ''; // Clear input field
    };
}

function sendMessage(userName, message) {
    if (!message.trim()) return; // Do not send empty messages
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.textContent = message;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom

    // Save message to localStorage
    let storedMessages = JSON.parse(localStorage.getItem(userName)) || [];
    storedMessages.push(message);
    localStorage.setItem(userName, JSON.stringify(storedMessages));
}

