const path = require('path');

module.exports = {
  // automock: true,
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
  testEnvironment: 'jsdom',
};
