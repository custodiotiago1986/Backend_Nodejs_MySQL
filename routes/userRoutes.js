const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Rota GET para obter todos os usuários
router.get('/', (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Rota GET para obter um usuário por ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.getUserById(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

// Rota POST para criar um novo usuário
router.post('/', (req, res) => {
  const newUser = req.body;
  User.createUser(newUser, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, ...newUser });
  });
});

// Rota DELETE para remover um usuário por ID
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  User.deleteUser(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.status(204).end();
  });
});

module.exports = router;