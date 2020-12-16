
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM REGISTRO_PONTO',
            (error, results, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                return res.status(200).send({response: results});
            }
        )
    });
}); 


router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'INSERT INTO REGISTRO_PONTO (Dia, Hora_entrada, Hora_saida, FK_IdBolsista) VALUES (?,?,?,?)',

            [
                req.body.Dia, req.body.Hora_entrada,
                req.body.Hora_saida, req.body.FK_IdBolsista
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    message: 'Registro de ponto inserido com sucesso',
                });
            }
        )
    });

});

router.get('/:Dia/:FK_IdBolsista', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM REGISTRO_PONTO WHERE Dia=? AND FK_IdBolsista', 
            [
                req.params.Dia, req.params.FK_IdBolsista
            ],

            (error, results, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                return res.status(200).send({response: results});
            }
        )
    });
})

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if(error) { return res.status(500).send({ error: error})}

        conn.query(
            `UPDATE REGISTRO_PONTO
                SET Dia = ?,
                    Hora_entrada = ?,
                    Hora_saida = ?,
                    FK_IdBolsista = ?
            WHERE Dia=? AND FK_IdBolsista=?`,

            [
             req.body.Dia, req.body.Hora_entrada, req.body.Hora_saida,
             req.body.FK_IdBolsista, req.body.DiaOld, req.body.FK_IdBolsistaOld
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Registro de ponto atualizado com sucesso',
                    id_bolsista: req.body.Id
                });
            }
        )
    });
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if(error) { return res.status(500).send({ error: error})}

        conn.query(
            `DELETE 
             FROM REGISTRO_PONTO
             WHERE Dia = ? AND FK_IdBolsista=?`,

            [
                req.body.Dia, req.body.FK_IdBolsista
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Registro ponto deletado com sucesso',
                    id_bolsista: req.body.Id
                });
            }
        )
    });
});


module.exports = router;