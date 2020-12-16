function updateHour(){
    let date = new Date();
    document.getElementById('hora').innerText = date.getHours();
    document.getElementById('minutos').innerText = date.getMinutes();
    document.getElementById('segundos').innerText = date.getSeconds();
}

function startTimer(){
    setInterval(updateHour, 1000);
}

window.onload = startTimer;

async function registrarPontoNoBD(){
    let date = new Date();
    let dataDeHoje = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let registroPonto = {
        cpf: document.getElementById('cpf').value,
        data: dataDeHoje,
        hora: date.getHours() + '' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }

    try {
        let rawData = await fetch('http://localhost:3000/ponto', {
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