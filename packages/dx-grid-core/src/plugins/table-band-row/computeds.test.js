import { TABLE_BAND_TYPE } from './constants';
import { tableRowsWithBands } from './computeds';

describe('TableBandRow Plugin computeds', () => {
  describe('#tableRowsWithBands', () => {
    const tableHeaderRows = [{}];
    it('should add zero band row if one nested level', () => {
      const bandColumns = [{ title: 'a' }];
      const rows = tableRowsWithBands(tableHeaderRows, bandColumns);

      expect(rows)
        .toEqual([{}]);
    });

    it('should add one band row if two nested level', () => {
      const bandColumns = [{ title: 'a', nested: [{ columnName: 'a' }, { columnName: 'b' }] }];
      const rows = tableRowsWithBands(tableHeaderRows, bandColumns);

      expect(rows)
        .toEqual([{ key: `${TABLE_BAND_TYPE}_0`, type: TABLE_BAND_TYPE, level: 0 }, {}]);
    });
  });
});
