import {
  firstRowOnPage,
  lastRowOnPage,
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
});
