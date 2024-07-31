const express = require('express');
const router = express.Router();
const Scripts = require('../models/scripts');

// Rota GET para obter todos os scripts
router.get('/', (req, res) => {
  Scripts.getAllScripts((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Rota GET para obter um script por ID
router.get('/:id', (req, res) => {
  const scriptId = req.params.id;
  Scripts.getScriptById(scriptId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Script not found' });
    res.json(results[0]);
  });
});

// Rota POST para criar um novo script
router.post('/', (req, res) => {
  const newScript = req.body;
  Scripts.createScript(newScript, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, ...newScript });
  });
});

// Rota DELETE para remover um script por ID
router.delete('/:id', (req, res) => {
  const scriptId = req.params.id;
  Scripts.deleteScript(scriptId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Script not found' });
    res.status(204).end();
  });
});

module.exports = router;