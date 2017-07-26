import { HEADING_TYPE } from './constants';
import {
  tableRowsWithHeading,
} from './computeds';

describe('TableHeaderRow Plugin computeds', () => {
  describe('#tableRowsWithHeading', () => {
    it('should work', () => {
      const rows = tableRowsWithHeading([{}]);

      expect(rows)
        .toEqual([{ type: HEADING_TYPE, id: 0 }, {}]);
    });
  });
});
