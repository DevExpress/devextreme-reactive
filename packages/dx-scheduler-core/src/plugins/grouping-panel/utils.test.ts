import { getCellKey } from "./utils";

describe('GroupingPanel utils', () => {
  describe('#getCellKey', () => {
    it('should return key bases on the grouping info and cell coordinates', () => {
      const groups = [[
        { text: '1' },
        { text: '2' },
      ],[
        { text: '3' },
        { text: '4' },
        { text: '3' },
        { text: '4' },
      ]];

      expect(getCellKey(groups, 3, 1))
        .toBe('42');
      expect(getCellKey(groups, 0, 0))
        .toBe('1');
    });
  });

});
