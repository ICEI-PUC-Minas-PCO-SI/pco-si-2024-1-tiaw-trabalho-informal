let Pagamento = [
    {
        "Cliente": {
            "Id": 1,
            "Nome": {
                "PrimeiroNome": "",
                "Sobrenome": ""
            },
            "CPF": "",
            "NumeroCelular": "",
            "Endereco": {
                "CEP": "",
                "Rua": "",
                "Bairro": "",
                "NumeroCasa": "",
                "Estado": "",
                "Cidade": "",
                "PontoReferencia": ""
            }
        }
    },
    {
        "Cartao": {
            "Id": 1,
            "Funcao": "",
            "NomeTitular": "",
            "DataVencimento": "",
            "CVC": "",
            "ValorPagamento": 500
        }
    }
];
document.body.onload = () => {
    exibeConteudo()
    let valor = `${Pagamento[1].Cartao.ValorPagamento}`;
    document.querySelector('#valorPagamento').value = valor;
}
console.log(Pagamento)

// Obtém o valor do cartão e atribui ao elemento #valorPagamento

function AtualizaJson() {
    Pagamento[0].Cliente.Nome.PrimeiroNome = document.getElementById('nome').value;
    Pagamento[0].Cliente.Nome.Sobrenome = document.getElementById('sobrenome').value;
    Pagamento[0].Cliente.CPF = document.getElementById('cpf').value;
    Pagamento[0].Cliente.NumeroCelular = document.getElementById('celular').value;
    Pagamento[0].Cliente.Endereco.CEP = document.getElementById('cep').value;
    Pagamento[0].Cliente.Endereco.Rua = document.getElementById('rua').value;
    Pagamento[0].Cliente.Endereco.Bairro = document.getElementById('bairro').value;
    Pagamento[0].Cliente.Endereco.NumeroCasa = document.getElementById('numeroCasa').value;
    Pagamento[0].Cliente.Endereco.Estado = document.getElementById('estado').value;
    Pagamento[0].Cliente.Endereco.Cidade = document.getElementById('cidade').value;
    Pagamento[0].Cliente.Endereco.PontoReferencia = document.getElementById('pontoReferencia').value;
    Pagamento[1].Cartao.CVC = document.getElementById('cvc').value;
    Pagamento[1].Cartao.DataVencimento = document.getElementById('data').value;
    Pagamento[1].Cartao.Funcao = document.getElementById('funcao').value;
    Pagamento[1].Cartao.NomeTitular = document.getElementById('titular').value;
    console.log(Pagamento);
    document.querySelectorAll('input').forEach(item => {
        item.value = "";
    });
}

function exibeConteudo() {
    let str = ``;
    const cliente = Pagamento[0].Cliente; // Acessa o objeto Cliente dentro do elemento do array Pagamento
    str += `
    <div class="artefato">
        <div class="grid">
               <p class="p1">Nome:</p>
               <p class="p2">Sobrenome: </p>
               <input type="text" id="nome" placeholder="Nome:" maxlength="20">
               <input type="text" id="sobrenome" placeholder="Sobrenome:" maxlength="40">
               <p class="p3">CPF: </p>
               <input type="number" id="cpf" placeholder="12345678910" minlength="11" maxlength="11">
               <p class="p4">Celular: </p>
               <input type="number" id="celular" placeholder="12934567891" minlength="11" maxlength="13">
               <p class="p5">Cep: </p>
               <input type="number" id="cep" placeholder="12345-678" maxlength="9">
               <p class="p6">Rua:</p>
               <input type="text" id="rua" placeholder="Rua:" maxlength="30">
               <p class="p7">Bairro: </p>
               <input type="text" id="bairro" placeholder="Bairro:" >
               <p class="p8">Número: </p>
               <input type="number" id="numeroCasa">
               <p class="p9">Estado: </p>
               <select name="estado" id="estado">
                   <option value="">Escolher Estado</option>
                   <option value="Acre">AC - Acre</option>
                   <option value="Alagoas">AL - Alagoas</option>
                   <option value="Amapá">AP - Amapá</option>
                   <option value="Amazonas">AM - Amazonas</option>
                   <option value="Bahia">BA - Bahia</option>
                   <option value="Ceará">CE - Ceará</option>
                   <option value="Distrito Federal">DF - Distrito Federal</option>
                   <option value="Espírito Santo">ES - Espírito Santo</option>
                   <option value="Goiás">GO - Goiás</option>
                   <option value="Maranhão">MA - Maranhão</option>
                   <option value="Mato Grosso">MT - Mato Grosso</option>
                   <option value="Mato Grosso do Sul">MS - Mato Grosso do Sul</option>
                   <option value="Minas Gerais">MG - Minas Gerais</option>
                   <option value="Pará">PA - Pará</option>
                   <option value="Paraíba">PB - Paraíba</option>
                   <option value="Paraná">PR - Paraná</option>
                   <option value="Pernambuco">PE - Pernambuco</option>
                   <option value="Piauí">PI - Piauí</option>
                   <option value="Rio de Janeiro">RJ - Rio de Janeiro</option>
                   <option value="Rio Grande do Norte">RN - Rio Grande do Norte</option>
                   <option value="Rio Grande do Sul">RS - Rio Grande do Sul</option>
                   <option value="Rondônia">RO - Rondônia</option>
                   <option value="Roraima">RR - Roraima</option>
                   <option value="Santa Catarina">SC - Santa Catarina</option>
                   <option value="São Paulo">SP - São Paulo</option>
                   <option value="Sergipe">SE - Sergipe</option>
                   <option value="Tocantins">TO - Tocantins</option>
               </select>
               
               <p class="p10">Cidade</p>
               <input type="text" id="cidade" placeholder="">
               <p class="p11">Ponto de Referência: </p>
               <input type="text" id="pontoReferencia" placeholder="">
           
           
       </div>
       <div class="dadosCartao">
        <span class="span1">
            <p>Número do cartão</p>
            <input type="number" minlength="16" maxlength="16" id="numeroCartao">
        </span>
        <span class="span2">
            <p>Nome do Titular</p>
            <input type="text" maxlength="100" id="titular">
        </span>
        <span class="span3">
            <p>Validade</p>
            <input type="month" id="data" placeholder="00/00">
        </span>
        <span class="span4">
            <p>Função</p>
            <select name="funcao" id="funcao">
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
            </select>
        </span>
        <span class="span5">
            <p>CVV</p>
            <input type="number" minlength="3" maxlength="4" id="cvc">
        </span>
        <span>
            <h5>Total:</h5>
            <input type="text" readonly id="valorPagamento">
        </span>
       </div> 
    </div>
    <div id="pagamento" onclick="AtualizaJson()">
        <i class="bi bi-cart4"></i> <p>Efetuar Pagamento</p>
    </div>
    `;
    document.querySelector('#tela').innerHTML = str;
}
