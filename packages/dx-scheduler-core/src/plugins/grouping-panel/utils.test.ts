import { getCellKey, getRowFromGroups } from './utils';

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
  describe('#getRowFromGroups', () => {
    it('should create a row of Gropuing Panel cells', () => {
      const groups = [[
        { text: '1' },
        { text: '2' },
      ], [
        { text: '3' },
        { text: '4' },
        { text: '3' },
        { text: '4' },
      ]];
      const groupRow = groups[1];

      expect(getRowFromGroups(8, groupRow, { left: 80 }, groups, 1))
        .toEqual([{
          colSpan: 1,
          group: { text: '3' },
          brightRightBorder: false,
          key: '310',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '4' },
          brightRightBorder: false,
          key: '410',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '3' },
          brightRightBorder: false,
          key: '320',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '4' },
          brightRightBorder: true,
          key: '420',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '3' },
          brightRightBorder: false,
          key: '311',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '4' },
          brightRightBorder: false,
          key: '411',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '3' },
          brightRightBorder: false,
          key: '321',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '4' },
          brightRightBorder: true,
          key: '421',
          left: 80,
        }]);
    });
  });

});
