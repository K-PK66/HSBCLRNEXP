'use strict';

const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

// data, in-memory
let movies = [
    { id: 1, name: 'A Better Tomorrow', year: 1986 }, // Gosh the Copilot even knows the film
    { id: 2, name: 'Wasabi', year: 2001 },
    { id: 3, name: 'Cold War', year: 2012 }
];

// middleware to parse JSON bodies
app.use(express.json());
// mandatory step - path for html
app.use(express.static(path.join(__dirname, 'public')));
// GET endpoint to retrieve all users
app.get('/movies', (req, res) => {
    res.json(movies);
});
// POST endpoint to add a new user
app.post('/movies', (req, res) => {
    const newMovie = req.body;
    newMovie.id = movies.length + 1; // simple ID assignment
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});