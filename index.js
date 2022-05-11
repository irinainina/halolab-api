const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Card = require('./models/card');

const app = express();
app.use(cors());
app.use(express.static('styles'));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
const db = 'mongodb+srv://admin:123@cluster0.gdcfw.mongodb.net/halolab-test-api?retryWrites=true&w=majority';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(createPath('index'));
});

app.get('/cards', (req, res) => {
  Card
    .find({},{"_id" : false})
    .then((cards) => res.end(JSON.stringify(cards)))
    .catch((error) => {
      console.log(error);
    });
});

app.get('/users', (req, res) => {
  User
    .find({},{"_id" : false, "__v" : false})
    .then((users) => res.end(JSON.stringify(users)))
    .catch((error) => {
      console.log(error);
    });
});

app.get('/add-user', (req, res) => {  
  res.sendFile(createPath('add-user'));
});

app.post('/add-user', cors(), (req, res) => {
  const { name, number } = req.body;
  const user = new User({ name, number });
  user
    .save()
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
    })
});