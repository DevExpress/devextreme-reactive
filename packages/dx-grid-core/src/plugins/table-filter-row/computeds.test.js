import { TABLE_FILTER_TYPE } from './constants';
import { tableHeaderRowsWithFilter } from './computeds';

describe('TableFilterRow Plugin computeds', () => {
  describe('#tableHeaderRowsWithFilter', () => {
    it('should work', () => {
      expect(tableHeaderRowsWithFilter([{}], 100))
        .toEqual([
          {},
          { key: TABLE_FILTER_TYPE.toString(), type: TABLE_FILTER_TYPE, height: 100 },
        ]);
    });
  });
});
