const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Adicione esta linha
const userRoutes = require('./routes/userRoutes');
const aulasRoutes = require('./routes/aulasRoutes');
const scriptsRoutes = require('./routes/scriptsRoutes');

const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Configuração do CORS
//app.use(cors({
//origin: 'http://localhost:5500', // Substitua pelo endereço do seu frontend se for diferente
//  methods: 'GET,POST,PUT,DELETE',
//allowedHeaders: 'Content-Type,Authorization'
//}));

app.use(cors()); // Permite todas as origens provisoriamente

// Rotas
app.use('/users', userRoutes);
app.use('/aulas', aulasRoutes);
app.use('/scripts', scriptsRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});