import { TABLE_HEADING_TYPE } from './constants';
import { tableRowsWithHeading } from './computeds';

describe('TableHeaderRow Plugin computeds', () => {
  describe('#tableRowsWithHeading', () => {
    it('should work', () => {
      const rows = tableRowsWithHeading([{}]);

      expect(rows)
        .toEqual([{ key: TABLE_HEADING_TYPE.toString(), type: TABLE_HEADING_TYPE }, {}]);
    });
  });
});
