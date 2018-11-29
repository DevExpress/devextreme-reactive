const path = require('path');

module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
};
