document.addEventListener('DOMContentLoaded', function() {
    const informacaoEnviada = JSON.parse(localStorage.getItem('informacaoEnviada'));

    if (informacaoEnviada) {
        const informacoesDiv = document.getElementById('informacoes-enviadas');
        informacoesDiv.innerHTML = `
            <p><strong>Nome:</strong> ${informacaoEnviada.nome}</p>
            <p><strong>Sobrenome:</strong> ${informacaoEnviada.sobrenome}</p>
            <p><strong>Área de Interesses:</strong> ${informacaoEnviada.interesses}</p>
            <p><strong>Resumo profissional:</strong> ${informacaoEnviada.resumo}</p>
            <p><strong>Educação e qualificações:</strong> ${informacaoEnviada.educacao}</p>
            <p><strong>Habilidades e Competências:</strong> ${informacaoEnviada.habilidades}</p>
        `;
    } else {
        document.getElementById('informacoes-enviadas').innerText = 'Nenhuma informação enviada.';
    }
});
