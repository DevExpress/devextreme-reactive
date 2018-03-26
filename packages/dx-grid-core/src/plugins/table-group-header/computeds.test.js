import { TABLE_BAND_TYPE } from './constants';
import { tableRowsWithBands } from './computeds';

describe('TableGroupHeader Plugin computeds', () => {
  describe('#tableRowsWithBands', () => {
    const tableHeaderRows = [{}];
    it('should add zero band row if one nested level', () => {
      const columnGroups = [{ title: 'title-a' }];
      const tableColumns = [{ type: 'data', column: { columnName: 'b' } }];
      const rows = tableRowsWithBands(tableHeaderRows, columnGroups, tableColumns);

      expect(rows)
        .toEqual([{}]);
    });

    it('should add one band row if two nested level', () => {
      const columnGroups = [{ title: 'title-a', children: [{ columnName: 'a' }, { columnName: 'b' }] }];
      const tableColumns = [{ type: 'data', column: { name: 'a' } }, { type: 'data', column: { name: 'b' } }];
      const rows = tableRowsWithBands(tableHeaderRows, columnGroups, tableColumns);

      expect(rows)
        .toEqual([{ key: `${TABLE_BAND_TYPE}_0`, type: TABLE_BAND_TYPE, level: 0 }, {}]);
    });

    it('should add one band row if one nested level is hidden', () => {
      const columnGroups = [
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
        { type: 'data', column: { name: 'a' } },
        { type: 'data', column: { name: 'b' } },
        { type: 'data', column: { name: 'c' } },
      ];
      const rows = tableRowsWithBands(tableHeaderRows, columnGroups, tableColumns);

      expect(rows)
        .toEqual([{ key: `${TABLE_BAND_TYPE}_0`, type: TABLE_BAND_TYPE, level: 0 }, {}]);
    });
  });
});
