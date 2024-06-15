// localStorage.clear()
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
    let Pagamento = [
        {
            "Cliente": {
                "Id": 1,
                "Nome": {
                    "PrimeiroNome": document.getElementById('nome').value,
                    "Sobrenome": document.getElementById('sobrenome').value
                },
                "CPF": document.getElementById('cpf').value,
                "NumeroCelular": document.getElementById('celular').value,
                "Endereco": {
                    "CEP": document.getElementById('cep').value,
                    "Rua": document.getElementById('rua').value,
                    "Bairro": document.getElementById('bairro').value,
                    "NumeroCasa": document.getElementById('numeroCasa').value,
                    "Estado": document.getElementById('estado').value,
                    "Cidade": document.getElementById('cidade').value,
                    "PontoReferencia": document.getElementById('pontoReferencia').value
                }
            }
        },
        {
            "Cartao": {
                "Id": 1,
                "Funcao": document.getElementById('funcao').value,
                "NomeTitular": document.getElementById('titular').value,
                "DataVencimento": document.getElementById('data').value,
                "CVC": document.getElementById('cvc').value,
                "ValorPagamento": 500
            }
        }
    ];
    document.querySelectorAll('input').forEach(item => {
        item.value = "";
    });
}
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0, rest;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

function validateForm() {
    let valid = true;

    // Seleciona todos os inputs
    const inputs = document.querySelectorAll(".grid input, .dadosCartao input, select");

    // Confere se cada input é vazio
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.style.border = "1px solid red";
            valid = false;
        } else {
            input.style.border = "none";
        }
    });

    // Define se é válido ou não
    const cpf = document.getElementById("cpf").value;
    if (!validateCPF(cpf)) {
        document.getElementById("cpf").style.border = "1px solid red";
        valid = false;
    }

    const numeroCartao = document.getElementById("numeroCartao").value;
    if (!/^\d{16}$/.test(numeroCartao)) {
        document.getElementById("numeroCartao").style.border = "1px solid red";
        valid = false;
    }

    const cvc = document.getElementById("cvc").value;
    if (!/^\d{3,4}$/.test(cvc)) {
        document.getElementById("cvc").style.border = "1px solid red";
        valid = false;
    }

    const cep = document.getElementById("cep").value;
    if (!/^\d{5}-\d{3}$/.test(cep)) {
        document.getElementById("cep").style.border = "1px solid red";
        valid = false;
    }

    if (valid) {
        // Se for válido , chama a função AtualizaJson e depois armazena no localStorage.
        AtualizaJson();
        let local = JSON.stringify(Pagamento);
        localStorage.setItem("Pagamento", local);
        console.log(localStorage.getItem("Pagamento"));
    } else {
        alert("Por favor, corrija os campos destacados.");
    }
}

//Exibe o Conteúdo na tela 
function exibeConteudo() {
    let str = ``;
    const cliente = Pagamento.Cliente;
    str += `
    <div class="artefato">
    <div class="grid">
        <p class="p1">Nome:</p>
        <p class="p2">Sobrenome: </p>
        <input type="text" id="nome" placeholder="Nome:" maxlength="20" required>
        <input type="text" id="sobrenome" placeholder="Sobrenome:" maxlength="40" required>
        <p class="p3">CPF: </p>
        <input type="text" id="cpf" placeholder="12345678910" minlength="11" maxlength="11" required>
        <p class="p4">Celular: </p>
        <input type="text" id="celular" placeholder="12934567891" minlength="11" maxlength="13" required>
        <p class="p5">Cep: </p>
        <input type="text" id="cep" placeholder="12345-678" minlength="9" maxlength="9" required>
        <p class="p6">Rua:</p>
        <input type="text" id="rua" placeholder="Rua:" maxlength="30" required>
        <p class="p7">Bairro: </p>
        <input type="text" id="bairro" placeholder="Bairro:" required>
        <p class="p8">Número: </p>
        <input type="number" id="numeroCasa" required>
        <p class="p9">Estado: </p>
        <select name="estado" id="estado" required>
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
        <input type="text" id="cidade" placeholder="" required>
        <p class="p11">Ponto de Referência: </p>
        <input type="text" id="pontoReferencia" placeholder="" required>
    </div>
    <div class="dadosCartao">
        <span class="span1">
            <p>Número do cartão</p>
            <input type="text" minlength="16" maxlength="16" id="numeroCartao" required>
        </span>
        <span class="span2">
            <p>Nome do Titular</p>
            <input type="text" maxlength="100" id="titular" required>
        </span>
        <span class="span3">
            <p>Validade</p>
            <input type="month" id="data" placeholder="00/00" required>
        </span>
        <span class="span4">
            <p>Função</p>
            <select name="funcao" id="funcao" required>
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
            </select>
        </span>
        <span class="span5">
            <p>CVV</p>
            <input type="text" minlength="3" maxlength="4" id="cvc" required>
        </span>
        <span>
            <h5>Total:</h5>
            <input type="text" readonly id="valorPagamento">
        </span>
    </div>
</div>
<div id="pagamento" onclick="validateForm();">
    <i class="bi bi-cart4"></i> <p>Efetuar Pagamento</p>
</div>

    `;
    document.querySelector('#tela').innerHTML = str;
}

