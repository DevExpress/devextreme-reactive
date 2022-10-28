const path = require('path');

module.exports = {
  moduleNameMapper: {
    '.css$': path.join(__dirname, './css-stub.js'),
  },
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
  },
  testEnvironment: 'jsdom',
};
