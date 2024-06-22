// use para limpar o localstoragee
// localStorage.clear();

let databaseTopics = {
    // será usado no arquivo do topico.html para saber qual topico é pra mostrar
    topicoInteiroJSON: [],
    selecionarQualTopico: 0,
};

let database = {
    nameTopic: "",
    topicSubject: [],
    selectFinishTopic: []
};

const retrievedDataBaseJSON = localStorage.getItem("databaseTopics");
if (retrievedDataBaseJSON) {
    const retrievedDatabase = JSON.parse(retrievedDataBaseJSON);
    databaseTopics = retrievedDatabase;
}

function publicarProjeto() {
    // Adicionar a imagem ao projeto, se uma imagem for selecionada
    var projeto = {
        "Area": document.getElementById('area').value,
        "Nivel": document.getElementById('nivel').value,
        "Nome": document.getElementById('nome_projeto').value,
        "Descricao": document.getElementById('descricao_projeto').value,
        "Prazo": document.getElementById('prazo_entrega').value,
        "Imagem": null // Inicialmente, a imagem é nula
    };

    var imagemInput = document.getElementById('arquivo');
    if (imagemInput.files.length > 0) {
        var imagem = imagemInput.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            projeto.Imagem = event.target.result; // Armazenar a imagem no projeto
            // Armazenar o projeto temporariamente no localStorage
            var projetosPublicados = JSON.parse(localStorage.getItem('projetos')) || [];
            projetosPublicados.push(projeto);
            localStorage.setItem('projetos', JSON.stringify(projetosPublicados));
            // Redirecionar para a tela de Projetos Publicados
            window.location.href = 'projects.html';
        };
        reader.readAsDataURL(imagem);
    } else {
        // Se nenhuma imagem for selecionada, armazenar o projeto sem imagem
        var projetosPublicados = JSON.parse(localStorage.getItem('projetos')) || [];
        projetosPublicados.push(projeto);
        localStorage.setItem('projetos', JSON.stringify(projetosPublicados));
        // Redirecionar para a tela de Projetos Publicados
        window.location.href = 'projects.html';
    }

    // criar novo topico para esse projeto
    let database = {
        nameTopic: document.getElementById('nome_projeto').value,
        topicSubject: [],
        selectFinishTopic: []
    };

    databaseTopics.topicoInteiroJSON.push(database);
    const databaseTopicsJSON = JSON.stringify(databaseTopics);
    localStorage.setItem("databaseTopics", databaseTopicsJSON);
}

// Função para exibir os projetos publicados
let projectButtonFinalList;
function exibirProjetos() {
    // Recuperar projetos do localStorage
    var projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    var projectList = document.getElementById('projectList');

    // Exibir projetos na tela
    projetos.forEach(function (projeto) {
        var divProjeto = document.createElement('div');
        divProjeto.className = "projetos";
        var titulo = document.createElement('h2');
        titulo.textContent = projeto.Nome;
        var imagem = document.createElement('img');
        imagem.src = projeto.Imagem; // Utiliza a imagem armazenada no projeto
        imagem.alt = "Imagem do Projeto";
        var descricao = document.createElement('p');
        descricao.textContent = projeto.Descricao;
        var buttonOpenTopic = document.createElement('button');
        buttonOpenTopic.textContent = "Ver tópicos do projeto";

        divProjeto.appendChild(titulo);
        divProjeto.appendChild(imagem);
        divProjeto.appendChild(descricao);
        divProjeto.appendChild(buttonOpenTopic);
        projectList.appendChild(divProjeto);

        // add event click in buttonOpenTopic
        eventClickToOpenTopic(buttonOpenTopic, -1);
        buttonOpenTopic.addEventListener('click', moveMainDiv);
    });

    // salvar a var projetos antes de modifcações feita no filtro pra evitar problemas ao pegar o index no eventClickToOpenTopic
    var projectButtonList = document.querySelectorAll('#projectList button');
    projectButtonFinalList = projectButtonList;
}

function moveMainDiv(event) {
    const mainDiv = document.getElementById('main');
    const parentOfClickedDiv = event.currentTarget.parentNode;

    parentOfClickedDiv.appendChild(mainDiv);
}

function eventClickToOpenTopic(button, indexElement) {
    button.addEventListener('click', () => {
        // pegar o index de qual projectList é
        const projectListButtonArray = Array.from(projectButtonFinalList);
        let index;

        if (indexElement != -1) {
            index = indexElement;
        } else {
            index = projectListButtonArray.indexOf(button);
        }

        // mandar selecionar o topico clicado
        databaseTopics.selecionarQualTopico = index;
        const databaseTopicsJSON = JSON.stringify(databaseTopics);
        localStorage.setItem("databaseTopics", databaseTopicsJSON);

        const main = document.querySelector("#main");

        main.style.display = "flex";

        database = databaseTopics.topicoInteiroJSON[index];

        // put nome topic
        const nameTopic = document.querySelector("#title_header_main h1");
        nameTopic.textContent = databaseTopics.topicoInteiroJSON[index].nameTopic;

        // carrega os topicos
        for (let i = 0; i < databaseTopics.topicoInteiroJSON[index].topicSubject.length; i++) {
            addNewTopic(databaseTopics.topicoInteiroJSON[index].topicSubject[i], databaseTopics.topicoInteiroJSON[index].selectFinishTopic[i], false);
        };

    });
}

// Se a página for a de Projetos Publicados, chama a função para exibir os projetos
if (window.location.pathname.includes('projects.html')) {
    document.addEventListener('DOMContentLoaded', exibirProjetos);
}

// Função para filtrar os projetos publicados
function filtrarProjetos() {
    // Recuperar projetos do localStorage
    var projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    var filteredProjects = projetos;

    // Filtrar por nome do projeto
    var nomeProjeto = document.getElementById('nome_projeto').value.trim().toLowerCase();
    if (nomeProjeto !== '') {
        filteredProjects = filteredProjects.filter(function (projeto) {
            return projeto.Nome.toLowerCase().includes(nomeProjeto);
        });
    }

    // Filtrar por área do projeto
    var areaProjeto = document.getElementById('area_projeto').value;
    if (areaProjeto !== '') {
        filteredProjects = filteredProjects.filter(function (projeto) {
            return projeto.Area === areaProjeto;
        });
    }

    // Filtrar por nível de projeto
    var niveisSelecionados = Array.from(document.querySelectorAll('input[name=nivel_projeto]:checked')).map(function (input) {
        return input.value;
    });
    if (niveisSelecionados.length > 0) {
        filteredProjects = filteredProjects.filter(function (projeto) {
            return niveisSelecionados.includes(projeto.Nivel);
        });
    }

    // Filtrar por prazo de entrega
    var prazoEntrega = document.getElementById('prazo_entrega').value;
    if (prazoEntrega !== '') {
        filteredProjects = filteredProjects.filter(function (projeto) {
            return projeto.Prazo <= prazoEntrega;
        });
    }

    // Limpar a lista de projetos antes de exibir os resultados do filtro
    var projectList = document.getElementById('projectList');
    var projectListAll = document.querySelectorAll('#projectList');
    const projectListAllArray = Array.from(projectListAll);

    projectList.innerHTML = '';

    // Exibir projetos filtrados na tela
    filteredProjects.forEach(function (projeto) {
        var divProjeto = document.createElement('div');
        var titulo = document.createElement('h2');
        titulo.textContent = projeto.Nome;
        var imagem = document.createElement('img');
        imagem.src = projeto.Imagem; // Utiliza a imagem armazenada no projeto
        imagem.alt = "Imagem do Projeto";
        var descricao = document.createElement('p');
        descricao.textContent = projeto.Descricao;
        var buttonOpenTopic = document.createElement('button');
        buttonOpenTopic.textContent = "Clique os topicos desse projeto";

        divProjeto.appendChild(titulo);
        divProjeto.appendChild(imagem);
        divProjeto.appendChild(descricao);
        divProjeto.appendChild(buttonOpenTopic);
        projectList.appendChild(divProjeto);

        // add event click in buttonOpenTopic
        let index = projetos.indexOf(projeto);
        eventClickToOpenTopic(buttonOpenTopic, index);
    });
}

// Função para atualizar o valor do prazo de entrega selecionado
document.getElementById('prazo_entrega').addEventListener('input', function () {
    document.getElementById('prazoValor').textContent = this.value;
});

// Função para aplicar os filtros quando o botão "Filtrar" for clicado
function aplicarFiltros() {
    filtrarProjetos();
}

document.addEventListener('DOMContentLoaded', function () {
    var menuBtn = document.getElementById('menuBtn');
    var sideNav = document.getElementById('sideNav');

    // Adiciona um evento de clique ao botão de menu
    menuBtn.addEventListener('click', function () {
        if (sideNav.style.width === '250px') {
            sideNav.style.width = '0';
        } else {
            sideNav.style.width = '250px';
        }
    });

    // Fecha o menu lateral quando clicar em qualquer lugar fora dele
    window.addEventListener('click', function (event) {
        if (event.target !== menuBtn && event.target !== sideNav) {
            sideNav.style.width = '0';
        }
    });

    // Impede o fechamento do menu lateral quando clicar dentro dele
    sideNav.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Fecha o menu lateral ao redimensionar a tela para uma tela maior
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 600) {
            sideNav.style.width = '250px';
        } else {
            sideNav.style.width = '0';
        }
    });
})


// TOPIC //

// add topic
const buttonAdd = document.querySelector('#buttonAdd_table_main');
const templateElement = document.getElementById('templateElement');

buttonAdd.addEventListener('click', () => {
    addNewTopic("", 0, true);
    database.topicSubject.push("");
    database.selectFinishTopic.push(0);
    saveChangesInDatabase();
});

// fuctions
function addEventClickInButton(button, countDatabase) {
    let count = countDatabase;
    button.addEventListener('click', () => {
        // reload
        const buttons = document.querySelectorAll('.boxSelect_infoElement_table_main');
        const elementTable = document.querySelectorAll('.element_table_main');
        const buttonsArray = Array.from(buttons);

        const index = buttonsArray.indexOf(button);

        console.log(database);
        count++
        if (count == 2) {
            count = 0;
            database.selectFinishTopic[index] = 0;
            elementTable[index].classList.remove('selectElement');
        } else {
            database.selectFinishTopic[index] = 1;
            elementTable[index].classList.add('selectElement');
        }

        console.log(database);
        saveChangesInDatabase();
    });
};

const backToProjectsButton = document.getElementById('backToProjectsButton');
addEventClickInButtonToBackProject(backToProjectsButton);

function addEventClickInButtonToBackProject(button) {
    const main = document.querySelector("#main");

    button.addEventListener('click', () => {
        main.style.display = "none";

        const mainContent = document.querySelectorAll("#main #table_main .element_table_main");
        mainContent.forEach(element => {
            element.remove();
        });
    });
};

function addEventClickInDelete(buttonDelete) {
    buttonDelete.addEventListener('click', () => {
        const buttonsDelete = document.querySelectorAll('.element_table_main i');
        const buttonsArray = Array.from(buttonsDelete);

        const index = buttonsArray.indexOf(buttonDelete);
        removeTopic(index);
        database.topicSubject.splice(index, 1);
        database.selectFinishTopic.splice(index, 1);
        saveChangesInDatabase();
    });
};

function addEventChangeText(inputChange) {
    inputChange.addEventListener('input', () => {
        const inputs = document.querySelectorAll('.element_table_main input');
        const inputsArray = Array.from(inputs);
        const index = inputsArray.indexOf(inputChange);

        database.topicSubject[index] = inputChange.value;
        saveChangesInDatabase();
    });
};

function addNewTopic(inputValue, flag, isAnimate) {
    // Clone the template element
    const templateElement = document.getElementById('templateElement');
    const newElement = templateElement.cloneNode(true);
    newElement.id = '';
    newElement.style.display = '';

    if (inputValue != "") {
        newElement.querySelector('input').value = inputValue;
    }

    if (flag === 1) {
        newElement.classList.add('selectElement');
    }

    const parent = document.getElementById('table_main');

    if (isAnimate) {
        document.body.appendChild(newElement);
        const newElementHeight = newElement.offsetHeight;
        document.body.removeChild(newElement);

        const originalHeightTable = parent.offsetHeight;

        parent.style.height = `${originalHeightTable}px`;

        anime({
            targets: parent,
            height: originalHeightTable + newElementHeight,
            duration: 200,
            easing: 'easeInOutQuad',
            complete: () => {
                parent.style.height = '';

                parent.insertBefore(newElement, buttonAdd);

                addEventClickInButton(newElement.querySelectorAll(".boxSelect_infoElement_table_main")[0], flag);
                addEventClickInDelete(newElement.querySelectorAll(".element_table_main i")[0]);
                addEventChangeText(newElement.querySelectorAll(".element_table_main input")[0]);

                anime({
                    targets: newElement,
                    opacity: [0, 1],
                    duration: 100,
                    easing: 'easeInOutQuad'
                });
            }
        });

        anime({
            targets: buttonAdd,
            translateY: newElementHeight,
            duration: 200,
            easing: 'easeInOutQuad',
            complete: () => {
                buttonAdd.style.transform = '';
            }
        });
    } else {
        const buttonAdd = document.querySelector('#buttonAdd_table_main');
        parent.insertBefore(newElement, buttonAdd);

        addEventClickInButton(newElement.querySelectorAll(".boxSelect_infoElement_table_main")[0], flag);
        addEventClickInDelete(newElement.querySelectorAll(".element_table_main i")[0]);
        addEventChangeText(newElement.querySelectorAll(".element_table_main input")[0]);
    }

}

function removeTopic(elementIndex) {
    const element = document.querySelectorAll('.element_table_main')[elementIndex];
    const parent = document.getElementById('table_main');

    const elementHeight = element.offsetHeight;

    anime({
        targets: element,
        opacity: [1, 0],
        scale: [1, 0.9],
        duration: 100,
        easing: 'easeInOutQuad',
        complete: () => {
            const originalHeightTable = parent.offsetHeight;
            const newHeightTable = originalHeightTable - elementHeight;

            parent.style.height = `${originalHeightTable}px`;

            anime({
                targets: parent,
                height: newHeightTable,
                duration: 200,
                easing: 'easeInOutQuad',
                complete: () => {
                    parent.removeChild(element);
                    parent.style.height = '';
                }
            });

            anime({
                targets: buttonAdd,
                translateY: -elementHeight,
                duration: 200,
                easing: 'easeInOutQuad',
                complete: () => {
                    buttonAdd.style.transform = '';
                }
            });
        }
    });
}

function saveChangesInDatabase() {
    const index = databaseTopics.selecionarQualTopico;
    databaseTopics.topicoInteiroJSON[index] = database;

    const databaseJSON = JSON.stringify(databaseTopics);
    localStorage.setItem("databaseTopics", databaseJSON);
}

// util
function resetDatabase() {
    let databaseNew = {
        nameTopic: database.nameTopic,
        topicSubject: [],
        selectFinishTopic: []
    };

    const index = databaseTopics.selecionarQualTopico;
    databaseTopics.topicoInteiroJSON[index] = databaseNew;

    const databaseJSON = JSON.stringify(databaseTopics);
    localStorage.setItem("databaseTopics", databaseJSON);
}