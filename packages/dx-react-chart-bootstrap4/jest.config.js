const path = require('path');

module.exports = {
  moduleNameMapper: {
    '.css$': path.join(__dirname, './css-stub.js'),
  },
  testEnvironment: 'jsdom',
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(d3|d3-scale|d3-array|d3-interpolate|d3-color|d3-format|d3-time|d3-time-format|internmap)/)',
  ],
};
