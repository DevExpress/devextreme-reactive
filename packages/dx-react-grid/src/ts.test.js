import { execSync } from 'child_process';

describe('ts definitions', () => {
  it('should compile without errors', () => {
    let err;
    try {
      execSync('tsc --noEmit test.ts', { cwd: __dirname, stdio: 'pipe' });
    } catch (e) {
      err = e.stdout.toString();
    }
    expect(err)
      .toBeUndefined();
  });
});
