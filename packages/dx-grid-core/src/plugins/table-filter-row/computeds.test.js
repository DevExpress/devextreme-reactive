import { TABLE_FILTER_TYPE } from './constants';
import {
  tableHeaderRowsWithFilter,
} from './computeds';

describe('TableFilterRow Plugin computeds', () => {
  describe('#tableHeaderRowsWithFilter', () => {
    it('should work', () => {
      expect(tableHeaderRowsWithFilter([{}], 100))
        .toEqual([{}, { type: TABLE_FILTER_TYPE, id: 0, height: 100 }]);
    });
  });
});
