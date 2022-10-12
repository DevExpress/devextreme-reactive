const path = require('path');

module.exports = {
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  moduleNameMapper: {
    '\\.css$': path.join(__dirname, './css-stub.js'),
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
