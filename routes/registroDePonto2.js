const express = require('express')
const path = require('path');
const router = express.Router();
const mysql = require('../mysql').pool;
const promisify = require('../util/promisify');
const util = require('../util/aux');
const sqlInjVerify = require('../util/sqlInjectionVerify');

router.get('/registro', (req, res) => {
    res.sendFile('registroPonto.html', {root: path.join(__dirname, '../views')});
});

router.get('/', (req, res) => {
    mysql.getConnection(async (error, conn) => {
        try {
            if(error) console.log(error);
            let sql =  "select * from REGISTRO_PONTO";
            let registroDePonto =  await promisify(conn, sql);
            res.json({status: 'ok', result: registroDePonto});
        } catch (err) {
            console.log(err);
            res.json({status: 'error'});
        }
        conn.release();
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    mysql.getConnection(async (error, conn) => {
        try {
            if(error) console.log(error);
            sqlInjVerify.checkParam(req.body.data);
            sqlInjVerify.checkParam(req.body.cpf);
            sqlInjVerify.checkParam(req.body.hora);
            let sql =  "select * from REGISTRO_PONTO where dia = '" + req.body.data + "' and FK_IdBolsista = " + req.body.cpf ;
            let registroDeEntrada =  await promisify(conn, sql);
            console.log(registroDeEntrada);
            if(registroDeEntrada.length == 0){
                let sqlInsert = "insert into REGISTRO_PONTO values ('" + req.body.data + "'," + req.body.hora + ", null, " + req.body.cpf + ")"; 
                await promisify(conn, sqlInsert);
            }else{
                if(parseInt(req.body.hora) >= parseInt(registroDeEntrada[0].Hora_entrada)){
                    let sqlUpdate = "update REGISTRO_PONTO set Hora_saida = " + req.body.hora + " where dia = '" + req.body.data + "' and FK_IdBolsista = " + req.body.cpf;
                    await promisify(conn, sqlUpdate);
                    let r = await promisify(conn, "select CargaHoraria from BOLSISTA where Id = " + req.body.cpf);
                    let nova_CargaHoraria = r[0].CargaHoraria + util.calculateNewCargaHoraria(registroDeEntrada[0].Hora_entrada, req.body.hora);
                    sqlUpdate = "update BOLSISTA set CargaHoraria = " + nova_CargaHoraria + " where Id = " + req.body.cpf;
                    await promisify(conn, sqlUpdate);
                }else{
                    throw new Error({"arg": 'hora de saida menor quer de entrada'});
                }
            }
            res.json({status: 'ok'});
        } catch (err) {
            console.log(err);
            res.json({status: 'error'});
        }
        conn.release();
    });
})

router.post('/completo', (req, res) => {
    console.log(req.body);
    mysql.getConnection(async (error, conn) => {
        try {
            if(error) console.log(error);
            sqlInjVerify.checkParam(req.body.data);
            sqlInjVerify.checkParam(req.body.horaEntrada);
            sqlInjVerify.checkParam(req.body.horaSaida);
            sqlInjVerify.checkParam(req.body.cpf);
            if(parseInt(req.body.horaEntrada) <= parseInt(req.body.horaSaida)){
                let sqlInsert = "insert into REGISTRO_PONTO values ('"+ req.body.data + "'," + req.body.horaEntrada + "," + req.body.horaSaida + "," + req.body.cpf + ')';
                await promisify(conn, sqlInsert);
                let r = await promisify(conn, "select CargaHoraria from BOLSISTA where Id = " + req.body.cpf);
                let nova_CargaHoraria = r[0].CargaHoraria + util.calculateNewCargaHoraria(req.body.horaEntrada, req.body.horaSaida);
                sqlUpdate = "update BOLSISTA set CargaHoraria = " + nova_CargaHoraria + " where Id = " + req.body.cpf;
                await promisify(conn, sqlUpdate);
                res.json({status: 'ok'});
            }else{
                throw new Error({"arg": 'hora de saida menor quer de entrada'});       
            }
        } catch (err) {
            console.log(err);
            res.json({status: 'error'});
        } 
        conn.release();
    });
})

router.put('/', (req, res) => {
    mysql.getConnection(async (error, conn) => {
        try {
            if(error) console.log(error);
            console.log(req.body);
            let cargaOldPonto = 0;
            let newCpf = 0;
            let newData = '';
    
            if(req.body.novaCargaH){
                sqlInjVerify.checkParam(req.body.data);
                sqlInjVerify.checkParam(req.body.cpf);
                let sql =  "select * from REGISTRO_PONTO where dia = '" + req.body.data + "' and FK_IdBolsista = " + req.body.cpf ;
                let registroDePonto =  await promisify(conn, sql);
                cargaOldPonto = util.calculateNewCargaHoraria(registroDePonto[0].Hora_entrada, registroDePonto[0].Hora_saida);
            }
    
            let sqlUpdate = "update REGISTRO_PONTO set ";
            for(let i = 0; i < req.body.listaDeAtributos.length; i++){
                sqlInjVerify.checkParam(req.body.listaDeAtributos[i].atr);
                sqlInjVerify.checkParam(req.body.listaDeAtributos[i].val);
                if(i == 0){
                    sqlUpdate += util.formatAtribute(req.body.listaDeAtributos[i].atr) + " = " + req.body.listaDeAtributos[i].val;
                }else{
                    sqlUpdate += ", "+ util.formatAtribute(req.body.listaDeAtributos[i].atr) + " = " + req.body.listaDeAtributos[i].val;
                }
                
                if(util.formatAtribute(req.body.listaDeAtributos[i].atr) == 'bolsista'){
                    newCpf = req.body.listaDeAtributos[i].val;
                }
    
                if(util.formatAtribute(req.body.listaDeAtributos[i].atr) == 'dia'){
                    newData = req.body.listaDeAtributos[i].val;
                }
            }
            sqlUpdate += " where dia = '" + req.body.data + "' and FK_IdBolsista = " + req.body.cpf;
    
            let rUpd = await promisify(conn, sqlUpdate);
            if(rUpd.changedRows){
                if(req.body.novaCargaH){
                    let r = await promisify(conn, "select CargaHoraria from BOLSISTA where Id = " + req.body.cpf);
                    let nova_CargaHoraria = r[0].CargaHoraria - cargaOldPonto;
                    sqlUpdate = "update BOLSISTA set CargaHoraria = " + nova_CargaHoraria + " where Id = " + req.body.cpf;
                    let sql = "select * from REGISTRO_PONTO where dia = " + (newData ? newData : req.body.data) + " and FK_IdBolsista = " + (newCpf ? newCpf : req.body.cpf) ;
                    let registroDePonto =  await promisify(conn, sql);
                    r = await promisify(conn, "select CargaHoraria from BOLSISTA where Id = " + (newCpf ? newCpf : req.body.cpf));
                    nova_CargaHoraria = r[0].CargaHoraria + util.calculateNewCargaHoraria(registroDePonto[0].Hora_entrada, registroDePonto[0].Hora_saida);
                    sqlUpdate = "update BOLSISTA set CargaHoraria = " + nova_CargaHoraria + " where Id = " + (newCpf ? newCpf : req.body.cpf);
                    await promisify(conn, sqlUpdate);
                }
                res.json({status: 'ok'});
            }else{
                res.json({status: 'error'});    
            }
        } catch (err) {
            console.log(err);
            res.json({status: 'error'});
        }
        conn.release();
    });
})

router.delete('/', (req, res) => {
    console.log(req.body.listaDeRegistroToDelete);
    mysql.getConnection(async (error, conn) => {
        if(error) console.log(error);
        try {
            if(req.body.listaDeRegistroToDelete.length !== 0){
                for(registro of req.body.listaDeRegistroToDelete){
                    sqlInjVerify.checkParam(registro.cpf);
                    sqlInjVerify.checkParam(registro.dia);
                    let rS = await promisify(conn, "select CargaHoraria from BOLSISTA where Id = " + registro.cpf);
                    let sql =  "select * from REGISTRO_PONTO where dia = '" + registro.dia + "' and FK_IdBolsista = " + registro.cpf ;
                    let registroDePonto =  await promisify(conn, sql);
                    let nova_CargaHoraria = rS[0].CargaHoraria - util.calculateNewCargaHoraria(registroDePonto[0].Hora_entrada, registroDePonto[0].Hora_saida);
                    let sqlUpdate = "update BOLSISTA set CargaHoraria = " + nova_CargaHoraria + " where Id = " + registro.cpf;
                    await promisify(conn, sqlUpdate);
                    let sqlDelete = "delete from REGISTRO_PONTO where dia = '" + registro.dia + "' and FK_IdBolsista = " + registro.cpf;
                    await promisify(conn, sqlDelete);
                }
                res.json({status: 'ok'});
            }else{
                res.json({status: 'error'});
            }
        } catch (err) {
            console.log(err);
            res.json({status: 'error'});
        } 
        conn.release();
    });
});

module.exports = router;