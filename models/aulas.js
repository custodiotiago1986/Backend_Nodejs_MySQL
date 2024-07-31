const connection = require('../config/db');

// Criação da tabela Aulas
const createAulasTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Aulas (
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
    console.log('Tabela Aulas criada ou já existe.');
  });
};

createAulasTable();

module.exports = {
  getAllAulas: (callback) => {
    connection.query('SELECT * FROM Aulas', callback);
  },
  getAulaById: (id, callback) => {
    connection.query('SELECT * FROM Aulas WHERE id = ?', [id], callback);
  },
  createAula: (aula, callback) => {
    connection.query('INSERT INTO Aulas SET ?', aula, callback);
  },
  deleteAula: (id, callback) => {
    connection.query('DELETE FROM Aulas WHERE id = ?', [id], callback);
  }
};