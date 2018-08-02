import { viewBoundTitle } from './helpers';

describe('DateNavigator helpers', () => {
  describe('viewBoundTitle', () => {
    it('should calculate title for single day view', () => {
      const title = viewBoundTitle('2018-07-06 10:00', '2018-07-06 15:00');
      expect(title)
        .toBe('6 July 2018');
    });
    it('should calculate title for multi days singe month view', () => {
      const title = viewBoundTitle('2018-07-06', '2018-07-10');
      expect(title)
        .toBe('6-10 July 2018');
    });
    it('should calculate title for multi days view and different months', () => {
      const title = viewBoundTitle('2018-07-28', '2018-08-02');
      expect(title)
        .toBe('28 Jul - 2 Aug 2018');
    });
    it('should calculate title for multi days view and different years', () => {
      const title = viewBoundTitle('2018-12-30', '2019-01-02');
      expect(title)
        .toBe('30 Dec 18 - 2 Jan 19');
    });
    it('should calculate title for single month view', () => {
      const title = viewBoundTitle('2018-07-16', '2018-07-16', 'month');
      expect(title)
        .toBe('July 2018');
    });
    it('should calculate title for multi months view', () => {
      const title = viewBoundTitle('2018-07-16', '2018-08-16', 'month');
      expect(title)
        .toBe('Jul-Aug 2018');
    });
    it('should calculate title for multi months view and different years', () => {
      const title = viewBoundTitle('2018-12-29', '2019-01-02', 'month');
      expect(title)
        .toBe('Dec 18 - Jan 19');
    });
  });
});
