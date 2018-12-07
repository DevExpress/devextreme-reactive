import { changeCurrentDate, setCurrentViewName } from './reducers';

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

      const nextState = changeCurrentDate(state, { amount: 2, step: 'month' });
      expect(nextState.toString())
        .toBe(new Date(2018, 8, 13).toString());
    });
    it('should calculate prev date', () => {
      const state = '2018-07-13';

      const nextState = changeCurrentDate(state, { direction: 'back', amount: 1, step: 'week' });
      expect(nextState.toString())
        .toBe(new Date(2018, 6, 6).toString());
    });
  });
  describe('#setCurrentViewName', () => {
    it('should return next view name', () => {
      const nextViewName = setCurrentViewName('', 'week');
      expect(nextViewName).toBe('week');
    });
  });
});
