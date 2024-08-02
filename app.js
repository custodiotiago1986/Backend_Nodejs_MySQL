const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Configuração do CORS
app.use(cors());

// Rotas
app.use('/users', userRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});