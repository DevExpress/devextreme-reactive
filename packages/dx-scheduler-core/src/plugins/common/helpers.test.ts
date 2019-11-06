import { getViewType, isMidnight, viewBoundText } from './helpers';
import { VERTICAL_TYPE, HORIZONTAL_TYPE } from '../../constants';
import { formatDateTimeGetter } from '../scheduler-core/computeds';

describe('#getViewType', () => {
  it('should work with horizontal type', () => {
    expect(getViewType('month'))
      .toEqual(HORIZONTAL_TYPE);
  });

  it('should work with vertical type', () => {
    expect(getViewType('day'))
      .toEqual(VERTICAL_TYPE);
  });
});

describe('#isMidnight', () => {
  it('should return true if time is midnight', () => {
    expect(isMidnight(new Date(2019, 5, 5, 0, 0)))
      .toBeTruthy();
  });

  it('should return false otherwise', () => {
    expect(isMidnight(new Date(2019, 5, 5, 0, 1)))
      .toBeFalsy();
  });
});

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

  describe('Tooltip text', () => {
    it('should add weekday for tooltip texts', () => {
      const text = viewBoundText(
        '2018-07-06 10:00', '2018-07-06 15:00', 'weekdayInterval',
        undefined, undefined, dateTimeFormatter,
      );
      expect(text)
        .toBe('Friday, July 6, 2018');
    });
    it('shouldn\'t add weekday for tooltip texts if it includes more than 1 day', () => {
      const text = viewBoundText(
        '2018-07-06 10:00', '2018-07-10 15:00', 'weekdayInterval',
        undefined, undefined, dateTimeFormatter,
      );
      expect(text)
        .toBe('6-10 July 2018');
    });
  });
});
