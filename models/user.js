const connection = require('../config/db');

// Criação da tabela users
const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('Tabela User criada ou já existe.');
  });
};

createUserTable();

module.exports = {
  getAllUsers: (callback) => {
    connection.query('SELECT * FROM users', callback);
  },
  getUserById: (id, callback) => {
    connection.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },
  createUser: (user, callback) => {
    connection.query('INSERT INTO users SET ?', user, callback);
  },
  deleteUser: (id, callback) => {
    connection.query('DELETE FROM users WHERE id = ?', [id], callback);
  }
};