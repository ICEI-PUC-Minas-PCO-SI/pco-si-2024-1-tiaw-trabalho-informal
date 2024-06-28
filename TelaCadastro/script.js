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