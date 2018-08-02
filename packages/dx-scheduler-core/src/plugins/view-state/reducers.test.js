import { changeCurrentDate } from './reducers';

describe('DateNavigator reducers', () => {
  describe('#changeCurrentDate', () => {
    it('should return next date', () => {
      const state = '2018-07-13';

      const nextState = changeCurrentDate(state, { nextDate: '2018-07-14' });
      expect(nextState)
        .toBe('2018-07-14');
    });
    it('should calculate next date', () => {
      const state = '2018-07-13';

      const nextState = changeCurrentDate(state, { step: 1 });
      expect(nextState.toString())
        .toBe(new Date(2018, 6, 14).toString());
    });
    it('should calculate prev date', () => {
      const state = '2018-07-13';

      const nextState = changeCurrentDate(state, { step: 1, back: true });
      expect(nextState.toString())
        .toBe(new Date(2018, 6, 12).toString());
    });
  });
});
