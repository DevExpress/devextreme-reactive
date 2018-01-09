import { readFileSync } from 'fs';

module.exports = function sourceReader(demo) {
  return readFileSync(require.resolve(`${demo}.jsx`), 'utf8');
};
