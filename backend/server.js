const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/db_user/user', async (req, res) => {
  try {
    // Misal kamu punya tabel stats dengan kolom users, sales, revenue
    const [rows] = await pool.query('SELECT nama, email, password FROM stats LIMIT 1');
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json({ nama: '', email: '', password: '' });
    }
  } catch (error) {
    console.error('DB query error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
