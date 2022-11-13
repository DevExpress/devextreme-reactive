import { fileURLToPath } from 'url';
import path from 'path';

export default {
  verbose: true,
  setupFiles: [
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './setup-enzyme.js',
    ),
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(d3|d3-scale|d3-array|d3-interpolate|d3-color|d3-format|d3-time|d3-time-format|internmap)/)',
  ],
};
