import { setCurrentDate } from './reducers';

describe('DateNavigator reducers', () => {
  describe('#setCurrentDate', () => {
    it('should work', () => {
      const state = '2018-07-13';

      const nextState = setCurrentDate(state, '2018-07-14');
      expect(nextState).toBe('2018-07-14');
    });
  });
});
