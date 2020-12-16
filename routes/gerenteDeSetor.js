
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM GERENTE_SETOR',
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
            'INSERT INTO GERENTE_SETOR (Id, Nome, Senha, FK_IdSetor) VALUES (?,?,?,?)',

            [
                req.body.Id, req.body.Nome,
                req.body.Senha, req.body.FK_IdSetor
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    message: 'Gerente de setor inserido com sucesso',
                });
            }
        )
    });

});

router.get('/:id_gerente_setor', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM GERENTE_SETOR WHERE Id=?', 

            [
                req.params.id_gerente_setor
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
            `UPDATE GERENTE_SETOR
                SET Id = ?,
                    Nome=?,
                    Senha=?,
                    FK_IdSetor=?
            WHERE Id = ?`,

            [
                req.body.Id, req.body.Nome, req.body.Senha, 
                req.body.FK_IdSetor, req.body.IdOld
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Gerente de setor atualizado com sucesso',
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
             FROM GERENTE_SETOR
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