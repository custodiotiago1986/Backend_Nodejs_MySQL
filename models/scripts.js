const connection = require('../config/db');

// Criação da tabela Scripts
const createScriptsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Scripts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      descricao TEXT,
      autor VARCHAR(255),
      data DATE,
      hora TIME
    )
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('Tabela Scripts criada ou já existe.');
  });
};

createScriptsTable();

module.exports = {
  getAllScripts: (callback) => {
    connection.query('SELECT * FROM Scripts', callback);
  },
  getScriptById: (id, callback) => {
    connection.query('SELECT * FROM Scripts WHERE id = ?', [id], callback);
  },
  createScript: (script, callback) => {
    connection.query('INSERT INTO Scripts SET ?', script, callback);
  },
  deleteScript: (id, callback) => {
    connection.query('DELETE FROM Scripts WHERE id = ?', [id], callback);
  }
};