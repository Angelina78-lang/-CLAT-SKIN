const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch products.' });
    }
    res.json({ products: rows });
  });
});

router.get('/search', (req, res) => {
  const query = req.query.q;
  if (!query) return res.json({ products: [] });

  const sql = `SELECT * FROM products WHERE title LIKE ? OR text LIKE ? OR category LIKE ?`;
  const params = [`%${query}%`, `%${query}%`, `%${query}%` ];
  
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Search failed.' });
    res.json({ products: rows });
  });
});

module.exports = router;
