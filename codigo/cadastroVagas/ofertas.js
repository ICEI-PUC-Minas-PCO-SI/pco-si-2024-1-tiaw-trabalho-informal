
async function fetchDetalhamentoVaga() {
    try {
        const response = await fetch('https://059b1ee9-ce33-4b95-8cd6-3b8468c167f0-00-3adhzxokdlz4g.worf.replit.dev/vagas'); // URL da sua API
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Erro ao buscar os projetos:', error);
        return []; // Retorna um array vazio em caso de erro
    }
}


const urlParams = new URLSearchParams(location.search);
var idCat = parseInt(urlParams.get('id'));


let str = '';
let number = 0
for (let i = 0; i < dbMock.vagas.length; i++) {
    let vaga = dbMock.vagas[i];
    if (idCat == idCat) {
        console.log(idCat);
        str = `<div class="card text-center mx-auto mt-40px"  style="width: 18rem;">            
    <div class="card-body">
        <h5 class="card-title">${vaga.nome_vaga}</h5>
        <p class="card-text"><b>Senioridade:</b> ${vaga.Categoria} <br> <b>Descricao:</b> ${vaga.Descricao} <br> <b>Localidade:</b> ${vaga.Location}</p>
                        
    </div>
</div>`
    }
}
divtela.innerHTML = (`${str}`)








