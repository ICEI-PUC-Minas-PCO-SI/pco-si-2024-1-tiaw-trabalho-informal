document.addEventListener('DOMContentLoaded', function() {
    // Recuperar informações do LocalStorage
    const informacoesPessoais = JSON.parse(localStorage.getItem('informacoesPessoais'));

    // Preencher campos na página de perfil
    if (informacoesPessoais) {
        document.getElementById('profile-name').textContent = informacoesPessoais.nome + ' ' + informacoesPessoais.sobrenome;
        document.getElementById('profile-education').textContent = informacoesPessoais.educacao;
        document.getElementById('profile-summary').textContent = informacoesPessoais.resumo;
    }

    // Preencher foto de perfil, se existir
    const fotoPerfilImg = document.getElementById('profileImage');
    const fotoPerfilBase64 = localStorage.getItem('fotoPerfilBase64');
    if (fotoPerfilBase64) {
        fotoPerfilImg.src = fotoPerfilBase64;
    }

    // Evento de clique no botão 'Editar perfil'
    const editProfileBtn = document.getElementById('edit-profile-button');
    editProfileBtn.addEventListener('click', function() {
        // Redirecionar para a página de informações pessoais
        window.location.href = 'informacoes.html';
    });
});
