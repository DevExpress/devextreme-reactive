import { URL } from 'url';

export default {
  setupFiles: [
    new URL('./setup-enzyme.js', import.meta.url).pathname,
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
