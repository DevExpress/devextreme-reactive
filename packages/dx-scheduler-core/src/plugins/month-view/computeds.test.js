import { monthCells } from './computeds';

describe('Month view computeds', () => {
  describe('#monthCells', () => {
    it('should work', () => {
      const result = monthCells(new Date(2018, 5, 25), 1);

      result.forEach(row => expect(row).toHaveLength(7));
      expect(result)
        .toHaveLength(6);

      expect(result[0][0].value.toString())
        .toBe(new Date(2018, 4, 28).toString());
      expect(result[5][6].value.toString())
        .toBe(new Date(2018, 6, 8).toString());
    });

    it('should mark cells from other months', () => {
      const result = monthCells(new Date(2018, 5, 25), 1);
      const firstCell = result[0][0];
      const lastCell = result[5][6];
      const cell = result[2][5];

      expect(firstCell.isOtherMonth)
        .toBeTruthy();
      expect(lastCell.isOtherMonth)
        .toBeTruthy();
      expect(cell.isOtherMonth)
        .toBeFalsy();
    });

    it('should add a full week from previous month', () => {
      const result = monthCells(new Date(2010, 1, 1), 1);

      expect(result[0][0].value.toString())
        .toBe(new Date(2010, 0, 25).toString());
      expect(result[5][6].value.toString())
        .toBe(new Date(2010, 2, 7).toString());
    });

    it('should work with a custom first day of week', () => {
      const result = monthCells(new Date(2010, 1, 1), 3);

      expect(result[0][0].value.toString())
        .toBe(new Date(2010, 0, 27).toString());
      expect(result[5][6].value.toString())
        .toBe(new Date(2010, 2, 9).toString());
    });
  });
});
