import { URL } from 'url';

export default {
  setupFiles: [
    new URL('./setup-enzyme.js', import.meta.url).pathname,
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(d3|d3-scale|d3-array|d3-interpolate|d3-color|d3-format|d3-time|d3-time-format|d3-scale-chromatic|internmap)/)',
    '/dist/',
  ],
};
