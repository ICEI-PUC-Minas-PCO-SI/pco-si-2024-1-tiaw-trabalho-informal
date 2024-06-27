document.addEventListener('DOMContentLoaded', function() {
    const btnAbrirMenu = document.getElementById('btn-menu');
    const btnFecharMenu = document.querySelector('.btn-fechar i');
    const menuMobile = document.getElementById('menu-mobile');
    const overlayMenu = document.getElementById('overlay-menu');
    const escolherFotoBtn = document.getElementById('escolher');
    const inputFoto = document.getElementById('input-foto');
    const fotoPerfilImg = document.getElementById('foto-perfil-img');
    const enviarBtn = document.getElementById('enviar');

    // Abrir menu mobile
    btnAbrirMenu.addEventListener('click', () => {
        menuMobile.classList.add('abrir-menu');
    });

    // Fechar menu mobile
    btnFecharMenu.addEventListener('click', () => {
        menuMobile.classList.remove('abrir-menu');
    });

    // Fechar menu mobile ao clicar fora
    overlayMenu.addEventListener('click', () => {
        menuMobile.classList.remove('abrir-menu');
    });

    // Abrir seletor de arquivos ao clicar no botão "Escolher foto de perfil"
    escolherFotoBtn.addEventListener('click', () => {
        inputFoto.click();
    });

    // Mostrar a imagem selecionada
    inputFoto.addEventListener('change', (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            fotoPerfilImg.src = e.target.result;
            localStorage.setItem('fotoPerfilBase64', e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // Coletar informações do formulário e armazenar em formato JSON no LocalStorage
    enviarBtn.addEventListener('click', () => {
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const areaInteresse = document.getElementById('area-interesse').value;
        const resumo = document.getElementById('resumo').value;
        const educacao = document.getElementById('educacao').value;
        const habilidades = document.getElementById('habilidades').value;

        const informacoesPessoais = {
            nome,
            sobrenome,
            areaInteresse,
            resumo,
            educacao,
            habilidades,
        };

        localStorage.setItem('informacoesPessoais', JSON.stringify(informacoesPessoais));

        // Redirecionar para a página de perfil
        window.location.href = 'perfil.html';
    });
});
