const path = require('path');

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
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
