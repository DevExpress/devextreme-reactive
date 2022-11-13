import { fileURLToPath } from 'url';
import path from 'path';

export default {
  moduleNameMapper: {
    '.css$': path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './css-stub.js',
    ),
  },
  testEnvironment: 'jsdom',
  setupFiles: [
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './setup-enzyme.js',
    ),
  ],
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(d3|d3-scale|d3-array|d3-interpolate|d3-color|d3-format|d3-time|d3-time-format|internmap)/)',
  ],
};
