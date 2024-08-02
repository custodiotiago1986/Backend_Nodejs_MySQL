const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, deleteUser } = require('../services/driveService');

// Rota GET para obter todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota GET para obter um usuário por ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota POST para criar um novo usuário
router.post('/', async (req, res) => {
  const newUser = req.body;
  try {
    const user = await createUser(newUser);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota DELETE para remover um usuário por ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await deleteUser(userId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;