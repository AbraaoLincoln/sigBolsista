exports.checkInsert = (sql) => {
    let sqlKeyWordsNotAllow = ['drop', 'delete', 'update', 'create'];

    for(word of sqlKeyWordsNotAllow){
        if(sql.includes(word)){
            throw new Error({"sql": "sql invalid"});
            return false;
        }
    }
    
    if(sql.match(/insert/gi).length > 1){
        throw new Error({"sql": "sql invalid"});
        return false;
    }

    return true;
}

exports.checkSelect = (sql) => {
    let sqlKeyWordsNotAllow = ['drop', 'delete', 'update', 'create', 'insert'];

    for(word of sqlKeyWordsNotAllow){
        if(sql.includes(word)){
            throw new Error({"sql": 'sql invalid'});
            return false;
        }
    }
    
    if(sql.match(/select/gi).length > 1){
        throw new Error({"sql": "sql invalid"});
        return false;
    }

    return true;
}

exports.checkUpdate = (sql) => {
    let sqlKeyWordsNotAllow = ['drop', 'delete', 'select', 'create', 'insert'];

    for(word of sqlKeyWordsNotAllow){
        if(sql.includes(word)){
            throw new Error({"sql": "sql invalid"});
            return false;
        }
    }
    
    if(sql.match(/update/gi).length > 1){
        throw new Error({"sql": "sql invalid"});
        return false;
    }

    return true;
}

exports.checkDelete = (sql) => {
    let sqlKeyWordsNotAllow = ['drop', 'select', 'update', 'create', 'insert'];

    for(word of sqlKeyWordsNotAllow){
        if(sql.includes(word)){
            throw new Error({"sql": "sql invalid"});
            return false;
        }
    }
    
    if(sql.match(/delete/gi).length > 1){
        throw new Error({"sql": "sql invalid"});
        return false;
    }

    return true;
}

exports.checkParam = (param) => {
    let sqlKeyWordsNotAllow = ['drop', 'select', 'update', 'create', 'insert'];

    for(word of sqlKeyWordsNotAllow){
        if(param.includes(word)){
            throw new Error({"sqlVerify": "param invalid"});
            return false;
        }
    }

    return true;
}
