const express = require('express')
const path = require('path');
let router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('admin.html', {root: path.join(__dirname, '../../views')});
});

router.get('/registrarPonto', (req, res) => {
    res.sendFile('admin.html', {root: path.join(__dirname, '../../views')});
});

module.exports = router;