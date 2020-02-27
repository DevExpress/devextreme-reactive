import { navigateByOneMonth } from './helpers';

describe('DateNavigator helpers', () => {
  describe('#navigateByOneMonth', () => {
    const currentDate = new Date(2019, 5, 18);
    it('should navigate one month back', () => {
      const backward = true;
      expect(navigateByOneMonth(currentDate, backward))
        .toEqual(new Date(2019, 4, 18));
    });

    it('should navigate one month forward', () => {
      const backward = false;
      expect(navigateByOneMonth(currentDate, backward))
        .toEqual(new Date(2019, 6, 18));
    });
  });
});
