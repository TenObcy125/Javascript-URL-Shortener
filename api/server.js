const express = require('express');
const cors = require('cors');
const {initializeDatabase} = require('./config/db');

const app = express();
const port = 2558;

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});