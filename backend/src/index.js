const express = require('express');
const testconnection = require('./prisma/testConnection.js');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();



app.get('/', (req, res) => {
  const msg = 'Hello World';
  res.send(msg);
});



app.listen(PORT, HOST);
