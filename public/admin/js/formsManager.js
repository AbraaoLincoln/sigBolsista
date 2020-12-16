function showTable(){
    document.getElementById('backMenu').style.display ='none';
    document.getElementById('tBack').style.display ='flex';
}

function hideBform(event){
    if(event.target.id == 'bForms'){
        event.target.style.display = 'none';
        document.getElementById('bForms').style.display ='none';
    }
}

function hideForm(event){
    event.target.parentNode.style.display = 'none';
    document.getElementById('bForms').style.display = 'none';
}

function hideForms(){
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('updateForm').style.display = 'none';
    document.getElementById('addFormPonto').style.display = 'none';
    document.getElementById('updateFormPonto').style.display = 'none';
    document.getElementById('addFormGerenteSetor').style.display = 'none';
    document.getElementById('updateFormGerenteSetor').style.display = 'none';
    document.getElementById('addFormGerenteUnidade').style.display = 'none';
    document.getElementById('updateFormGerenteUnidade').style.display = 'none';
    document.getElementById('addFormMaquina').style.display = 'none';
    document.getElementById('updateFormMaquina').style.display = 'none';
    document.getElementById('addFormSetor').style.display = 'none';
    document.getElementById('updateFormSetor').style.display = 'none';
    document.getElementById('addFormUnidade').style.display = 'none';
    document.getElementById('updateFormUnidade').style.display = 'none';
    document.getElementById('addFormJust').style.display = 'none';
    document.getElementById('updateFormJust').style.display = 'none';
}

function showAddForm(){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    if(currentPage == 1){
        document.getElementById('addForm').style.display = 'flex';
    }else if(currentPage == 2){
        document.getElementById('addFormPonto').style.display = 'flex';
    }else if(currentPage == 3){
        document.getElementById('addFormJust').style.display = 'flex';
    }else if(currentPage == 4){
        document.getElementById('addFormMaquina').style.display = 'flex';
    }else if(currentPage == 5){
        document.getElementById('addFormGerenteSetor').style.display = 'flex';
    }else if(currentPage == 52){
        document.getElementById('addFormSetor').style.display = 'flex';
    }else if(currentPage == 6){
        document.getElementById('addFormGerenteUnidade').style.display = 'flex';
    }else if(currentPage == 62){
        document.getElementById('addFormUnidade').style.display = 'flex';
    }
}

function showEditBolsista(event){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    document.getElementById('updateForm').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfBol').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomebol').value = dadosBolsista[1].innerText;
    document.getElementById('updateDataIncBol').value = dadosBolsista[2].innerText;
    document.getElementById('updateCargaHBol').value = dadosBolsista[3].innerText;
    document.getElementById('updateSetorBol').value = dadosBolsista[4].innerText;

    auxAtr.push(document.getElementById('updateCpfBol').value);
}

function showEditRegistroPonto(event){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    document.getElementById('updateFormPonto').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfBolPonto').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomebolPonto').value = dadosBolsista[1].innerText;
    document.getElementById('updateHoraIncBolPonto').value = dadosBolsista[2].innerText;
    document.getElementById('updateHoraSaidaBolPonto').value = dadosBolsista[3].innerText;

    auxAtr.push(document.getElementById('updateCpfBolPonto').value);
    auxAtr.push(document.getElementById('updateNomebolPonto').value);
}

function showEditJustificativa(event){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    document.getElementById('updateFormJust').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateIdJust').value = dadosBolsista[0].innerText;
    document.getElementById('updateCpfJust').value = dadosBolsista[1].innerText;
    document.getElementById('updateDescrJust').value = dadosBolsista[2].innerText;
    document.getElementById('updateDiaJust').value = dadosBolsista[3].innerText;
    document.getElementById('updateEstadoJust').value = dadosBolsista[4].innerText;

    auxAtr.push(document.getElementById('updateIdJust').value);
    auxAtr.push(document.getElementById('updateCpfJust').value);
}

function showEditMaquina(event){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    document.getElementById('updateFormMaquina').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateIpMaquina').value = dadosBolsista[0].innerText;
    document.getElementById('updateSetorMaquina').value = dadosBolsista[1].innerText;

    auxAtr.push(document.getElementById('updateIpMaquina').value);
}

function showEditGerenteSetor(event){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    document.getElementById('updateFormGerenteSetor').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfGerenteSetor').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomeGerenteSetor').value = dadosBolsista[1].innerText;
    document.getElementById('updateSetorGerencia').value = dadosBolsista[2].innerText;

    auxAtr.push(document.getElementById('updateCpfGerenteSetor').value);
}

function showEditSetor(event){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    document.getElementById('updateFormSetor').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateNomeSetor').value = dadosBolsista[1].innerText;
    document.getElementById('updateSetorUnidade').value = dadosBolsista[2].innerText;

    auxAtr.push(dadosBolsista[0].innerText);
}

function showEditGerenteUnidade(event){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    document.getElementById('updateFormGerenteUnidade').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfGerenteUnidade').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomeGerenteUnidade').value = dadosBolsista[1].innerText;
    document.getElementById('updateUnidadeGerencia').value = dadosBolsista[2].innerText;

    auxAtr.push(document.getElementById('updateCpfGerenteUnidade').value);
}

function showEditUnidade(event){
    document.getElementById('bForms').style.display = 'flex';
    // hideForms();
    document.getElementById('updateFormUnidade').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateNomeUnidade').value = dadosBolsista[1].innerText;

    auxAtr.push(dadosBolsista[0].innerText);
}