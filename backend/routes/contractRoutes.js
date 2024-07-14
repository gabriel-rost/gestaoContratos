const express = require('express');
const router = express.Router();
const con = require('../connection.js');
const upload = require('../routes/fileRoutes.js');

// RETORNA TODOS OS CONTRATOS
router.get('/', (req, res, next) => {
    // Executamos a query para o banco de dados
    con.query("SELECT * FROM CONTRATOS", (err, result) => {
    if (err) {
        res.send(err)
    }
    res.send(result);
    });
});

// ROTA PARA ADICIONAR UM NOVO CONTRATO
router.post('/', upload.single('contrato_pdf'), (req, res, next) => {
    console.log()
    // Executamos a query para o banco de dados
    con.query('INSERT INTO contratos (titulo, pdf) VALUES (?, ?)',
        [req.body.titulo, req.file.path], (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    });
});

// RETORNA OS DADOS DE UM CONTRATO ESPECIFICO
router.get('/:id_contrato', (req, res, next) => {
    const id = req.params.id_contrato;
    // Executamos a query para o banco de dados
    con.query("SELECT * FROM CONTRATOS WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
        });
});

// ROTA PARA ATUALIZAR UM CONTRATO PELA ID
router.put('/:id', (req, res) => {
    const contratoId = req.params.id;
    const { titulo, descricao, dataAssinatura, dataValidade, status } = req.body;
    // Executamos a query para o banco de dados
    con.query('UPDATE contratos SET titulo = ?, descricao = ?, dataAssinatura = ?, dataValidade = ?, status = ? WHERE id = ?',
      [titulo, descricao, dataAssinatura, dataValidade, status, contratoId],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Contrato não encontrado');
        }
        res.send({ message: 'Contrato atualizado com sucesso' });
    });
});

// DELETA OS DADOS DE UM CONTRATO ESPECIFICO
router.delete('/:id_contrato', (req, res) => {
    const id = req.params.id_contrato;
    // Executamos a query para o banco de dados
    con.query('DELETE FROM contratos WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send({ mensagem: 'Erro ao excluir contrato', erro: err });
        }
        res.status(200).send({
            mensagem: 'Registro excluído',
            id: id
        });
    });
});

module.exports = router;