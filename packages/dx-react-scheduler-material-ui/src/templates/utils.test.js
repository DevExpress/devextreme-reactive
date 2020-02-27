import {
  getWidthInPixels,
  getViewCellKey,
  getResourceColor,
} from './utils';

describe('Utils', () => {
  describe('#getWidthInPixels', () => {
    it('should work', () => {
      expect(getWidthInPixels(5, 25))
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
  describe('#getResourceColor', () => {
    it('should return undefined if resources are not provided', () => {
      expect(getResourceColor(undefined))
        .toBeUndefined();
      expect(getResourceColor([]))
        .toBeUndefined();
    });
    it('should return undefined if it cannot find the main resource', () => {
      const resources = [{ id: 1, isMain: false }, { id: 2, isMain: false }];
      expect(getResourceColor(resources))
        .toBeUndefined();
    });
    it('should return color of the main resource', () => {
      const resources = [
        { id: 1, isMain: false, color: 'First color' },
        { id: 2, isMain: true, color: 'Main color' },
      ];
      expect(getResourceColor(resources))
        .toBe('Main color');
    });
  });
});
