import { virtualRowsWithCache } from './computeds';
import { mergeRows } from './helpers';
import { createVirtualRows, createInterval } from './test-utils';

jest.mock('./helpers', () => ({
  mergeRows: jest.fn(),
}));

describe('VirtualTableState computeds', () => {
  describe('#virtualRowsWithCache', () => {
    it('should call mergeRows with correct parameters', () => {
      const rowsInterval = createInterval(20, 30);
      const cacheInterval = createInterval(15, 25);
      const { skip, rows } = createVirtualRows(rowsInterval);
      const cache = createVirtualRows(cacheInterval);

      virtualRowsWithCache(skip, rows, cache);

      expect(mergeRows).toHaveBeenCalledWith(
        { skip: 20, end: 30 },
        { skip: 15, end: 25 },
        rows,
        cache.rows,
        20,
        15,
      );
    });
  });
});
