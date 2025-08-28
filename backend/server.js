const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Endpoint ambil semua user
app.get('/api/db_user/user', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nama, email, password FROM users');
    res.json(rows);
  } catch (error) {
    console.error('DB query error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});
// endpoint untuk menu
app.get('/api/menu', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM menu');
    res.json(rows);
  } catch (error) {
    console.error('DB query error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
