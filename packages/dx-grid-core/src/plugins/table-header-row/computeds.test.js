import {
    tableRowsWithHeading,
} from './computeds';

describe('TableHeaderRow Plugin computeds', () => {
  describe('#tableRowsWithHeading', () => {
    const existingRows = [
      { type: 'filter' },
    ];

    test('should work', () => {
      const rows = tableRowsWithHeading(existingRows);

      expect(rows).toHaveLength(2);
      expect(rows[0]).toMatchObject({ type: 'heading' });
      expect(rows[1]).toBe(existingRows[0]);
    });
  });
});
