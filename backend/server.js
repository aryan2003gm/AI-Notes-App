// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./backend/notes.db');

app.use(cors());
app.use(bodyParser.json());

// Create notes table
 db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
 )`);

// Get all notes
app.get('/notes', (req, res) => {
    db.all('SELECT * FROM notes', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add a new note
app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, title, content });
    });
});

// Update a note
app.put('/notes/:id', (req, res) => {
    const { title, content } = req.body;
    db.run('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Note updated' });
    });
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    db.run('DELETE FROM notes WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Note deleted' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));