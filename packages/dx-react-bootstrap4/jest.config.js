const path = require('path');

module.exports = {
  verbose: true,
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
};
