import { fileURLToPath } from 'url';
import path from 'path';

export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  moduleNameMapper: {
    '\\.css$': path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './css-stub.js',
    ),
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
  ],
  testMatch: [
    '**/*.test.(ts|tsx|js|jsx)',
  ],
  setupFiles: [
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './setup-enzyme.js',
    ),
  ],
};
