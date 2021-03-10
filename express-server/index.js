const express = require('express');
const fs = require('./user.js');
const cors = require('cors');

//Oggetto express
const app = express();

//Content-Type: application/json e CORS
app.use(cors());
app.use(express.json());

//Socket
const hostname = 'localhost';
const port = 3000;

//> Root: ritorna un oggetto json con esempi di possibili route a cui il server risponde.
app.get('/', (req, res) => {
    //prova();
    res.send({});
});

//> Login
app.get('/login', (req, res) => {
    res.send({});
});

//> User music
// app.get('/:userName', (req, res) => {
//     res.send({});
// });

//> Server in ascolto...
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});