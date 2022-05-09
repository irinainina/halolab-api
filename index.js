const express = require('express');
const path = require('path');
const cors = require('cors');
const cards = require('./data/cards');
const users = require('./data/users');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
  res.write('Hello world');
  res.end();
});

app.get('/cards', (req, res) => {
  res.end(cards);
});

app.get('/users', (req, res) => {
  res.end(users);
});