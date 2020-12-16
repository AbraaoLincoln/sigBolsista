async function registrarPontoCompletoNoBD(){
    let registroPonto = {
        cpf: document.getElementById('cpfBolPonto').value,
        data: formatDateMysql(document.getElementById('diabolPonto').value),
        horaEntrada: document.getElementById('horaIncBolPonto').value,
        horaSaida: document.getElementById('horaSaidaBolPonto').value
    }

    try {
        let rawData = await fetch('http://localhost:3000/ponto/completo', {
           method: "POST",
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(registroPonto) 
        });
        let res = await rawData.json();
        if(res.status == 'ok'){
            alert('Ponto Registrado com sucesso!');
        }else{
            alert('Erro ao registrar o ponto tente novamente mais tarde!');
        }
    } catch (err) {
      console.log(err);  
    }

}

async function atualizarPontoNoBD(pontoToUpdate){
    pontoToUpdate.novaCargaH = 1;
    try {
        let rawData = await fetch('http://localhost:3000/ponto', {
           method: "PUT",
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(pontoToUpdate) 
        });
        let res = await rawData.json();
        if(res.status == 'ok'){
            alert('Ponto Atualizado com sucesso!');
        }else{
            alert('Erro ao atualizar o ponto tente novamente mais tarde!');
        }
    } catch (err) {
      console.log(err);  
    }
}


async function deleteRegistroDePontoNoBD(listaDeRegistro){
    try {
        let rawData = await fetch('http://localhost:3000/ponto', {
           method: "DELETE",
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify({listaDeRegistroToDelete: listaDeRegistro}) 
        });
        let res = await rawData.json();
        if(res.status == 'ok'){
            alert('Itens deletados com sucesso!');
        }else{
            alert('Erro ao deletar os itens selecionados tente novamente mais tarde!');
        }
    } catch (err) {
      console.log(err);  
    }
}

//novo

//Bolsista

async function updateBolsistaNoBD(bolsista, method){
    try {
        let rawData = await fetch('http://localhost:3000/bolsistas', {
           method: method,
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(bolsista) 
        });
        let res = await rawData.json();
        console.log(res);
        alert(res.message);
    } catch (err) {
      console.log(err);  
    }
}

//Justificativa

async function updateJustificativaNoBD(justificativa, method){
    try {
        let rawData = await fetch('http://localhost:3000/justificativa', {
           method: method,
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(justificativa) 
        });
        let res = await rawData.json();
        console.log(res);
        alert(res.message);
    } catch (err) {
      console.log(err);  
    }
}

//Maquina

async function updateMaquinaNoBD(novaMaquina, method){
    try {
        let rawData = await fetch('http://localhost:3000/maquina', {
           method: method,
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(novaMaquina) 
        });
        let res = await rawData.json();
        console.log(res);
        alert(res.message);
    } catch (err) {
      console.log(err);  
    }
}

//GerenteSetor

async function updateGerenteSetorNoBD(novoGerenteSetor, method){
    try {
        let rawData = await fetch('http://localhost:3000/gerentedesetor', {
           method: method,
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(novoGerenteSetor) 
        });
        let res = await rawData.json();
        console.log(res);
        alert(res.message);
    } catch (err) {
      console.log(err);  
    }
}

//Setor

async function updateSetorNoBD(novoSetor, method){
    try {
        let rawData = await fetch('http://localhost:3000/setor', {
           method: method,
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(novoSetor) 
        });
        let res = await rawData.json();
        console.log(res);
        alert(res.message);
    } catch (err) {
      console.log(err);  
    }
}

//GerenteUnidade crud

async function updateGerenteUnidadeNoBD(gerenteUnidade, method){
    try {
        let rawData = await fetch('http://localhost:3000/gerentedeunidade', {
           method: method,
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(gerenteUnidade) 
        });
        let res = await rawData.json();
        console.log(res);
        alert(res.message);
    } catch (err) {
      console.log(err);  
    }
}

//Unidade crud

async function updateUnidadeNoBD(enidade, method){
    try {
        let rawData = await fetch('http://localhost:3000/unidade', {
           method: method,
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(enidade) 
        });
        let res = await rawData.json();
        console.log(res);
        alert(res.message);
    } catch (err) {
      console.log(err);  
    }
}