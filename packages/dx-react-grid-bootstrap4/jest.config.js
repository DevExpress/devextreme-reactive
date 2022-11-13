import { fileURLToPath } from 'url';
import path from 'path';

export default {
  moduleNameMapper: {
    '.css$': path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './css-stub.js',
    ),
  },
  setupFiles: [
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './setup-enzyme.js',
    ),
  ],
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
  },
  testEnvironment: 'jsdom',
};
