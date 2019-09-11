const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/itemAPI');
const port = process.env.PORT || 3000;
const Item = require('./models/itemModel');
const itemRouter = require('./routes/itemRouter')(Item);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', itemRouter);

app.get('/', (req, res) => {
  res.send('ToDo API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
