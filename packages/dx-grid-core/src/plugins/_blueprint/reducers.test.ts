import { pureReducer } from './reducers';

describe('Plugin reducers', () => {
  describe('#pureReducer', () => {
    it('should work', () => {
      const state = [];
      const payload = { columnName: 'test' };

      const nextState = pureReducer(state, payload);
      expect(nextState).toBeUndefined();
    });
  });
});
