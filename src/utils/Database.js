const mongoose = require('mongoose');
const config = require('../config');

const url = config.mongodburl;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  module.exports = mongoose.connection;