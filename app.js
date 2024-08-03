const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Adicione esta linha
const userRoutes = require('./routes/userRoutes');
const aulasRoutes = require('./routes/aulasRoutes');
const scriptsRoutes = require('./routes/scriptsRoutes');

const app = express();

// Configuração do CORS
app.use(cors()); // Permite todas as origens provisoriamente

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Rotas
app.use('/users', userRoutes);
app.use('/aulas', aulasRoutes);
app.use('/scripts', scriptsRoutes);

// Porta definida pelo ambiente ou 3000 como fallback
const port = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});