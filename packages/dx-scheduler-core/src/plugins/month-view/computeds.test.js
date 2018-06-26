import { monthCells } from './computeds';

describe('Month view computeds', () => {
  describe('#monthCells', () => {
    it('should work', () => {
      const cells = monthCells(new Date(2018, 5, 25), 1);

      cells.forEach(row => expect(row).toHaveLength(7));
      expect(cells)
        .toHaveLength(6);

      expect(cells[0][0].value.toString())
        .toBe(new Date(2018, 4, 28).toString());
      expect(cells[5][6].value.toString())
        .toBe(new Date(2018, 6, 8).toString());
    });

    it('should mark cells from other months', () => {
      const cells = monthCells(new Date(2018, 5, 25), 1);
      const firstCell = cells[0][0];
      const lastCell = cells[5][6];
      const cell = cells[2][5];

      expect(firstCell.isOtherMonth)
        .toBeTruthy();
      expect(lastCell.isOtherMonth)
        .toBeTruthy();
      expect(cell.isOtherMonth)
        .toBeFalsy();
    });

    it('should mark current day', () => {
      const cells = monthCells(new Date(2018, 5, 25), 1);
      const currentCell = cells[4][0];
      const cell = cells[2][5];

      expect(currentCell.isCurrent)
        .toBeTruthy();
      expect(cell.isCurrent)
        .toBeFalsy();
    });

    it('should add a full week from previous month', () => {
      const cells = monthCells(new Date(2010, 1, 1), 1);

      expect(cells[0][0].value.toString())
        .toBe(new Date(2010, 0, 25).toString());
      expect(cells[5][6].value.toString())
        .toBe(new Date(2010, 2, 7).toString());
    });

    it('should work with a custom first day of week', () => {
      const cells = monthCells(new Date(2010, 1, 1), 3);

      expect(cells[0][0].value.toString())
        .toBe(new Date(2010, 0, 27).toString());
      expect(cells[5][6].value.toString())
        .toBe(new Date(2010, 2, 9).toString());
    });
  });
});
