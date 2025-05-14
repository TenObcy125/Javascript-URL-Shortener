const express = require('express');
const cors = require('cors');
const path = require('path');
const {initializeDatabase} = require('./config/db');

const app = express();
const port = 2558;

app.use(cors());
app.use(express.json());

initializeDatabase();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:`+port);
});