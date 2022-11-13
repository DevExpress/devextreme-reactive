import { fileURLToPath } from 'url';
import path from 'path';

export default {
  setupFiles: [
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './setup-enzyme.js',
    ),
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
