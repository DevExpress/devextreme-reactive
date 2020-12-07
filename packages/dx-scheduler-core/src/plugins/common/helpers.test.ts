import {
  getViewType, isMidnight, viewBoundText, checkCellGroupingInfo,
  isDateValid, areDatesSame, getTimeTableHeight, containsDSTChange,
} from './helpers';
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
  describe('#isDateValid', () => {
    it('should return true for a valid date', () => {
      expect(isDateValid(new Date()))
        .toBeTruthy();
    });
    it('should return false for an invalid date', () => {
      expect(isDateValid(new Date('an invalid date')))
        .toBeFalsy();
    });
  });
  describe('#areDatesSame', () => {
    it('should compare two dates', () => {
      expect(areDatesSame(new Date(2020, 10, 3), '2020-11-03'))
        .toBeTruthy();
      expect(areDatesSame(new Date(2020, 10, 3), '2020-11-04'))
        .toBeFalsy();
    });
    it('should compare dates not taking into account time', () => {
      expect(areDatesSame(new Date(2020, 10, 3, 5), '2020-11-03 15:00'))
        .toBeTruthy();
    });
  });
});

describe('#checkCellGroupingInfo', () => {
  it('should return true if appointment\'s and cell\'s groups are equal', () => {
    const cell = {
      groupingInfo: [{
        id: 1, fieldName: 'test',
      }],
    };
    const appointment = { test: 1 };
    expect(checkCellGroupingInfo(cell, appointment))
      .toBeTruthy();
  });

  it('should return false if appointment\'s and cell\'s groups are not equal', () => {
    const cell = {
      groupingInfo: [{
        id: 1, fieldName: 'test',
      }],
    };
    const appointment = { test: 2 };
    expect(checkCellGroupingInfo(cell, appointment))
      .toBeFalsy();
  });

  it('should work without groups', () => {
    const cell = {};
    const appointment = {};
    expect(checkCellGroupingInfo(cell, appointment))
      .toBeTruthy();
  });
});

describe('#getTimeTableHeight', () => {
  it('should return undefined if timeTableElementsMeta.parentRect is undefined', () => {
    expect(getTimeTableHeight({}))
      .toBeUndefined();
  });

  it('should return timetable\'s height', () => {
    const timeTableElementsMeta = {
      parentRect: () => ({ height: 'height' }),
    };
    expect(getTimeTableHeight(timeTableElementsMeta))
      .toBe('height');
  });
});

describe('#containsDSTchange', () => {
  const pacificTimezoneOffset = 480;
  const winterDate = new Date(2020, 2, 7);
  const hasDST = winterDate.getTimezoneOffset() === pacificTimezoneOffset;

  it('should return false when there is no dst change', () => {
    expect(containsDSTChange(winterDate))
      .toBe(false);
  });

  it('should return true when a DST change is present', () => {
    expect(containsDSTChange(new Date(2020, 2, 8)))
      .toBe(hasDST);
  });
});
