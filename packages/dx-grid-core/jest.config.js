export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': '../../tools/setup-babel-jest.js',
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.json',
      diagnostics: false,
    }],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
