import { getLabelsForAllGroups, prepareVerticalViewCellsData } from './utils';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../constants';

describe('WeekView utils', () => {
  describe('#getLabelsForAllGroups', () => {
    const groups = [[{ id: 1 }, { id: 2 }]];

    it('should add key to cellsData if group orientation is horizontal', () => {
      const cellsData = [[
        { startDate: 'startDate1', endDate: 'endDate1', groupingInfo: 'groupingInfo1' },
      ], [
        { startDate: 'startDate2', endDate: 'endDate2', groupingInfo: 'groupingInfo2' },
      ]];
      const result = getLabelsForAllGroups(cellsData, groups, HORIZONTAL_GROUP_ORIENTATION);

      expect(result)
        .toHaveLength(1);
      expect(result[0])
        .toHaveLength(2);

      expect(result[0][0])
        .toMatchObject({
          ...cellsData[0][1],
          key: 'endDate1',
        });
      expect(result[0][1])
        .toMatchObject({
          ...cellsData[0][1],
          key: 'endDate2',
        });
    });

    it('should create labels for vertically grouped data', () => {
      const cellsData = [
        [{ startDate: 'startDate1', endDate: 'endDate1', groupingInfo: 'groupingInfo1' }],
        [{ startDate: 'startDate2', endDate: 'endDate2', groupingInfo: 'groupingInfo1' }],
        [{ startDate: 'startDate3', endDate: 'endDate3', groupingInfo: 'groupingInfo2' }],
        [{ startDate: 'startDate4', endDate: 'endDate4', groupingInfo: 'groupingInfo2' }],
      ];
      const result = getLabelsForAllGroups(cellsData, groups, VERTICAL_GROUP_ORIENTATION);

      expect(result)
        .toHaveLength(2);
      expect(result[0])
        .toHaveLength(1);
      expect(result[1])
        .toHaveLength(1);

      expect(result[0][0])
        .toMatchObject({
          ...cellsData[0][1],
          key: 'endDate11',
        });
      expect(result[1][0])
        .toMatchObject({
          ...cellsData[2][0],
          key: 'endDate32',
        });
    });
  });

  describe('#prepareVerticalViewCellsData', () => {
    const viewCellsData = [
      [{ startDate: 'first start date' }, { startDate: 'second start date' }],
      [{ startDate: 'third start date' }, { startDate: 'fourth start date' }],
      [{ startDate: 'fifth start date' }, { startDate: 'sixth start date' }],
      [{ startDate: 'seventh start date' }, { startDate: 'eighth start date' }],
    ];
    it('should distribute cells between groups depending on allDayCellsData', () => {
      const allDayCellsData = [
        [{ startDate: 'first all-day date' }, { startDate: 'second all-day date' }],
        [{ startDate: 'fifth all-day date' }, { startDate: 'sixth all-day date' }],
      ];
      const viewCells = prepareVerticalViewCellsData(viewCellsData, allDayCellsData);

      expect(viewCells)
        .toEqual([[
          [{ startDate: 'first start date' }, { startDate: 'second start date' }],
          [{ startDate: 'third start date' }, { startDate: 'fourth start date' }],
        ], [
          [{ startDate: 'fifth start date' }, { startDate: 'sixth start date' }],
          [{ startDate: 'seventh start date' }, { startDate: 'eighth start date' }],
        ]]);
    });

    it('should create one group', () => {
      const allDayCellsData = undefined;
      const viewCells = prepareVerticalViewCellsData(viewCellsData, allDayCellsData);

      expect(viewCells)
        .toEqual([[
          [{ startDate: 'first start date' }, { startDate: 'second start date' }],
          [{ startDate: 'third start date' }, { startDate: 'fourth start date' }],
          [{ startDate: 'fifth start date' }, { startDate: 'sixth start date' }],
          [{ startDate: 'seventh start date' }, { startDate: 'eighth start date' }],
        ]]);
    });
  });
});
