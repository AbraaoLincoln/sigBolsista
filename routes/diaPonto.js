
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM DIA_PONTO',
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
            'INSERT INTO DIA_PONTO (Dia, FK_IdJustificativa) VALUES (?,?)',

            [
                req.body.Dia, req.body.FK_IdJustificativa
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    message: 'Dia ponto inserido com sucesso',
                });
            }
        )
    });

});


router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if(error) { return res.status(500).send({ error: error})}

        conn.query(
            `UPDATE DIA_PONTO
                SET Dia = ?,
                    FK_IdJustificativa = ?
            WHERE Dia=? AND FK_IdJustificativa = ?`,

            [
             req.body.Dia, req.body.FK_IdJustificativa, 
             req.body.DiaOld, req.body.FK_IdJustificativaOld
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Dia ponto atualizado com sucesso',
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
             FROM DIA_PONTO
             WHERE FK_IdJustificativa = ?`,

            [req.body.FK_IdJustificativa],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Dia ponto deletado com sucesso',
                    id_bolsista: req.body.Id
                });
            }
        )
    });
});


module.exports = router;