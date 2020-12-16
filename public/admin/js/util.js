function formatDateMysql(dataToFormat){
    let splitDate = dataToFormat.split('/');
    return splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
}

function formatDateMysqlAll(listOfDateToFormat){
    let newListOfDate = []
    for(date of listOfDateToFormat){
        let splitDate = date.split('/');
        let newDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
        newListOfDate.push(newDate);
    }

    return newListOfDate;
}

function formatHour(hourInt){
    if(hourInt){
        let str = hourInt.toString();

        if(str.length == 1){
            return '0' + ':' + '0' + str[0];
        }else if(str.length == 2){
            return '0' + ':' + str[0] + str[1];
        }else if(str.length == 3){
            return str[0] + ':' + str[1] + str[2];
        }else{
            return str[0] + str[1] + ':' + str[2] + str[3];
        }
    }
}

function checkDate(date){
    if(parseInt(date) < 10){
        return '0' + date;
    }
}