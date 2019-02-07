const path = require('path');

module.exports = {
  setupFiles: [
    path.join(__dirname, './setup-enzyme.js'),
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
