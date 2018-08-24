import { palette } from './computeds';

describe('Theme manager', () => {
  it('should return palette series', () => {
    expect(palette(Array.from({ length: 6 }).map(() => ({})))).toEqual(expect.any(Function));
  });
});
