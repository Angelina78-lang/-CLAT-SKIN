const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- ROUTES ---
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// --- ADDITIONAL DYNAMIC ENDPOINTS ---
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  const sql = `INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, subject, message], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to record enquiry.' });
    res.status(201).json({ message: 'Enquiry received. A specialist will be in touch.' });
  });
});

app.get('/api/health', (req, res) => {
  db.get('SELECT 1', (err) => {
    if (err) return res.status(500).json({ status: 'error', database: 'disconnected' });
    res.json({ status: 'ok', database: 'connected', service: 'ÉCLAT SKIN Backend' });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
