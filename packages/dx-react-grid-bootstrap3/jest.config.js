const path = require('path');

module.exports = {
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
  testEnvironment: 'jsdom',
};
