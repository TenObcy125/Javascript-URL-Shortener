const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./config/db');
const bodyParser = require('body-parser');

const app = express();
const port = 2558;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

initializeDatabase()
    .then((db) => {
        app.locals.db = db;

        app.post('/create', (req, res) => {
            const { url, shorten_name } = req.body;
            if (!url || !shorten_name) {
                return res.status(400).send('URL and shorten_name are required');
            }
            
            db.run(
                'INSERT INTO links (url, shorter_version) VALUES (?, ?)',
                [url, shorten_name],
                function (err) {
                    if (err) {
                        console.error('DB error:', err);
                        res.status(500).send('Error inserting data');
                        return;
                    }
                    res.status(201).send({ id: this.lastID, shorter_version: shorten_name });
                }
            );
        });

        app.get('/:name', (req, res) => {
            const name = req.params.name;
            
            db.get(
                'SELECT url FROM links WHERE shorter_version = ?',
                [name],
                (err, row) => {
                    if (err) {
                        console.error('DB error:', err);
                        return res.status(500).send('Database error');
                    }
                    
                    if (row && row.url) {
                        res.redirect(row.url);
                    } else {
                        res.redirect('http://localhost:2558');
                    }
                }
            );
        });
    })
    .catch(err => {
        console.error('Failed to initialize database:', err);
    });

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});