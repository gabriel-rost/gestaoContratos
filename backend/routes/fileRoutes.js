const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configurar o Multer para salvar arquivos no diretório 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage });

module.exports = upload;