import {
    expandedDetailRows,
} from './computeds';

describe('DetailRow computeds', () => {
  describe('#expandedDetailRows', () => {
    test('can expand one row', () => {
      const rows = [{ id: 1 }, { id: 2 }];
      const expandedDetails = [2];

      const expandedRows = expandedDetailRows(rows, expandedDetails);
      expect(expandedRows).toEqual([
        { id: 1 },
        { id: 2 },
        {
          type: 'detailRow',
          id: 'detailRow_2',
          for: { id: 2 },
          colspan: 0,
          height: 'auto',
        },
      ]);
    });

    test('can expand several rows', () => {
      const rows = [{ id: 1 }, { id: 2 }];
      const expandedDetails = [1, 2];

      const expandedRows = expandedDetailRows(rows, expandedDetails);
      expect(expandedRows).toEqual([
        { id: 1 },
        {
          type: 'detailRow',
          id: 'detailRow_1',
          for: { id: 1 },
          colspan: 0,
          height: 'auto',
        },
        { id: 2 },
        {
          type: 'detailRow',
          id: 'detailRow_2',
          for: { id: 2 },
          colspan: 0,
          height: 'auto',
        },
      ]);
    });
  });
});
