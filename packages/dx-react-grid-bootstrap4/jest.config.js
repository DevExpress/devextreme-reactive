import { URL } from 'url';

export default {
  moduleNameMapper: {
    '.css$': new URL('./css-stub.js', import.meta.url).pathname,
  },
  setupFiles: [
    new URL('./setup-enzyme.js', import.meta.url).pathname,
  ],
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
  },
  testEnvironment: 'jsdom',
};
