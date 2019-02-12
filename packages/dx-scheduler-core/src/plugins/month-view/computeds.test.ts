import { monthCellsData } from './computeds';

describe('Month view computeds', () => {
  describe('#monthCellsData', () => {
    it('should work', () => {
      const cells = monthCellsData(new Date(2018, 5, 25), 1);

      cells.forEach(row => expect(row).toHaveLength(7));
      expect(cells)
        .toHaveLength(6);

      expect(cells[0][0].startDate.toString())
        .toBe(new Date(2018, 4, 28).toString());
      expect(cells[0][0].endDate.toString())
        .toBe(new Date(2018, 4, 29).toString());
      expect(cells[5][6].startDate.toString())
        .toBe(new Date(2018, 6, 8).toString());
      expect(cells[5][6].endDate.toString())
        .toBe(new Date(2018, 6, 9).toString());
    });

    it('should mark cells from other months', () => {
      const cells = monthCellsData(new Date(2018, 5, 25), 1);
      const firstCell = cells[0][0];
      const lastCell = cells[5][6];
      const cell = cells[2][5];

      expect(firstCell.otherMonth)
        .toBeTruthy();
      expect(lastCell.otherMonth)
        .toBeTruthy();
      expect(cell.otherMonth)
        .toBeFalsy();
    });

    it('should mark today day', () => {
      const cells = monthCellsData(new Date(2018, 5, 25), 1, 1, new Date(2018, 5, 25));
      const currentCell = cells[4][0];
      const cell = cells[2][5];
      expect(currentCell.today)
        .toBeTruthy();
      expect(cell.today)
        .toBeFalsy();
    });

    it('should add a full week from previous month', () => {
      const cells = monthCellsData(new Date(2010, 1, 1), 1);

      expect(cells[0][0].startDate.toString())
        .toBe(new Date(2010, 0, 25).toString());
      expect(cells[0][0].endDate.toString())
        .toBe(new Date(2010, 0, 26).toString());
      expect(cells[5][6].startDate.toString())
        .toBe(new Date(2010, 2, 7).toString());
      expect(cells[5][6].endDate.toString())
        .toBe(new Date(2010, 2, 8).toString());
    });

    it('should work with a custom first day of week', () => {
      const cells = monthCellsData(new Date(2010, 1, 1), 3);

      expect(cells[0][0].startDate.toString())
        .toBe(new Date(2010, 0, 27).toString());
      expect(cells[0][0].endDate.toString())
        .toBe(new Date(2010, 0, 28).toString());
      expect(cells[5][6].startDate.toString())
        .toBe(new Date(2010, 2, 9).toString());
      expect(cells[5][6].endDate.toString())
        .toBe(new Date(2010, 2, 10).toString());
    });

    it('should work with interval count', () => {
      const cells = monthCellsData(new Date(2010, 0, 1), 0, 2);

      expect(cells[0][0].startDate.toString())
        .toBe(new Date(2009, 11, 27).toString());
      expect(cells[0][0].endDate.toString())
        .toBe(new Date(2009, 11, 28).toString());
      expect(cells[9][6].startDate.toString())
        .toBe(new Date(2010, 2, 6).toString());
      expect(cells[9][6].endDate.toString())
        .toBe(new Date(2010, 2, 7).toString());
    });

    it('should mark other month with interval count', () => {
      const cells = monthCellsData(new Date(2010, 0, 1), 0, 2);

      expect(cells[0][4].otherMonth)
        .toBeTruthy();
      expect(cells[0][5].otherMonth)
        .toBeFalsy();
      expect(cells[9][0].otherMonth)
        .toBeFalsy();
      expect(cells[9][1].otherMonth)
        .toBeTruthy();
    });
  });
});
