const path = require('path');

module.exports = {
  moduleNameMapper: {
    '.css$': path.join(__dirname, './css-stub.js'),
  },
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
  transform: {
    "^.+\\.jsx?$": "./setup-babel-jest.js"
  },
};
