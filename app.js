const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const routeBolsistas = require('./routes/bolsistas');
const routeGerenteDeUnidade = require('./routes/gerenteDeUnidade');
const routeRegistroDePonto = require('./routes/registroDePonto');
const routeJustificativa = require('./routes/justificativa');
const routeSetor = require('./routes/setor');
const routeUnidade = require('./routes/unidade');
const routeMaquina = require('./routes/maquina');
const routeDiaPonto = require('./routes/diaPonto');
const routeGerenteDeSetor = require('./routes/gerenteDeSetor');
const routeAdministrador = require('./routes/administrador');
const viewsRouter = require('./routes/admin/views');
const pontoRouter = require('./routes/registroDePonto2');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//CORS treatment
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
               'Origin, X-Requested-With, Content-Type Accept, Authorization'
               );

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/bolsistas', routeBolsistas);
app.use('/gerentedeunidade', routeGerenteDeUnidade);
app.use('/registrodeponto', routeRegistroDePonto);
app.use('/justificativa', routeJustificativa);
app.use('/setor', routeSetor);
app.use('/unidade', routeUnidade);
app.use('/maquina', routeMaquina);
app.use('/diaponto', routeDiaPonto);
app.use('/gerentedesetor', routeGerenteDeSetor);
app.use('/administrador', routeAdministrador);
app.use('/admin', viewsRouter);
app.use('/ponto', pontoRouter);


app.use((req, rest, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        message: error.message
    });
});

module.exports = app;