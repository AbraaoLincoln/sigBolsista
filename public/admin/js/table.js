function createTableBolsistas(listaDeBolsistas){
    // tableRows = [];
    let atributes = ['CPF', 'Nome', 'Data Inicio', 'Carga Horaria', 'Setor'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(atr of atributes){
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atr;
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(bolsista of listaDeBolsistas){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', showEditBolsista)
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = bolsista.Id;
        let tableHeader2 = document.createElement('td');
        tableHeader2.innerHTML = bolsista.Nome;
        tableHeader2.className = 'tdNome';
        let tableHeader3 = document.createElement('td');
        let data = new Date(bolsista.Data_inicio);
        tableHeader3.innerHTML = data.getDate() + '/' + (data.getMonth() + 1) +'/' + data.getFullYear();
        let tableHeader4 = document.createElement('td');
        tableHeader4.innerHTML = formatHour(bolsista.CargaHoraria);
        let tableHeader5 = document.createElement('td');
        tableHeader5.innerHTML = bolsista.FK_IdSetor;
        let tableHeader6 = document.createElement('input');
        tableHeader6.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        tableRow.appendChild(tableHeader5);
        tableRow.appendChild(tableHeader6);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function createTableGerentes(listaDeGerentes,  typeOfGerente){
    // tableRows = [];
    let atributes = ['CPF', 'Nome', 'Setor Gerencia', 'Unidade Gerencia'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(let i = 0; i < atributes.length; i++){
        if(i == 2 && typeOfGerente){
            continue;
        }
        if(i == 3 && !typeOfGerente){
            continue;
        }
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atributes[i];
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(gerente of listaDeGerentes){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', !typeOfGerente ? showEditGerenteSetor : showEditGerenteUnidade);
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = gerente.Id;
        let tableHeader2 = document.createElement('td');
        tableHeader2.innerHTML = gerente.Nome;
        tableHeader2.className = 'tdNome';
        let tableHeader3 = document.createElement('td');
        tableHeader3.innerHTML = !typeOfGerente ? gerente.FK_IdSetor : gerente.FK_IdUnidade;
        let tableHeader4 = document.createElement('input');
        tableHeader4.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function createTableSetores(lista,  typeOf){
    // tableRows = [];
    let atributes = ['Id', 'Nome', 'Unidade'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(let i = 0; i < atributes.length; i++){
        if(i == 2 && typeOf){
            continue;
        }
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atributes[i];
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(aux of lista){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', typeOf ? showEditUnidade : showEditSetor);
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = aux.Id;
        let tableHeader2 = document.createElement('td');
        tableHeader2.className = 'tdNome';
        tableHeader2.innerHTML = aux.Nome;
        let tableHeader3 = document.createElement('td');
        tableHeader3.innerHTML = aux.FK_IdUnidade;
        let tableHeader4 = document.createElement('input');
        tableHeader4.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        if(!typeOf) tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function createTableRegistroPonto(listaDeRegistro){
    // tableRows = [];
    let atributes = ['FK_IdBolsista', 'Dia', 'Hora_entrada', 'Hora_saida'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(atr of atributes){
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atr;
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);

    table.appendChild(tableRow1);

    for(registro of listaDeRegistro){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', showEditRegistroPonto)
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = registro.FK_IdBolsista;
        let tableHeader2 = document.createElement('td');
        let data = new Date(registro.Dia);
        tableHeader2.innerHTML = data.getDate() + '/' + (data.getMonth() + 1) +'/' + data.getFullYear();
        // tableHeader2.innerHTML = registro.dia;
        let tableHeader3 = document.createElement('td');
        tableHeader3.innerHTML = formatHour(registro.Hora_entrada);
        let tableHeader4 = document.createElement('td');
        tableHeader4.innerHTML = formatHour(registro.Hora_saida);
        let tableHeader5 = document.createElement('input');
        tableHeader5.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        tableRow.appendChild(tableHeader5);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function createTableJustificativas(listaDeJusstificativas){
    // tableRows = [];
    let atributes = ['id', 'CPF', 'Descricao', 'Dia', 'Estado'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(atr of atributes){
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atr;
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(just of listaDeJusstificativas){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', showEditJustificativa)
        let tableHeader0 = document.createElement('td');
        tableHeader0.innerText = just.Id;
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = just.FK_IdBolsista;
        let tableHeader2 = document.createElement('td');
        tableHeader2.innerHTML = just.Descricao;
        tableHeader2.className = 'tdNome';
        let tableHeader3 = document.createElement('td');
        let data = new Date(just.Dia);
        tableHeader3.innerHTML = data.getDate() + '/' + (data.getMonth() + 1) +'/' + data.getFullYear();
        let tableHeader4 = document.createElement('td');
        tableHeader4.innerText = 'null';
        let tableHeader5 = document.createElement('input');
        tableHeader5.type = 'checkbox';
        tableRow.appendChild(tableHeader0);
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        tableRow.appendChild(tableHeader5);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function createTableMaquina(listaDeMaquinas){
    // tableRows = [];
    let atributes = ['IP', 'Setor'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(let i = 0; i < atributes.length; i++){
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atributes[i];
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(maquina of listaDeMaquinas){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', showEditMaquina);
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = maquina.Ip;
        let tableHeader2 = document.createElement('td');
        tableHeader2.innerHTML = maquina.FK_IdSetor;
        let tableHeader3 = document.createElement('input');
        tableHeader3.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}