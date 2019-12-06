import {
  getMinWidth,
  getViewCellKey,
} from './utils';

describe('Utils', () => {
  describe('#getMinWidth', () => {
    it('should work', () => {
      expect(getMinWidth(5, 25))
        .toBe('125px');
    });
  });
  describe('#getViewCellKey', () => {
    it('should return startDate if groups are undefined', () => {
      expect(getViewCellKey('test', undefined))
        .toBe('test');
    });
    it('should return startDate concat startDate with groups', () => {
      expect(getViewCellKey('test', [{ id: 1 }, { id: 2 }]))
        .toBe('test12');
    });
  });
});
