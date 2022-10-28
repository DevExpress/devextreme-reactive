const path = require('path');
const resolve = require('resolve');

module.exports = {
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false, // set to true to enable type checking
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '.(js|ts|tsx)': resolve.sync('ts-jest')
  },
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
