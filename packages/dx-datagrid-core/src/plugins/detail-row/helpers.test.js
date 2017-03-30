import {
    isDetailRowExpanded,
} from './helpers';

describe('DetailRow helpers', () => {
  describe('#isDetailRowExpanded', () => {
    test('should work', () => {
      const expandedRows = [1];

      expect(isDetailRowExpanded(expandedRows, 1)).toBeTruthy();
      expect(isDetailRowExpanded(expandedRows, 2)).toBeFalsy();
    });
  });
});
