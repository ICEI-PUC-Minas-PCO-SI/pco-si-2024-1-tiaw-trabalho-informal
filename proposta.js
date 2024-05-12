var propostaJSON = {
  "propostas": [], // Array para armazenar todas as propostas
  
  // Método para adicionar uma nova proposta à lista
  adicionarProposta: function(descricao, valor, exigencias) {
    // Convertendo o valor para um número de ponto flutuante (double)
    valor = parseFloat(valor);
    var novaProposta = {
      id: this.propostas.length, // ID único para a nova proposta
      descricao: descricao,
      valor: valor,
      exigencias: exigencias
    };
    this.propostas.push(novaProposta); // Adiciona a nova proposta à lista de propostas
  }
};

document.getElementById('botao1').addEventListener('click', function() {
  var descricao, valor, exigencias;
  var validacao = true; // Variável para controlar se a validação foi bem-sucedida
  do {
    // Capturando os valores dos campos de entrada
    descricao = document.getElementById('descricao').value;
    valor = document.getElementById('valor').value;
    exigencias = document.getElementById('exigencias').value;
    
    // Verificando se o valor capturado é um número
    if (isNaN(parseFloat(valor))) {
      // Se não for um número, solicite que o usuário insira um número válido ou cancele a operação
      validacao = confirm('O valor inserido não é um número. Deseja cancelar a operação?');
      if (!validacao) {
        break; // Se o usuário cancelar, saia do loop
      }
    }
  } while (isNaN(parseFloat(valor))); // Repete até que o valor seja um número
  
  // Se a validação foi bem-sucedida, adicione a nova proposta à lista de propostas no JSON
  if (validacao) {
    propostaJSON.adicionarProposta(descricao, valor, exigencias);

    // Limpando os campos de entrada
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('exigencias').value = '';

    // Exibindo a lista de propostas atualizada no console
    console.log('Propostas:', propostaJSON.propostas);
    alert('Proposta enviada com sucesso!');
  }
});
