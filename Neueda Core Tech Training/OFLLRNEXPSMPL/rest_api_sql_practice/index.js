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
    database: 'myMovie'
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
app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});
// POST (can be taken as INSERT) a new user
app.post('/movies', (req, res) => {
    const { name, year } = req.body; // 获取两个参数
    if (!name || !year) {
        return res.status(400).json({ error: 'Name and Year are required' });
    }
    // 同时插入title和yearOfRoadshow
    db.query('INSERT INTO movies (title, yearOfRoadshow) VALUES (?, ?)', 
        [name, year], 
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Database insert failed' });
            res.status(201).json({ 
                id: result.insertId, 
                title: name, 
                yearOfRoadshow: year 
            });
        }
    );
});

// UPDATE an existing user
app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { title, yearOfRoadshow } = req.body; // 使用正确字段名
    
    if (!title && !yearOfRoadshow) {
        return res.status(400).json({ error: 'Title or Year is required' });
    }
    
    const updates = [];
    const params = [];
    
    if (title) {
        updates.push('title = ?');
        params.push(title);
    }
    if (yearOfRoadshow) {
        updates.push('yearOfRoadshow = ?');
        params.push(yearOfRoadshow);
    }
    
    params.push(id);
    const sql = `UPDATE movies SET ${updates.join(', ')} WHERE id = ?`;
    
    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database update failed' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Movie not found' });
        res.json({ id, title, yearOfRoadshow });
    });
});
// DELETE an existing user
app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database update failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(204).json({ message: 'Movie deleted.' });
    });
});

// start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});