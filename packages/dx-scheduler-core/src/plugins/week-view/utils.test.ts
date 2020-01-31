import { getLabelsForAllGroups } from './utils';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '../../constants';

describe('WeekView utils', () => {
  describe('#getLabelsForAllGroups', () => {
    const groups = [[{}, {}]];

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
        [{ startDate: 'startDate2', endDate: 'endDate2', groupingInfo: 'groupingInfo2' }],
        [{ startDate: 'startDate3', endDate: 'endDate3', groupingInfo: 'groupingInfo3' }],
        [{ startDate: 'startDate4', endDate: 'endDate4', groupingInfo: 'groupingInfo4' }],
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
          key: 'endDate1',
        });
      expect(result[1][0])
        .toMatchObject({
          ...cellsData[2][0],
          key: 'endDate3',
        });
    });
  });
});
