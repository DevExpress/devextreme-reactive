import {
  firstRowOnPage,
  lastRowOnPage,
  calculateStartPage,
} from './helpers';

describe('PagingPanel helpers', () => {
  describe('#firstRowOnPage', () => {
    it('should work', () => {
      let count = firstRowOnPage(1, 5, 10);
      expect(count).toEqual(6);

      count = firstRowOnPage(1, 0, 10);
      expect(count).toEqual(1);

      count = firstRowOnPage(1, 5, 0);
      expect(count).toEqual(0);
    });
  });

  describe('#lastRowOnPage', () => {
    it('should work', () => {
      let count = lastRowOnPage(1, 5, 15);
      expect(count).toEqual(10);

      count = lastRowOnPage(1, 0, 15);
      expect(count).toEqual(15);
    });

    it('should not be greater than total count', () => {
      const count = lastRowOnPage(1, 5, 9);
      expect(count).toEqual(9);
    });
  });

  describe('#calculateStartPage', () => {
    const maxButtonCount = 3;
    const totalPageCount = 10;
    it('should work', () => {
      let startPage = calculateStartPage(1, maxButtonCount, totalPageCount);
      expect(startPage).toEqual(1);

      startPage = calculateStartPage(2, maxButtonCount, totalPageCount);
      expect(startPage).toEqual(1);

      startPage = calculateStartPage(5, maxButtonCount, totalPageCount);
      expect(startPage).toEqual(4);

      startPage = calculateStartPage(9, maxButtonCount, totalPageCount);
      expect(startPage).toEqual(8);

      startPage = calculateStartPage(10, maxButtonCount, totalPageCount);
      expect(startPage).toEqual(8);
    });
  });
});
