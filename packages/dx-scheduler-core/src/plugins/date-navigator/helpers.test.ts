import { viewBoundText } from './helpers';

describe('DateNavigator helpers', () => {
  describe('viewBoundText', () => {
    describe('Week text', () => {
      it('should calculate text for single day view', () => {
        const text = viewBoundText('2018-07-06 10:00', '2018-07-06 15:00');
        expect(text)
          .toBe('6 July 2018');
      });
      it('should calculate text for multi days singe month view', () => {
        const text = viewBoundText('2018-07-06', '2018-07-10');
        expect(text)
          .toBe('6-10 July 2018');
      });
      it('should calculate text for multi days view and different months', () => {
        const text = viewBoundText('2018-07-28', '2018-08-02');
        expect(text)
          .toBe('28 Jul - 2 Aug 2018');
      });
      it('should calculate text for multi days view and different years', () => {
        const text = viewBoundText('2018-12-30', '2019-01-02');
        expect(text)
          .toBe('30 Dec 18 - 2 Jan 19');
      });
    });

    describe('Month text', () => {
      it('should calculate text for single month view', () => {
        const text = viewBoundText(undefined, undefined, 'month', '2018-07-16', 1);
        expect(text)
          .toBe('July 2018');
      });
      it('should calculate text for multi months view', () => {
        const text = viewBoundText(undefined, undefined, 'month', '2018-07-16', 2);
        expect(text)
          .toBe('Jul-Aug 2018');
      });
      it('should calculate text for multi months view and different years', () => {
        const text = viewBoundText(undefined, undefined, 'month', '2018-12-29', 2);
        expect(text)
          .toBe('Dec 18 - Jan 19');
      });
    });
  });
});
