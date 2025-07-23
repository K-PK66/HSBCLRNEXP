const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '528203982Way',
    database: 'myapp'
});

// Establish connection to database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes - how we want the data to travel, e.g. GET, PUT, POST, DELETE
// GET all the users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});
// POST (can be taken as INSERT) a new user
app.post('/users', (req, res) => {
    const { name } = req.body;
    // Database should not allow empty names - for security reason, return error if the name is blank.
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const id = req.params.id;
    // Insert new user into the database
    // We're using AUTO_INCREMENT in database to make id adding automatically, so we do not need to make changes to id.
    // We can use 'INSERT INTO users (name, id) VALUES (?, ?)' if we want to add id manually, not using AUTO_INCREMENT in SQL.
    // '?' is a parameterised SQL query sign to avoid SQL injection.
    db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.status(201).json({ id: result.insertId, name });
    });
});
// UPDATE an existing user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    db.query('UPDATE users SET name = ? WHERE id = ?', [name, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database update failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ id, name });
    });
});
// DELETE an existing user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database update failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).json({ message: 'User deleted.' });
    });
});

// start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});