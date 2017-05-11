import {
    setCurrentPage,
} from './reducers';

describe('PagingState reducers', () => {
  describe('#setCurrentPage', () => {
    test('should work', () => {
      const state = 0;
      const payload = { page: 1 };

      const nextState = setCurrentPage(state, payload);
      expect(nextState).toBe(1);
    });
  });
});
