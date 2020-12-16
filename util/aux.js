exports.calculateNewCargaHoraria = (horarioIncio, horarioFim) => {
    horarioIncioH = Math.floor(horarioIncio / 100);
    horarioIncioM = Math.round(((horarioIncio / 100) - horarioIncioH) * 100);
    horarioFimH = Math.floor(horarioFim / 100);
    horarioFimM = Math.round(((horarioFim / 100) - horarioFimH) * 100);

    //Fase 2
    let finalMinut = (60 - horarioIncioM) + horarioFimM;
    let finalHour = (horarioFimH - horarioIncioH) - 1;

    if(finalMinut >= 60){
        finalHour += 1;
        finalMinut -= 60;
    }

    let result = finalHour * 100 + finalMinut;
    return result;

}

// function calculateNewCargaHoraria(horarioIncio, horarioFim){
//     horarioIncioH = Math.floor(horarioIncio / 100);
//     horarioIncioM = Math.round(((horarioIncio / 100) - horarioIncioH) * 100);
//     horarioFimH = Math.floor(horarioFim / 100);
//     horarioFimM = Math.round(((horarioFim / 100) - horarioFimH) * 100);

//     //Fase 2
//     let finalMinut = (60 - horarioIncioM) + horarioFimM;
//     let finalHour = (horarioFimH - horarioIncioH) - 1;

//     if(finalMinut >= 60){
//         finalHour += 1;
//         finalMinut -= 60;
//     }

//     let result = finalHour * 100 + finalMinut;
//     console.log(result)

// }

// calculateNewCargaHoraria(1840, 1920);
// calculateNewCargaHoraria(820, 1920);
// calculateNewCargaHoraria(1840, 1923);
// calculateNewCargaHoraria(1202, 1302);

exports.formatAtribute = (atr) => {
    let formatAtr = atr.toLowerCase();
    formatAtr = formatAtr.replace(' ', '_');
    // console.log(formatAtr);
    return formatAtr;
}
