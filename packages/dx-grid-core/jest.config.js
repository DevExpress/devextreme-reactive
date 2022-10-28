module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false, // set to true to enable type checking
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
};
