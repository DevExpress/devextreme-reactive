module.exports = {
  setupFiles: [],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
