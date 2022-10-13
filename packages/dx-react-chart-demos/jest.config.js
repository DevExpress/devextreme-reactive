const path = require('path');

module.exports = {
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(d3|d3-scale|d3-array|d3-interpolate|d3-color|d3-format|d3-time|d3-time-format|d3-scale-chromatic|internmap)/)',
    '/dist/',
  ],
  moduleNameMapper: {
    '\\.(css|svg)$': path.join(__dirname, './stub-module.js'),
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
  ],
  testMatch: [
    '**/*.test.(ts|tsx|js|jsx)',
  ],
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
};
