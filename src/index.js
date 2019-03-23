const mongoose = require('mongoose');

// check node version
const [major, minor] = process.versions.node.split('.').map(parseFloat);

if (major <= 7 && minor <= 5) {
  console.log('Please use a newer node version!');
  process.exit();
}

require('dotenv').config({ path: '.env' });

// connect to db and handle bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import models
import './models/User';

import '@babel/polyfill';
import app from './app';

const port = process.env.PORT || 8080;

const server = app.listen(port, err => {
  if (err) throw err;

  console.log(`> Ready on http://localhost:${port} 🚀`);
});

module.exports = server;
