const { execSync } = require('child_process');

module.exports = () =>
  execSync('git branch', { stdio: 'pipe' })
    .toString()
    .trim()
    .split('\n')
    .filter(line => line.startsWith('*'))[0]
    .slice(2);
