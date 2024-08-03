require('dotenv').config();
const mysql = require('mysql2');
const { URL } = require('url');

// Parse the DATABASE_URL
const dbUrl = new URL(process.env.DATABASE_URL);

// Cria a conexão com base nos dados extraídos da URL
const connection = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1) // Remove a primeira barra da pathname
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

module.exports = connection;