import {
  LONG_WEEK_DAY_OPTIONS, SUNDAY_DATE, MONDAY_DATE, DAY_LONG_MONTH_OPTIONS,
  TUESDAY_DATE, WEDNESDAY_DATE, THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE,
  JANUARY_DATE, LONG_MONTH_OPTIONS, FEBRUARY_DATE, MARCH_DATE, APRIL_DATE,
  MAY_DATE, AUGUST_DATE, OCTOBER_DATE, NOVEMBER_DATE, DECEMBER_DATE, SEPTEMBER_DATE,
  JULY_DATE, JUNE_DATE, getRRuleFrequency, changeRecurrenceFrequency,
} from '@devexpress/dx-scheduler-core';
import {
  getDaysOfWeek, getMonths, getNumberLabels, handleChangeFrequency, getMonthsWithOf,
} from './helpers';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  getRRuleFrequency: jest.fn(),
  changeRecurrenceFrequency: jest.fn(),
}));

describe('AppointmentForm helpers', () => {
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
    it('should return days of week depending on getMessage function', () => {
      getDaysOfWeek(defaultProps.formatDate);

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
    });
  });
  describe('#getNumberLabels', () => {
    it('should return days of week depending on getMessage function', () => {
      getNumberLabels(defaultProps.getMessage);

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
  describe('#handleChangeFrequency', () => {
    it('should change frequency', () => {
      getRRuleFrequency.mockImplementation(() => 'daily');
      changeRecurrenceFrequency.mockImplementation(() => undefined);
      const action = jest.fn();
      handleChangeFrequency('repeat_type', {}, action);
      expect(getRRuleFrequency)
        .toBeCalledTimes(1);
      expect(changeRecurrenceFrequency)
        .toBeCalledTimes(1);
      expect(action)
        .toBeCalledTimes(1);
    });
  });
});
