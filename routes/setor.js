
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM SETOR',
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
            'INSERT INTO SETOR (Nome, FK_IdUnidade) VALUES (?,?)',

            [
                req.body.Nome, req.body.FK_IdUnidade
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    message: 'Setor inserido com sucesso',
                    id_bolsista: req.body.Id
                });
            }
        )
    });

});

router.get('/:id_setor', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM SETOR WHERE Id=?', [req.params.id_setor],

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
            `UPDATE SETOR
                SET Nome = ?,
                    FK_IdUnidade = ?
            WHERE Id = ?`,

            [
             req.body.Nome, 
             req.body.FK_IdUnidade, req.body.Id
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Setor atualizado com sucesso',
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
             FROM SETOR
             WHERE Id = ?`,

            [req.body.Id],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Setor deletado com sucesso',
                    id_bolsista: req.body.Id
                });
            }
        )
    });
});


module.exports = router;