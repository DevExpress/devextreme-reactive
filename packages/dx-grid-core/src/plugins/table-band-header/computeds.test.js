import { TABLE_BAND_TYPE } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import { tableRowsWithBands } from './computeds';

describe('TableBandHeader Plugin computeds', () => {
  describe('#tableRowsWithBands', () => {
    const tableHeaderRows = [{}];
    it('should add zero band row if one nested level', () => {
      const columnBands = [{ title: 'title-a' }];
      const tableColumns = [{ type: TABLE_DATA_TYPE, column: { columnName: 'b' } }];
      const rows = tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

      expect(rows)
        .toEqual([{}]);
    });

    it('should add one band row if two nested levels', () => {
      const columnBands = [{ title: 'title-a', children: [{ columnName: 'a' }, { columnName: 'b' }] }];
      const tableColumns = [{ type: TABLE_DATA_TYPE, column: { name: 'a' } }, { type: TABLE_DATA_TYPE, column: { name: 'b' } }];
      const rows = tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

      expect(rows)
        .toEqual([{ key: `${TABLE_BAND_TYPE}_0`, type: TABLE_BAND_TYPE, level: 0 }, {}]);
    });

    it('should add one band row if one nested level is hidden', () => {
      const columnBands = [
        {
          title: 'title-a',
          children: [
            { columnName: 'a' },
            { columnName: 'b' },
            {
              title: 'title-b',
              children: [{ columnName: 'd' }, { columnName: 'e' }],
            },
          ],
        },
        { columnName: 'c' },
      ];
      const tableColumns = [
        { type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { type: TABLE_DATA_TYPE, column: { name: 'b' } },
        { type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];
      const rows = tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

      expect(rows)
        .toEqual([{ key: `${TABLE_BAND_TYPE}_0`, type: TABLE_BAND_TYPE, level: 0 }, {}]);
    });
  });
});
