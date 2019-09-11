const mongoose = require('mongoose')

const { Schema } = mongoose;

const itemModel = new Schema(
  {
    title: { type: String },
    description: { type: String },
    completed: { type: Boolean, default: false }
  }
);

module.exports = mongoose.model('Item', itemModel)