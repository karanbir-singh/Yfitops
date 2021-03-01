const express = require('express');

//Oggetto express
const app = express();

//Socket
const hostname = 'localhost';
const port = 3000;

//Server in ascolto...
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});