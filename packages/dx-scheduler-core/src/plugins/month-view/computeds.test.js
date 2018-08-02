import {
  monthCellsCore,
  endViewBoundary,
} from './computeds';

describe('Month view computeds', () => {
  describe('#monthCellsCore', () => {
    it('should work', () => {
      const cells = monthCellsCore(new Date(2018, 5, 25), 1);

      cells.forEach(row => expect(row).toHaveLength(7));
      expect(cells)
        .toHaveLength(6);

      expect(cells[0][0].value.toString())
        .toBe(new Date(2018, 4, 28).toString());
      expect(cells[5][6].value.toString())
        .toBe(new Date(2018, 6, 8).toString());
    });

    it('should mark cells from other months', () => {
      const cells = monthCellsCore(new Date(2018, 5, 25), 1);
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
      const cells = monthCellsCore(new Date(2018, 5, 25), 1);
      const currentCell = cells[4][0];
      const cell = cells[2][5];

      expect(currentCell.isCurrent)
        .toBeTruthy();
      expect(cell.isCurrent)
        .toBeFalsy();
    });

    it('should add a full week from previous month', () => {
      const cells = monthCellsCore(new Date(2010, 1, 1), 1);

      expect(cells[0][0].value.toString())
        .toBe(new Date(2010, 0, 25).toString());
      expect(cells[5][6].value.toString())
        .toBe(new Date(2010, 2, 7).toString());
    });

    it('should work with a custom first day of week', () => {
      const cells = monthCellsCore(new Date(2010, 1, 1), 3);

      expect(cells[0][0].value.toString())
        .toBe(new Date(2010, 0, 27).toString());
      expect(cells[5][6].value.toString())
        .toBe(new Date(2010, 2, 9).toString());
    });

    it('should work with interval count', () => {
      const cells = monthCellsCore(new Date(2010, 0, 1), 0, 2);

      expect(cells[0][0].value.toString())
        .toBe(new Date(2009, 11, 27).toString());
      expect(cells[9][6].value.toString())
        .toBe(new Date(2010, 2, 6).toString());
    });

    it('should mark other month with interval count', () => {
      const cells = monthCellsCore(new Date(2010, 0, 1), 0, 2);

      expect(cells[0][4].isOtherMonth)
        .toBeTruthy();
      expect(cells[0][5].isOtherMonth)
        .toBeFalsy();
      expect(cells[9][0].isOtherMonth)
        .toBeFalsy();
      expect(cells[9][1].isOtherMonth)
        .toBeTruthy();
    });
  });
  describe('#endViewBoundary', () => {
    it('should work', () => {
      const cells = [
        [
          {}, {}, {}, {}, {}, {}, {
            value: new Date('2018-07-31 10:30'),
          },
        ],
      ];

      expect(endViewBoundary(cells).toString())
        .toBe(new Date('2018-07-31 23:59:59').toString());
      expect(cells[0][6].value)
        .toEqual(new Date('2018-07-31 10:30'));
    });
  });
});
