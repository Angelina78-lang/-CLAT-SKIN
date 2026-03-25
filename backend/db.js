const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'store.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the local SQLite database.');
    
    // Create Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create Products Table
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      text TEXT,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      compare_price REAL
    )`, (err) => {
      if (!err) {
        // Seed products if empty
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            subject TEXT,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
          if (row.count === 0) {
            const insert = 'INSERT INTO products (title, text, price, image, compare_price) VALUES (?,?,?,?,?)';
            db.run(insert, ['The Cellular Renewal Serum', 'For resilient, hydrated skin.', 85.00, '/serum.png', 115.00]);
            db.run(insert, ['The Barrier Restorative Cream', 'A comforting emulsion.', 65.00, '/cream.png', 85.00]);
            db.run(insert, ['The Purifying Gel Cleanser', 'Thorough cleansing without stripping.', 40.00, '/cleanser.png', 55.00]);
            console.log('Seeded products table.');
          }
        });
      }
    });
  }
});

module.exports = db;
