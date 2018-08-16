import { palette } from './computeds';

describe('Theme manager', () => {
  it('should return palette series', () => {
    expect(palette(Array.from({ length: 6 }))).toEqual([
      { themeColor: '#2196F3' },
      { themeColor: '#F44336' },
      { themeColor: '#4CAF50' },
      { themeColor: '#FFEB3B' },
      { themeColor: '#E91E63' },
      { themeColor: '#9C27B0' },
    ]);
  });
});
