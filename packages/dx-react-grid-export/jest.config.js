import { URL } from 'url';

export default {
  setupFiles: [
    new URL('./setup-enzyme.js', import.meta.url).pathname,
  ],
  testEnvironment: 'jsdom',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.json',
      diagnostics: false,
    }],
  },
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
