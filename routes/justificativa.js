
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        // conn.query(
        //     'SELECT * FROM JUSTIFICATIVA',
        //     (error, results, fields) => {
        //         conn.release();
        //         if(error) { return res.status(500).send({ error: error})}

        //         return res.status(200).send({response: results});
        //     }
        // )
        conn.query(
            'SELECT * FROM justificativa_e_dia',
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
            'INSERT INTO JUSTIFICATIVA (Descricao, FK_IdBolsista) VALUES (?,?)',

            [
                req.body.Descricao, req.body.FK_IdBolsista
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    message: 'Justificativa inserida com sucesso',
                });
            }
        )
    });

});

router.get('/:id_justificativa', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM JUSTIFICATIVA WHERE Id=?', 

            [
                req.params.id_justificativa
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
            `UPDATE JUSTIFICATIVA
                SET Descricao = ?
            WHERE Id = ?`,

            [
                req.body.Descricao, req.body.Id
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Justificativa atualizada com sucesso',
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
             FROM JUSTIFICATIVA
             WHERE Id = ?`,

            [
                req.body.IdJustificativa
            ],

            (error, results, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    message: 'Justificativa deletada com sucesso',
                });
            }
        )
    });
});


module.exports = router;