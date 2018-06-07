import { palette } from './computeds';

describe('Theme manager', () => {
  it('should return palette series', () => {
    expect(palette(Array.from({ length: 6 }).map(() => ({})))).toEqual([
      { color: '#2196F3' },
      { color: '#F44336' },
      { color: '#4CAF50' },
      { color: '#FFEB3B' },
      { color: '#E91E63' },
      { color: '#9C27B0' },
    ]);
  });
});
