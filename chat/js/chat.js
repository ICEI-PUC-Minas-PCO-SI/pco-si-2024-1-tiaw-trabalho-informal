document.addEventListener('DOMContentLoaded', function () {
    fetch('https://059b1ee9-ce33-4b95-8cd6-3b8468c167f0-00-3adhzxokdlz4g.worf.replit.dev/cadastro_clientes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded:', data);
            const listaContatos = document.getElementById('lista-contatos');
            const inputPesquisa = document.getElementById('input-pesquisa');
            inputPesquisa.addEventListener('input', function () {
                filtrarContatos(data, inputPesquisa.value);
            });
            exibirContatos(data);
        })
        .catch(error => console.error('Error loading user data:', error));
});

function exibirContatos(contatos) {
    const listaContatos = document.getElementById('lista-contatos');
    listaContatos.innerHTML = '';
    contatos.forEach(usuario => {
        const li = document.createElement('li');
        li.className = 'cartao-contato';
        const a = document.createElement('a');
        a.href = usuario.link;
        a.innerHTML = `
            <img src="${usuario.img}" alt="">
            <div class="detalhes-contato">
                <div class="nome-contato">${usuario.nome}</div>
                <div class="email-contato">${usuario.email}</div>
            </div>
        `;
        a.addEventListener('click', function () {
            abrirChat(usuario.name);
        });
        li.appendChild(a);
        listaContatos.appendChild(li);
    });
}

function filtrarContatos(contatos, termoPesquisa) {
    const contatosFiltrados = contatos.filter(contato =>
        contato.name.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        contato.email.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    exibirContatos(contatosFiltrados);
}

function abrirChat(nomeUsuario) {
    const chatCom = document.getElementById('chat');
    const mensagensChat = document.getElementById('mensagens-chat');
    chatCom.textContent = `${nomeUsuario}`;
    mensagensChat.innerHTML = ''; // Limpar mensagens anteriores

    // Carregar mensagens do localStorage
    const mensagensArmazenadas = JSON.parse(localStorage.getItem(nomeUsuario)) || [];
    mensagensArmazenadas.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'mensagem';
        msgDiv.textContent = msg;
        mensagensChat.appendChild(msgDiv);
    });

    const botaoEnviar = document.getElementById('botao-enviar');
    const entradaMensagem = document.getElementById('entrada-mensagem');
    botaoEnviar.onclick = function () {
        enviarMensagem(nomeUsuario, entradaMensagem.value);
        entradaMensagem.value = ''; // Limpar campo de entrada
    };
}

function enviarMensagem(nomeUsuario, mensagem) {
    if (!mensagem.trim()) return; // Não enviar mensagens vazias
    const mensagensChat = document.getElementById('mensagens-chat');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'mensagem';
    msgDiv.textContent = mensagem;
    mensagensChat.appendChild(msgDiv);
    mensagensChat.scrollTop = mensagensChat.scrollHeight; // Rolar para o fim

    // Salvar mensagem no localStorage
    let mensagensArmazenadas = JSON.parse(localStorage.getItem(nomeUsuario)) || [];
    mensagensArmazenadas.push(mensagem);
    localStorage.setItem(nomeUsuario, JSON.stringify(mensagensArmazenadas));
}

function chamaPublicar() {
    window.location.href = "../publicarProjeto/index.html";
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('publicarLink').addEventListener('click', function (event) {
        event.preventDefault(); // Evita que o link padrão seja seguido
        chamaPublicar();
    });
});