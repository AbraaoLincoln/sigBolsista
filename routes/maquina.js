
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM MAQUINA',
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
            'INSERT INTO MAQUINA (Ip, FK_IdSetor) VALUES (?,?)',

            [
                req.body.Ip, req.body.FK_IdSetor
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    message: 'Maquina inserida com sucesso',
                });
            }
        )
    });

});

router.get('/:ip_maquina', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM MAQUINA WHERE Ip=?', 

            [
                req.params.ip_maquina
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
            `UPDATE MAQUINA
                SET Ip = ?,
                    FK_IdSetor = ?
            WHERE Ip = ?`,

            [
             req.body.Ip, req.body.FK_IdSetor, 
             req.body.IpOld
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Maquina atualizada com sucesso',
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
             FROM MAQUINA
             WHERE Ip = ?`,

            [req.body.Ip],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Maquina deletada com sucesso',
                    id_bolsista: req.body.Id
                });
            }
        )
    });
});


module.exports = router;