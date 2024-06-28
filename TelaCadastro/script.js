document.getElementById('personal-info-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('https://059b1ee9-ce33-4b95-8cd6-3b8468c167f0-00-3adhzxokdlz4g.worf.replit.dev/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar as informações');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados enviados:', data);
        // Armazena os dados no localStorage
        localStorage.setItem('informacaoEnviada', JSON.stringify(data));
        // Redireciona para a página de confirmação
        window.location.href = 'confirmacao.html';
    })
    .catch(error => {
        console.error('Erro ao enviar as informações:', error);
    });
});


// TESTE DE SCRIPT ------------------------------------------------------------------------

document.getElementById('personal-info-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    // Coleta os dados do formulário
    const formData = new FormData(this);

    // Envia os dados usando fetch
    fetch('https://059b1ee9-ce33-4b95-8cd6-3b8468c167f0-00-3adhzxokdlz4g.worf.replit.dev/updateProfile', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com a resposta do servidor
        console.log('Sucesso:', data);
        alert('Cadastro realizado com sucesso!');
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao realizar o cadastro.');
    });
});