import { URL } from 'url';

export default {
  setupFiles: [
    new URL('./setup-enzyme.js', import.meta.url).pathname,
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
  },
};
