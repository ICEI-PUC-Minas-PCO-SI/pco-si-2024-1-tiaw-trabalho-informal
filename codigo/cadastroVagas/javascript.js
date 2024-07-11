import vagas from './jobs.json' with {type: 'json'}

var elem = document.getElementById('btnvaga')
elem.addEventListener('click', function () {

    console.log(elem)
    var divVaga = document.getElementById('filtrovaga').value;
    var divCat = document.getElementById('senioridade').value;
    var divLocal = document.getElementById('filtrolocalidade').value;

    var divtela = document.getElementById('tela');

    const dbMock = vagas;


    let str = '';
    for (let i = 0; i < dbMock.vagas.length; i++) {
        let vaga = dbMock.vagas[i];

        if (vaga.nome_vaga == divVaga && vaga.Location == divLocal && vaga.Categoria == divCat) {

            str += `<div class="card text-center mx-auto mt-40px"  style="width: 18rem;">
            
            <div class="card-body">
                <h5 class="card-title">${vaga.nome_vaga}</h5>
                <p class="card-text"><b>Senioridade:</b> ${vaga.Categoria} <br> <b>Descricao:</b> ${vaga.Descricao} <br> <b>Localidade:</b> ${vaga.Location}</p>
                <a href="ofertas.html?id=${vaga.id}" id="btnofer" class="btn btn-primary">Acessar Vaga</a>                
            </div>
        </div>`

        }
    }
    divtela.innerHTML = (`<h3><br>Alguns Projetos disponiveis para ${divVaga}, localidade: ${divLocal} e senioridade : ${divCat} : ${str}</h3>`)
    
    
    
});
