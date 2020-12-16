
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM GERENTE_UNIDADE',
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
            'INSERT INTO GERENTE_UNIDADE (Id, Nome, Senha, FK_IdUnidade) VALUES (?,?,?,?)',

            [
                req.body.Id, req.body.Nome,
                req.body.Senha, req.body.FK_IdUnidade
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    message: 'Gerente de unidade inserido com sucesso',
                });
            }
        )
    });

});

router.get('/:id_gerente_unidade', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM GERENTE_UNIDADE WHERE Id=?', 

            [
                req.params.id_gerente_unidade
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
            `UPDATE GERENTE_UNIDADE
                SET Id = ?,
                    Nome=?,
                    Senha=?,
                    FK_IdUnidade=?
            WHERE Id = ?`,

            [
                req.body.Id, req.body.Nome, req.body.Senha, 
                req.body.FK_IdUnidade, req.body.IdOld
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Gerente de unidade atualizado com sucesso',
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
             FROM GERENTE_UNIDADE
             WHERE Id = ?`,

            [
                req.body.Id
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Gerente de unidade deletado com sucesso',
                });
            }
        )
    });
});


module.exports = router;