document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (!storedUserData) {
            alert('Nenhum usuário registrado encontrado.');
            return;
        }

        if (email === storedUserData.email && password === storedUserData.password) {
            // Redirecione para a próxima página ou realize outra ação desejada
            window.location.href = 'informacoes.html'; 
        } else {
            alert('Email ou senha incorretos.');
        }
    });
});
