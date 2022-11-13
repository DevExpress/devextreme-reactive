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
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
