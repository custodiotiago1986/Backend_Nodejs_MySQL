const express = require('express');
const router = express.Router();
const Aulas = require('../models/aulas');

// Rota GET para obter todas as aulas
router.get('/', (req, res) => {
  Aulas.getAllAulas((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Rota GET para obter uma aula por ID
router.get('/:id', (req, res) => {
  const aulaId = req.params.id;
  Aulas.getAulaById(aulaId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Aula not found' });
    res.json(results[0]);
  });
});

// Rota POST para criar uma nova aula
router.post('/', (req, res) => {
  const newAula = req.body;
  Aulas.createAula(newAula, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, ...newAula });
  });
});

// Rota DELETE para remover uma aula por ID
router.delete('/:id', (req, res) => {
  const aulaId = req.params.id;
  Aulas.deleteAula(aulaId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Aula not found' });
    res.status(204).end();
  });
});

module.exports = router;