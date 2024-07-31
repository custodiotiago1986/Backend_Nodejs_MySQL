const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const aulasRoutes = require('./routes/aulasRoutes');
const scriptsRoutes = require('./routes/scriptsRoutes');

const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Rotas
app.use('/users', userRoutes);
app.use('/aulas', aulasRoutes);
app.use('/scripts', scriptsRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});