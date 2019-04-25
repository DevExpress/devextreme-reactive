import { viewBoundText } from './helpers';
import { formatDateTimeGetter } from '../scheduler-core/computeds';

describe('DateNavigator helpers', () => {
  describe('viewBoundText', () => {
    const dateTimeFormatter = formatDateTimeGetter('en-US');
    describe('Week text', () => {
      it('should calculate text for single day view', () => {
        const text = viewBoundText(
          '2018-07-06 10:00', '2018-07-06 15:00', undefined,
          undefined, undefined, dateTimeFormatter,
        );
        expect(text)
          .toBe('July 6, 2018');
      });
      it('should calculate text for multi days singe month view', () => {
        const text = viewBoundText(
          '2018-07-06', '2018-07-10', undefined, undefined, undefined, dateTimeFormatter,
        );
        expect(text)
          .toBe('6-10 July 2018');
      });
      it('should calculate text for multi days view and different months', () => {
        const text = viewBoundText(
          '2018-07-28', '2018-08-02', undefined, undefined, undefined, dateTimeFormatter,
        );
        expect(text)
          .toBe('Jul 28 - Aug 2, 2018');
      });
      it('should calculate text for multi days view and different years', () => {
        const text = viewBoundText(
          '2018-12-30', '2019-01-02', undefined, undefined, undefined, dateTimeFormatter,
        );
        expect(text)
          .toBe('Dec 30, 18 - Jan 2, 19');
      });
    });

    describe('Month text', () => {
      it('should calculate text for single month view', () => {
        const text = viewBoundText(
          undefined, undefined, 'month', '2018-07-16', 1, dateTimeFormatter,
        );
        expect(text)
          .toBe('July 2018');
      });
      it('should calculate text for multi months view', () => {
        const text = viewBoundText(
          undefined, undefined, 'month', '2018-07-16', 2, dateTimeFormatter,
          );
        expect(text)
          .toBe('Jul-Aug 2018');
      });
      it('should calculate text for multi months view and different years', () => {
        const text = viewBoundText(
          undefined, undefined, 'month', '2018-12-29', 2, dateTimeFormatter,
        );
        expect(text)
          .toBe('Dec 18 - Jan 19');
      });
    });
  });
});
