// 0 = pagina principal
// 1 = gerenciamento de bolsista
// 2 = gerenciamento de ponto
// 3 = gerenciamento de justificativa
// 4 = gerenciamento de maquina de ponto
// 5 = gerenciamento de setor
// 6 = gerenciamento de unidade
var currentPage = 0;

window.onload = start;

function start(){
    hideForms()
    switch(localStorage.getItem('page')){
        case '1':
            document.getElementById('nomePesquisa').disabled = false;
            carregarBolsista();
            break;
        case '2':
            document.getElementById('nomePesquisa').disabled = false;
            carregarRegistroPonto();
            break;
        case '3':
            document.getElementById('nomePesquisa').disabled = true;
            carregarJustificativas();
            break;
        case '4':
            document.getElementById('nomePesquisa').disabled = true;
            carregarMaquinas();
            break;
        case '5':
            document.getElementById('nomePesquisa').disabled = false;
            carregarGerenteSetor();
            break;
        case '52':
            document.getElementById('nomePesquisa').disabled = false;
            carregarSetores();
            break;
        case '6':
            document.getElementById('nomePesquisa').disabled = false;
            carregarGerenteUnidade();
            break;
        case '62':
            document.getElementById('nomePesquisa').disabled = false;
            carregarUnidades();
            break;
    }
}

function logout(){
    alert("Esse butão não faz nada!")
    localStorage.setItem('page', 0);
}

function loadMenu(){
    document.getElementById('backMenu').style.display ='flex';
    document.getElementById('tBack').style.display ='none';
    document.getElementById('row1').style.display = 'flex';
    document.getElementById('row2').style.display = 'flex';
    document.getElementById('row3').style.display = 'none';
    document.getElementById('row4').style.display = 'none';
    currentPage = 0;
    localStorage.setItem('page', 0);
}


function showSetorMenu(){
    document.getElementById('row1').style.display = 'none';
    document.getElementById('row2').style.display = 'none';
    document.getElementById('row3').style.display = 'flex';
    currentPage = 5;
    localStorage.setItem('page', 0);
}

function showUnidadeMenu(){
    document.getElementById('row1').style.display = 'none';
    document.getElementById('row2').style.display = 'none';
    document.getElementById('row4').style.display = 'flex';
    currentPage = 6;
    localStorage.setItem('page', 0); 
}

//Carrega dados do Banco

async function carregarBolsista(){
    try {
        currentPage = 1;
        document.getElementById('nomePesquisa').disabled = false;
        let rawData = await fetch('http://localhost:3000/bolsistas');
        let res = await rawData.json();
        // console.log(res.response);
        createTableBolsistas(res.response);
        document.getElementById('backMenu').style.display ='none';
        document.getElementById('tBack').style.display ='flex';
        localStorage.setItem('page', currentPage);
    } catch (err) {
        console.log(err)
    }
}

async function carregarGerenteSetor(){
    try {
        currentPage = 5;
        document.getElementById('nomePesquisa').disabled = false;
        let rawData = await fetch('http://localhost:3000/gerentedesetor');
        let res = await rawData.json();
        createTableGerentes(res.response, 0);
        showTable();
        localStorage.setItem('page', currentPage);
    } catch (err) {
        console.log(err)
    }
}

async function carregarGerenteUnidade(){
    try {
        currentPage = 6;
        document.getElementById('nomePesquisa').disabled = false;
        let rawData = await fetch('http://localhost:3000/gerentedeunidade');
        let res = await rawData.json();
        createTableGerentes(res.response, 1);
        showTable();
        localStorage.setItem('page', currentPage);
    } catch (err) {
        console.log(err)
    }
}

async function carregarSetores(){
    try {
        currentPage = 52;
        document.getElementById('nomePesquisa').disabled = false;
        let rawData = await fetch('http://localhost:3000/setor');
        let res = await rawData.json();
        createTableSetores(res.response, 0);
        showTable();
        localStorage.setItem('page', currentPage);
    } catch (err) {
        console.log(err)
    }
}

async function carregarUnidades(){
    try {
        currentPage = 62;
        document.getElementById('nomePesquisa').disabled = false;
        let rawData = await fetch('http://localhost:3000/unidade');
        let res = await rawData.json();
        createTableSetores(res.response, 1);
        showTable();
        localStorage.setItem('page', currentPage);
    } catch (err) {
        console.log(err)
    }
}

async function carregarRegistroPonto(){
    try {
        currentPage = 2;
        document.getElementById('nomePesquisa').disabled = false;
        let rawData = await fetch('http://localhost:3000/ponto');
        let res = await rawData.json();
        console.log(res.result);
        createTableRegistroPonto(res.result);
        document.getElementById('backMenu').style.display ='none';
        document.getElementById('tBack').style.display ='flex';
        localStorage.setItem('page', currentPage);
    } catch (err) {
        console.log(err)
    }
}

async function carregarJustificativas(){
    try {
        currentPage = 3;
        document.getElementById('nomePesquisa').disabled = true;
        let rawData = await fetch('http://localhost:3000/justificativa');
        let res = await rawData.json();
        console.log(res.response);
        createTableJustificativas(res.response);
        document.getElementById('backMenu').style.display ='none';
        document.getElementById('tBack').style.display ='flex';
        localStorage.setItem('page', currentPage);
    } catch (err) {
        console.log(err)
    }
}

async function carregarMaquinas(){
    try {
        currentPage = 4;
        document.getElementById('nomePesquisa').disabled = true;
        let rawData = await fetch('http://localhost:3000/maquina');
        let res = await rawData.json();
        createTableMaquina(res.response);
        document.getElementById('backMenu').style.display ='none';
        document.getElementById('tBack').style.display ='flex';
        localStorage.setItem('page', currentPage);
    } catch (err) {
        console.log(err)
    }
}