import { execSync } from 'child_process';

export default () =>
  execSync('git branch', { stdio: 'pipe' })
    .toString()
    .trim()
    .split('\n')
    .filter(line => line.startsWith('*'))[0]
    .slice(2);
