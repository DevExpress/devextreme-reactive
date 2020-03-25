import { getCellKey, getRowFromGroups, getVerticalRowFromGroups } from './utils';

describe('GroupingPanel utils', () => {
  describe('#getCellKey', () => {
    it('should return key based on the grouping info and cell coordinates', () => {
      const groups = [[
        { text: '1', id: '1' },
        { text: '2', id: '2' },
      ], [
        { text: '3', id: '3' },
        { text: '4', id: '4' },
        { text: '5', id: '5' },
        { text: '6', id: '6' },
        { text: '3', id: '3' },
        { text: '4', id: '4' },
        { text: '5', id: '5' },
        { text: '6', id: '6' },
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
        { text: '1', id: '1' },
        { text: '2', id: '2' },
      ], [
        { text: '3', id: '3' },
        { text: '4', id: '4' },
        { text: '3', id: '3' },
        { text: '4', id: '4' },
      ]];
      const groupRow = groups[1];

      expect(getRowFromGroups(8, groupRow, { left: 80 }, groups, 1))
        .toEqual([{
          colSpan: 1,
          group: { text: '3', id: '3' },
          endOfGroup: false,
          key: '310',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '4', id: '4' },
          endOfGroup: false,
          key: '410',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '3', id: '3' },
          endOfGroup: false,
          key: '320',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '4', id: '4' },
          endOfGroup: true,
          key: '420',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '3', id: '3' },
          endOfGroup: false,
          key: '311',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '4', id: '4' },
          endOfGroup: false,
          key: '411',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '3', id: '3' },
          endOfGroup: false,
          key: '321',
          left: 80,
        }, {
          colSpan: 1,
          group: { text: '4', id: '4' },
          endOfGroup: true,
          key: '421',
          left: 80,
        }]);
    });
  });

  describe('#getVerticalRowFromGroups', () => {
    const groups = [[
      { text: '1', id: '1' },
      { text: '2', id: '2' },
    ], [
      { text: '3', id: '3' },
      { text: '4', id: '4' },
      { text: '3', id: '3' },
      { text: '4', id: '4' },
    ]];
    const rowSpan = 40;
    const cellHeight = 50;

    it('should work', () => {
      let groupIndex = 2;
      let result = getVerticalRowFromGroups(groups, groupIndex, rowSpan, cellHeight);

      expect(result)
        .toHaveLength(2);
      expect(result[0])
        .toEqual({
          group: { text: '2', id: '2' },
          rowSpan: 2,
          height: 1000,
          key: '2',
        });
      expect(result[1])
        .toEqual({
          group: { text: '3', id: '3' },
          rowSpan: 1,
          height: 500,
          key: '32',
        });

      groupIndex = 3;

      result = getVerticalRowFromGroups(groups, groupIndex, rowSpan, cellHeight);

      expect(result)
        .toHaveLength(1);
      expect(result[0])
        .toEqual({
          group: { text: '4', id: '4' },
          rowSpan: 1,
          height: 500,
          key: '42',
        });
    });

    it('should work when all-day row is present', () => {
      let groupIndex = 2;
      const allDayCellHeight = 40;
      const isAllDayPresent = true;

      let result = getVerticalRowFromGroups(
        groups, groupIndex, rowSpan, cellHeight, isAllDayPresent, allDayCellHeight,
      );

      expect(result)
        .toHaveLength(2);
      expect(result[0])
        .toEqual({
          group: { text: '2', id: '2' },
          rowSpan: 2,
          height: 1080,
          key: '2',
        });
      expect(result[1])
        .toEqual({
          group: { text: '3', id: '3' },
          rowSpan: 1,
          height: 540,
          key: '32',
        });

      groupIndex = 3;

      result = getVerticalRowFromGroups(
        groups, groupIndex, rowSpan, cellHeight, isAllDayPresent, allDayCellHeight,
      );

      expect(result)
        .toHaveLength(1);
      expect(result[0])
        .toEqual({
          group: { text: '4', id: '4' },
          rowSpan: 1,
          height: 540,
          key: '42',
        });
    });
  });

});
