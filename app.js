const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = mongoose.connect('mongodb://localhost/itemAPI');
const port = process.env.PORT || 3000;
const Item = require('./models/itemModel');
const itemRouter = require('./routes/itemRouter')(Item);

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', itemRouter);

app.get('/', (req, res) => {
  res.send('ToDo API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
