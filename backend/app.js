const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// instancia do express
const app = express();
const con = require('./connection.js');
const mysql = require('mysql');
// Middleware para permitir JSON no corpo da requisição
const bodyParser = require('body-parser');
app.use(express.json());;
app.use('/uploads', express.static('uploads'))

// Middleware para permitir CORS
app.use(cors());

// Middleware para permitir JSON no corpo da requisição
app.use(bodyParser.json());

const rotaContratos = require('./routes/contractRoutes');
const { error } = require('console');
app.use('/contratos', rotaContratos);

app.use('/index', (req, res, next) => {
    res.status(200).send({
        mensagem: 'OK, DEU CERTO'
    });
});

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
    const error = new Error('Não Encontrado');
    error.status = 404;
    next(error);
});

// Caso entre na rota de erro ou o tempo de conexão exceda
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
})

module.exports = app;