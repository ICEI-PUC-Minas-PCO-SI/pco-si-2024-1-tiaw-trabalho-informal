document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        const userData = {
            email: email,
            password: password
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = 'entrar.html'; 
    });
});
