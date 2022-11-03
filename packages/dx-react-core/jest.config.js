const path = require('path');

module.exports = {
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
