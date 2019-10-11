import {
  LONG_WEEK_DAY_OPTIONS, SUNDAY_DATE, MONDAY_DATE, DAY_LONG_MONTH_OPTIONS,
  TUESDAY_DATE, WEDNESDAY_DATE, THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE,
  JANUARY_DATE, LONG_MONTH_OPTIONS, FEBRUARY_DATE, MARCH_DATE, APRIL_DATE,
  MAY_DATE, AUGUST_DATE, OCTOBER_DATE, NOVEMBER_DATE, DECEMBER_DATE, SEPTEMBER_DATE,
  JULY_DATE, JUNE_DATE, RRULE_REPEAT_TYPES, checkIsNaturalNumber,
} from '@devexpress/dx-scheduler-core';
import {
  getDaysOfWeek, getMonths, getWeekNumberLabels, getMonthsWithOf, getCountDependingOnRecurrenceType,
} from './utils';

describe('AppointmentForm utils', () => {
  const defaultProps = {
    getMessage: jest.fn(),
    formatDate: jest.fn(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('#getMonths', () => {
    it('should return months depending formatDate function', () => {
      getMonths(defaultProps.formatDate);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(JANUARY_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(FEBRUARY_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(MARCH_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(APRIL_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(MAY_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(JUNE_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(JULY_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(AUGUST_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(SEPTEMBER_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(OCTOBER_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(NOVEMBER_DATE, LONG_MONTH_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(DECEMBER_DATE, LONG_MONTH_OPTIONS);
    });
  });
  describe('#getMonthsWithOf', () => {
    it('should return months with of', () => {
      const formatDateWithReturn = jest.fn(() => 'test return value');
      getMonthsWithOf(defaultProps.getMessage, formatDateWithReturn);

      expect(defaultProps.getMessage)
        .toHaveBeenCalledTimes(12);
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('ofLabel');

      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(JANUARY_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(FEBRUARY_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(MARCH_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(APRIL_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(MAY_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(JUNE_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(JULY_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(AUGUST_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(SEPTEMBER_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(OCTOBER_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(NOVEMBER_DATE, DAY_LONG_MONTH_OPTIONS);
      expect(formatDateWithReturn)
        .toHaveBeenCalledWith(DECEMBER_DATE, DAY_LONG_MONTH_OPTIONS);
    });
  });
  describe('#getDaysOfWeek', () => {
    it('should return days of week', () => {
      const result = getDaysOfWeek(defaultProps.formatDate, 0);

      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(SUNDAY_DATE, LONG_WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(MONDAY_DATE, LONG_WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(TUESDAY_DATE, LONG_WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(WEDNESDAY_DATE, LONG_WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(THURSDAY_DATE, LONG_WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(FRIDAY_DATE, LONG_WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(SATURDAY_DATE, LONG_WEEK_DAY_OPTIONS);
      expect(result[0].id)
        .toEqual(0);
      expect(result[1].id)
        .toEqual(1);
      expect(result[2].id)
        .toEqual(2);
      expect(result[3].id)
        .toEqual(3);
      expect(result[4].id)
        .toEqual(4);
      expect(result[5].id)
        .toEqual(5);
      expect(result[6].id)
        .toEqual(6);
    });
    it('should return days of week depending on firstDayOfWeek', () => {
      const firstDayOfWeek = 2;
      const result = getDaysOfWeek(defaultProps.formatDate, firstDayOfWeek);

      expect(result[0].id)
        .toEqual(2);
      expect(result[1].id)
        .toEqual(3);
      expect(result[2].id)
        .toEqual(4);
      expect(result[3].id)
        .toEqual(5);
      expect(result[4].id)
        .toEqual(6);
      expect(result[5].id)
        .toEqual(0);
      expect(result[6].id)
        .toEqual(1);
    });
  });
  describe('#getWeekNumberLabels', () => {
    it('should return days of week depending on getMessage function', () => {
      getWeekNumberLabels(defaultProps.getMessage);

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('firstLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('secondLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('thirdLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('fourthLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('lastLabel');
    });
  });
  describe('#getCountDependingOnRecurrenceType', () => {
    it('should return count = 30 for daily appointments', () => {
      expect(getCountDependingOnRecurrenceType(RRULE_REPEAT_TYPES.DAILY))
        .toEqual(30);
    });
    it('should return count = 13 for weekly appointments', () => {
      expect(getCountDependingOnRecurrenceType(RRULE_REPEAT_TYPES.WEEKLY))
        .toEqual(13);
    });
    it('should return count = 12 for monthly appointments', () => {
      expect(getCountDependingOnRecurrenceType(RRULE_REPEAT_TYPES.MONTHLY))
        .toEqual(12);
    });
    it('should return count = 5 for yearly appointments', () => {
      expect(getCountDependingOnRecurrenceType(RRULE_REPEAT_TYPES.YEARLY))
        .toEqual(5);
    });
  });
  describe('#checkIsNaturalNumber', () => {
    it('should return true if a number is bigger than 0 and less or equal to max integer', () => {
      expect(checkIsNaturalNumber(1))
        .toBeTruthy();
      expect(checkIsNaturalNumber(Number.MAX_SAFE_INTEGER))
        .toBeTruthy();
    });
    it('should return false otherwise', () => {
      expect(checkIsNaturalNumber(0))
        .toBeFalsy();
      expect(checkIsNaturalNumber(-5))
        .toBeFalsy();
    });
  });
});
