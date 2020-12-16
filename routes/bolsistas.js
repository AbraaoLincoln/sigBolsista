
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM BOLSISTA',
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
            'INSERT INTO BOLSISTA (Id, Nome, Senha, Data_inicio, CargaHoraria, FK_IdSetor) VALUES (?,?,?,?,?,?)',

            [
                req.body.Id, req.body.Nome, req.body.Senha, req.body.Data_inicio, 
                req.body.CargaHoraria,req.body.FK_IdSetor
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    message: 'Bolsista inserido com sucesso',
                });
            }
        )
    });

});

router.get('/:cpf_bolsista', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM BOLSISTA WHERE Id=?',
            [req.params.cpf_bolsista],
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
            `UPDATE BOLSISTA
                SET Id = ?,
                    Nome = ?,
                    Senha = ?,
                    Data_inicio = ?,
                    CargaHoraria = ?,
                    FK_IdSetor = ?
            WHERE Id = ?`,

            [req.body.Id, req.body.Nome, req.body.Senha,
             req.body.Data_inicio, req.body.CargaHoraria,
             req.body.FK_IdSetor, req.body.IdOld],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Bolsista updated with success',
                    id_bolsista: req.body.IdOld
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
             FROM BOLSISTA
             WHERE Id = ?`,

            [req.body.Id],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Bolsista deleted with success',
                    id_bolsista: req.body.Id
                });
            }
        )
    });
});


module.exports = router;