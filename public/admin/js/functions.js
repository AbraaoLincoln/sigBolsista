var auxAtr = [];

function add(){
    switch(currentPage){
        case 1:
            salvarNovoBolsista()
            break;
        case 2:
            registrarPontoCompletoNoBD();
            break;
        case 3:
            salvarNovaJustificativa();
            break;
        case 4:
            salvarNovaMaquina();
            break;
        case 5:
            salvarNovaGerenteSetor();
            break;
        case 52:
            salvarNovaSetor();
            break;
        case 6:
            salvarNovaGerenteUnidade();
            break;
        case 62:
            salvarNovaUnidade();
            break;
    }
}

function update(){
    switch(currentPage){
        case 1:
            atualizarBolsista();
            break;
        case 2:
            atualizarPontoNoBD({
                cpf: auxAtr[0],
                data: formatDateMysql(auxAtr[1]),
                listaDeAtributos: makeListOfAtributes('updateFormPonto')
            });
            break;
        case 3:
            atualizarJustificativa();
            break;
        case 4:
            atualizarMaquina();
            break;
        case 5:
            atualizarGerenteSetor();
            break;
        case 52:
            atualizarSetor();
            break;
        case 6:
            atualizarGerenteUnidade();
            break;
        case 62:
            atualizarUnidade();
            break;
    }
    auxAtr = [];
}

function deleteAll(){
    switch(currentPage){
        case 1:
            deleteBolsista();
            break;
        case 2:
            deleteRegistroDePonto();
            break;
        case 3:
            deleteJustificativa();
            break;
        case 4:
            deleteMaquina();
            break;
        case 5:
            deleteGerenteSetor();
            break;
        case 52:
            deleteSetor();
            break;
        case 6:
            deleteGerenteUnidade();
            break;
        case 62:
            deleteUnidade();
            break;
    }
    
}

function makeListOfAtributes(form){
    let atrs = document.getElementById('tBolsista').children[0].children;
    let inputs = [];
    let listaDeAtributos = [];
    for(i of document.getElementById(form).children){
        if(i.nodeName == 'INPUT'){
            inputs.push(i);
        }
    }
    for(let i = 0; i < (atrs.length - 1); i++){
        let obj = {};
        obj.atr = atrs[i].innerText;
        if(inputs[i].name == 'hora'){
            obj.val = inputs[i].value.replace(':', '');
        }else if(inputs[i].name == 'data'){
            obj.val = "'" + formatDateMysql(inputs[i].value) + "'";
        }else{
            obj.val = inputs[i].value;
        }
        listaDeAtributos.push(obj);
    }
    console.log(listaDeAtributos);
    return listaDeAtributos
}

function deleteRegistroDePonto(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []
    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                cpf: table.children[i].children[0].innerText,
                dia: formatDateMysql(table.children[i].children[1].innerText)
            }
            itensToDelete.push(obj);
        }
    }

    deleteRegistroDePontoNoBD(itensToDelete);
    
}

function searchName(){
    let searchName = document.getElementById('nomePesquisa').value.toLowerCase();
    let table = document.getElementById('tBolsista');

    for(let i = 1; i < table.children.length; i++){
        if(!table.children[i].children[1].innerText.toLowerCase().includes(searchName)){
            table.children[i].style.display = 'none';
        }else{
            table.children[i].style.display = 'table-row';
        }
    }
}

// function searchName(){
//     let searchName = document.getElementById('nomePesquisa').value.toLowerCase();
//     console.log(tableRows);

//     for(let i = 0; i < tableRows.length; i++){
//         if(!tableRows[i].children[1].innerText.toLowerCase().includes(searchName)){
//             tableRows[i].style.display = 'none';
//             console.log(searchName);
//         }else{
//             tableRows[i].style.display = 'table-row';
//         }
//     }
// }

//Novo

//Bolsista crud

function salvarNovoBolsista(){
    let novoBolsista = {
        Id: document.getElementById('cpfBol').value,
        Nome: document.getElementById('nomebol').value,
        Senha: document.getElementById('passBol').value,
        Data_inicio: formatDateMysql(document.getElementById('dataIncBol').value),
        CargaHoraria: document.getElementById('cargaHBol').value,
        FK_IdSetor: document.getElementById('setorBol').value,
    }

    updateBolsistaNoBD(novoBolsista, 'POST');
}

function atualizarBolsista(){
    let bolsistaParaAtualizar = {
        Id: document.getElementById('updateCpfBol').value,
        Nome: document.getElementById('updateNomebol').value,
        Senha: document.getElementById('updatePassBol').value,
        Data_inicio: formatDateMysql(document.getElementById('updateDataIncBol').value),
        CargaHoraria: document.getElementById('updateCargaHBol').value,
        FK_IdSetor: document.getElementById('updateSetorBol').value,
        IdOld: auxAtr[0]
    }

    updateBolsistaNoBD(bolsistaParaAtualizar, 'PATCH');
}

function deleteBolsista(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []

    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                Id: table.children[i].children[0].innerText
            }
            itensToDelete.push(obj);
        }
    }

    for(bolsista of itensToDelete){
        updateBolsistaNoBD(bolsista, 'DELETE');
    }
}

//Justificativa crud

function salvarNovaJustificativa(){
    let novaJustificativa = {
        Descricao: document.getElementById('descrJust').value,
        FK_IdBolsista: document.getElementById('cpfJust').value,
        dia: formatDateMysqlAll(document.getElementById('diaJust').value.split(','))
    }

    updateJustificativaNoBD(novaJustificativa, 'POST');
}

function atualizarJustificativa(){
    let justificativaParaAtualizar = {
        Descricao: document.getElementById('updateDescrJust').value,
        Id: document.getElementById('updateIdJust').value
    }

    updateJustificativaNoBD(justificativaParaAtualizar, 'PATCH');
}

function deleteJustificativa(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []

    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                IdJustificativa: table.children[i].children[0].innerText
            }
            itensToDelete.push(obj);
        }
    }

    for(justificativa of itensToDelete){
        updateJustificativaNoBD(justificativa, 'DELETE');
    }
}

//Maquina crud

function salvarNovaMaquina(){
    let novaMaquina = {
        Ip: document.getElementById('ipMaquina').value,
        FK_IdSetor: document.getElementById('setorMaquina').value
    }

    updateMaquinaNoBD(novaMaquina, 'POST');
}

function atualizarMaquina(){
    let maquinaParaAtualizar = {
        Ip: document.getElementById('updateIpMaquina').value,
        FK_IdSetor: document.getElementById('updateSetorMaquina').value,
        IpOld: auxAtr[0]
    }

    updateMaquinaNoBD(maquinaParaAtualizar, 'PATCH');
}

function deleteMaquina(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []

    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                Ip: table.children[i].children[0].innerText
            }
            itensToDelete.push(obj);
        }
    }

    for(maquina of itensToDelete){
        console.log(maquina)
        updateMaquinaNoBD(maquina, 'DELETE');
    }
}

//Setor crud

function salvarNovaSetor(){
    let novoSetor = {
        Nome: document.getElementById('nomeSetor').value,
        FK_IdUnidade: document.getElementById('unidadeSetor').value
    }

    updateSetorNoBD(novoSetor, 'POST');
}

function atualizarSetor(){
    let setorParaAtualizar = {
        Nome: document.getElementById('updateNomeSetor').value,
        FK_IdUnidade: document.getElementById('updateSetorUnidade').value,
        Id: auxAtr[0]
    }

    updateSetorNoBD(setorParaAtualizar, 'PATCH');
}

function deleteSetor(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []

    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                Id: table.children[i].children[0].innerText
            }
            itensToDelete.push(obj);
        }
    }

    for(setor of itensToDelete){
        console.log(setor)
        updateSetorNoBD(setor, 'DELETE');
    }
}

//GerenteSetor crud

function salvarNovaGerenteSetor(){
    let novoGerenteSetor = {
        Id: document.getElementById('cpfGerenteSetor').value,
        Nome: document.getElementById('nomeGerenteSetor').value,
        Senha: document.getElementById('passGrenteSetor').value,
        FK_IdSetor: document.getElementById('setorGerencia').value,
    }

    updateGerenteSetorNoBD(novoGerenteSetor, 'POST');
}

function atualizarGerenteSetor(){
    let gerenteSetorParaAtualizar = {
        Id: document.getElementById('updateCpfGerenteSetor').value,
        Nome: document.getElementById('updateNomeGerenteSetor').value,
        Senha: document.getElementById('updatePassGerenteSetor').value,
        FK_IdSetor: document.getElementById('updateSetorGerencia').value,
        IdOld: auxAtr[0]
    }

    updateGerenteSetorNoBD(gerenteSetorParaAtualizar, 'PATCH');
}

function deleteGerenteSetor(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []

    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                Id: table.children[i].children[0].innerText
            }
            itensToDelete.push(obj);
        }
    }

    for(gerenteSetor of itensToDelete){
        console.log(gerenteSetor)
        updateGerenteSetorNoBD(gerenteSetor, 'DELETE');
    }
}

//GerenteUnidade crud

function salvarNovaGerenteUnidade(){
    let novoGerenteUnidade = {
        Id: document.getElementById('cpfGerenteUnidade').value,
        Nome: document.getElementById('nomeGerenteUnidade').value,
        Senha: document.getElementById('passGrenteUnidade').value,
        FK_IdUnidade: document.getElementById('unidadeGerencia').value,
    }

    updateGerenteUnidadeNoBD(novoGerenteUnidade, 'POST');
}

function atualizarGerenteUnidade(){
    let gerenteUnidadeParaAtualizar = {
        Id: document.getElementById('updateCpfGerenteUnidade').value,
        Nome: document.getElementById('updateNomeGerenteUnidade').value,
        Senha: document.getElementById('updatePassGerenteUnidade').value,
        FK_IdUnidade: document.getElementById('updateUnidadeGerencia').value,
        IdOld: auxAtr[0]
    }

    updateGerenteUnidadeNoBD(gerenteUnidadeParaAtualizar, 'PATCH');
}

function deleteGerenteUnidade(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []

    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                Id: table.children[i].children[0].innerText
            }
            itensToDelete.push(obj);
        }
    }

    for(gerenteUnidade of itensToDelete){
        console.log(gerenteUnidade)
        updateGerenteUnidadeNoBD(gerenteUnidade, 'DELETE');
    }
}

//Unidade crud

//Setor crud

function salvarNovaUnidade(){
    let novaUnidade = {
        Nome: document.getElementById('nomeUnidade').value
    }

    updateUnidadeNoBD(novaUnidade, 'POST');
}

function atualizarUnidade(){
    let unidadeParaAtualizar = {
        Nome: document.getElementById('updateNomeUnidade').value,
        Id: auxAtr[0]
    }

    updateUnidadeNoBD(unidadeParaAtualizar, 'PATCH');
}

function deleteUnidade(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []

    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                Id: table.children[i].children[0].innerText
            }
            itensToDelete.push(obj);
        }
    }

    for(unidade of itensToDelete){
        updateUnidadeNoBD(unidade, 'DELETE');
    }
}