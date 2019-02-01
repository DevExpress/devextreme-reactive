import { setCurrentPage } from './reducers';

describe('PagingState reducers', () => {
  describe('#setCurrentPage', () => {
    it('should work', () => {
      const state = 0;

      const nextState = setCurrentPage(state, 1);
      expect(nextState).toBe(1);
    });
  });
});
