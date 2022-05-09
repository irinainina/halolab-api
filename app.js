const http = require('http');
const path = require('path');
const cards = require('./data/cards');
const users = require('./data/users');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');

  res.setHeader('Content-Type', 'application/json');

  switch(req.url) {
    case '/users':
      res.end(users);
      break;
    case '/cards':
      res.end(cards);
      break;
    default:
      res.end();
      break;
  }
  
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
