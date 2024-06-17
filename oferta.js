document.getElementById('proposta-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const oferta = document.querySelector('#oferta').value;
    const duracao = document.querySelector('#duracao').value;
    const comentario = document.querySelector('#comentario').value;

    const ofertaFinal = {
        oferta: {
            valor: oferta,
            duracao: duracao,
            comentario: comentario
        }
    };

    // Converter os dados em JSON e armazená-los no LocalStorage
    localStorage.setItem('ofertaFinal', JSON.stringify(ofertaFinal));
    console.log('Dados armazenados no LocalStorage:', JSON.stringify(ofertaFinal));
});
