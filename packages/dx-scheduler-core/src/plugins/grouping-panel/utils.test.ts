import { getCellKey } from './utils';

describe('GroupingPanel utils', () => {
  describe('#getCellKey', () => {
    it('should return key based on the grouping info and cell coordinates', () => {
      const groups = [[
        { text: '1' },
        { text: '2' },
      ], [
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '6' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '6' },
      ]];

      expect(getCellKey(groups, 7, 1))
        .toBe('62');
      expect(getCellKey(groups, 0, 0))
        .toBe('1');
    });
  });

});
