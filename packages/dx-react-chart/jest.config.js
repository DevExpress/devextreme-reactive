import { URL } from 'url';

export default {
  setupFiles: [
    new URL('./setup-enzyme.js', import.meta.url).pathname,
  ],
  testEnvironment: 'jsdom',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.json',
      diagnostics: false,
    }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(d3|d3-scale|d3-array|d3-interpolate|d3-color|d3-format|d3-time|d3-time-format|internmap)/)',
  ],
};
