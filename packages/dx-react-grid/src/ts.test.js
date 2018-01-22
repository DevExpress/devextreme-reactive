import { execSync } from 'child_process';

describe('ts definitions', () => {
  it('should compile without errors', () => {
    expect(() => {
      execSync('tsc --noEmit test.ts', { cwd: __dirname });
    })
      .not.toThrow();
  });
});
