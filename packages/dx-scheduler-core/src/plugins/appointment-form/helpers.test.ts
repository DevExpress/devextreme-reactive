
import { RRule } from 'rrule';
import {
  callActionIfExists, isAllDayCell, changeRecurrenceFrequency, getRecurrenceOptions,
  changeRecurrenceOptions, handleStartDateChange, handleToDayOfWeekChange,
  getRRuleFrequency, getFrequencyString, handleChangeFrequency, getRadioGroupDisplayData,
  handleWeekDaysChange, getDaysOfWeekArray, getDaysOfWeekDates, checkMultipleResourceFields,
} from './helpers';
import {
  REPEAT_TYPES, RRULE_REPEAT_TYPES, DAYS_OF_WEEK_ARRAY,
  DAYS_OF_WEEK_DATES, SUNDAY_DATE, MONDAY_DATE, TUESDAY_DATE, WEDNESDAY_DATE,
  THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE, RRULE_DAYS_OF_WEEK,
} from './constants';
import { getCountDependingOnRecurrenceType } from './utils';

jest.mock('./utils', () => ({
  getCountDependingOnRecurrenceType: jest.fn(),
}));

describe('AppointmentForm helpers', () => {
  describe('#callActionIfExists', () => {
    const action = jest.fn();
    const payload = {};
    it('should call action if it is defined', () => {
      callActionIfExists(action, payload);
      expect(action)
        .toBeCalledWith(payload);
    });

    it('should not call action if it is not defined', () => {
      expect(() => callActionIfExists(undefined, payload))
        .not.toThrow();
    });
  });
  describe('#isAllDayCell', () => {
    it('should work', () => {
      expect(isAllDayCell(new Date('2018-10-10'), new Date('2018-10-11')))
        .toBeTruthy();
    });
  });

  describe('#changeRecurrenceFrequency', () => {
    const rule = 'RRULE:INTERVAL=3';
    const testDate = new Date(2019, 0, 1, 0, 0);
    beforeEach(() => {
      getCountDependingOnRecurrenceType.mockImplementation(() => 5);
    });
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('should create new rule for a given frequency', () => {
      expect(changeRecurrenceFrequency(undefined, RRule.DAILY, testDate))
        .toBe('RRULE:INTERVAL=1;FREQ=DAILY;COUNT=5');
      expect(changeRecurrenceFrequency(undefined, RRule.WEEKLY, testDate))
        .toBe('RRULE:INTERVAL=1;FREQ=WEEKLY;COUNT=5');
      expect(changeRecurrenceFrequency(undefined, RRule.MONTHLY, testDate))
        .toBe('RRULE:INTERVAL=1;FREQ=MONTHLY;BYMONTHDAY=1;COUNT=5');
      expect(changeRecurrenceFrequency(undefined, RRule.YEARLY, testDate))
        .toBe('RRULE:INTERVAL=1;FREQ=YEARLY;BYMONTHDAY=1;BYMONTH=1;COUNT=5');

      expect(getCountDependingOnRecurrenceType)
        .toBeCalledTimes(4);
    });

    it('should return a changed rule depending on frequency', () => {
      expect(changeRecurrenceFrequency(rule, RRule.DAILY, testDate))
        .toBe('RRULE:INTERVAL=3;FREQ=DAILY;COUNT=5');
      expect(changeRecurrenceFrequency(rule, RRule.WEEKLY, testDate))
        .toBe('RRULE:INTERVAL=3;FREQ=WEEKLY;COUNT=5');
      expect(changeRecurrenceFrequency(rule, RRule.MONTHLY, testDate))
        .toBe('RRULE:INTERVAL=3;FREQ=MONTHLY;COUNT=5;BYMONTHDAY=1');
      expect(changeRecurrenceFrequency(rule, RRule.YEARLY, testDate))
        .toBe('RRULE:INTERVAL=3;FREQ=YEARLY;COUNT=5;BYMONTHDAY=1;BYMONTH=1');

      expect(getCountDependingOnRecurrenceType)
        .toBeCalledTimes(4);
    });

    it('should clear bymonthday and byweekday when switching to daily', () => {
      const testRule = 'RRULE:INTERVAL=4;BYMONTHDAY=24;BYWEEKDAY=MO';

      expect(changeRecurrenceFrequency(testRule, RRule.DAILY, testDate))
        .toBe('RRULE:INTERVAL=4;FREQ=DAILY;COUNT=5');
      expect(getCountDependingOnRecurrenceType)
        .toHaveBeenCalled();
    });

    it('should clear bymonthday and byweekday when switching to weekly', () => {
      const testRule = 'RRULE:INTERVAL=4;BYMONTHDAY=24;BYWEEKDAY=MO';

      expect(changeRecurrenceFrequency(testRule, RRule.WEEKLY, testDate))
        .toBe('RRULE:INTERVAL=4;FREQ=WEEKLY;COUNT=5');
      expect(getCountDependingOnRecurrenceType)
        .toHaveBeenCalled();
    });

    it('should clear byweekday when switching to yearly', () => {
      const testRule = 'RRULE:INTERVAL=4;BYWEEKDAY=MO';

      expect(changeRecurrenceFrequency(testRule, RRule.YEARLY, testDate))
        .toBe('RRULE:INTERVAL=4;FREQ=YEARLY;COUNT=5;BYMONTHDAY=1;BYMONTH=1');
      expect(getCountDependingOnRecurrenceType)
        .toHaveBeenCalled();
    });

    it('should clear byweekday when switching to monthly', () => {
      const testRule = 'RRULE:INTERVAL=4;BYWEEKDAY=MO';

      expect(changeRecurrenceFrequency(testRule, RRule.MONTHLY, testDate))
        .toBe('RRULE:INTERVAL=4;FREQ=MONTHLY;COUNT=5;BYMONTHDAY=1');
      expect(getCountDependingOnRecurrenceType)
        .toHaveBeenCalled();
    });
  });

  describe('#getRecurrenceOptions', () => {
    it('should work', () => {
      expect(getRecurrenceOptions('RRULE:COUNT=6'))
        .toEqual(expect.any(Object));
    });

    it('should return null if rule isn\'t provided', () => {
      expect(getRecurrenceOptions())
        .toEqual(null);
    });

    it(
      'should return options object with byweekday represented as an array of day-of-week obejcts',
      () => {
        expect(getRecurrenceOptions('RRULE:BYWEEKDAY=SU,MO,WE'))
          .toMatchObject({
            byweekday: [
              RRULE_DAYS_OF_WEEK[6],
              RRULE_DAYS_OF_WEEK[0],
              RRULE_DAYS_OF_WEEK[2],
            ],
          });
      });
  });

  describe('#changeRecurrenceOptions', () => {
    const options = {};
    it('should work', () => {
      expect(changeRecurrenceOptions(options))
        .toEqual(expect.any(String));
    });

    it('should return undefined if options are not provided', () => {
      expect(changeRecurrenceOptions(undefined))
        .toEqual(undefined);
    });
  });

  describe('#handleStartDateChange', () => {
    const options = { bymonthday: 25 };
    it('should work', () => {
      expect(handleStartDateChange(21, options))
        .toEqual('RRULE:BYMONTHDAY=21');
    });

    it('shouldn\'t change bymonthday if it\'s bigger than 31', () => {
      expect(handleStartDateChange(32, options))
        .toEqual('RRULE:BYMONTHDAY=25');
    });
  });

  describe('#handleToDayOfWeekChange', () => {
    const options = {};
    it('should return rule with bymonthday and byweekday depending on props', () => {
      expect(getRecurrenceOptions(handleToDayOfWeekChange(0, 2, options)))
        .toMatchObject({
          byweekday: [RRULE_DAYS_OF_WEEK[1].nth(1)],
        });
      expect(getRecurrenceOptions(handleToDayOfWeekChange(1, 0, options)))
        .toMatchObject({
          byweekday: [RRULE_DAYS_OF_WEEK[6].nth(2)],
        });
      expect(getRecurrenceOptions(handleToDayOfWeekChange(4, 5, options)))
        .toMatchObject({
          byweekday: [RRULE_DAYS_OF_WEEK[4].nth(-1)],
        });
    });

    it('should return rule correct rrule', () => {
      expect(handleToDayOfWeekChange(0, 2, options))
        .toBe('RRULE:BYDAY=+1TU');
      expect(handleToDayOfWeekChange(4, 2, options))
        .toBe('RRULE:BYDAY=-1TU');
    });
  });

  describe('#getRRuleFrequency', () => {
    it('should work', () => {
      expect(getRRuleFrequency(REPEAT_TYPES.DAILY))
        .toEqual(RRULE_REPEAT_TYPES.DAILY);
      expect(getRRuleFrequency(REPEAT_TYPES.WEEKLY))
        .toEqual(RRULE_REPEAT_TYPES.WEEKLY);
      expect(getRRuleFrequency(REPEAT_TYPES.MONTHLY))
        .toEqual(RRULE_REPEAT_TYPES.MONTHLY);
      expect(getRRuleFrequency(REPEAT_TYPES.YEARLY))
        .toEqual(RRULE_REPEAT_TYPES.YEARLY);
    });
  });

  describe('#getFrequencyString', () => {
    it('should work', () => {
      expect(getFrequencyString(RRULE_REPEAT_TYPES.DAILY))
        .toEqual(REPEAT_TYPES.DAILY);
      expect(getFrequencyString(RRULE_REPEAT_TYPES.WEEKLY))
        .toEqual(REPEAT_TYPES.WEEKLY);
      expect(getFrequencyString(RRULE_REPEAT_TYPES.MONTHLY))
        .toEqual(REPEAT_TYPES.MONTHLY);
      expect(getFrequencyString(RRULE_REPEAT_TYPES.YEARLY))
        .toEqual(REPEAT_TYPES.YEARLY);
      expect(getFrequencyString(undefined))
        .toEqual(REPEAT_TYPES.NEVER);
    });
  });
  describe('#handleChangeFrequency', () => {
    beforeEach(() => {
      getCountDependingOnRecurrenceType.mockImplementation(() => 5);
    });
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('should change frequency', () => {
      const action = jest.fn();
      handleChangeFrequency('daily', '', new Date(), action);
      expect(action)
        .toBeCalledWith({
          rRule: 'RRULE:INTERVAL=1;FREQ=DAILY;COUNT=5',
        });
      expect(getCountDependingOnRecurrenceType)
        .toHaveBeenCalled();
    });
  });
  describe('#getRadioGroupDisplayData', () => {
    it('should return "First Option" if bymonthday is defined but not an array', () => {
      const testOptions = { bymonthday: 12 };
      const result = getRadioGroupDisplayData(
        testOptions, 1, 1, 1, 'First Option', 'Second Option',
      );
      expect(result)
        .toMatchObject({
          dayNumberTextField: 12,
          weekNumber: 1,
          dayOfWeek: 1,
          radioGroupValue: 'First Option',
        });
    });

    it('should return "Second Option"', () => {
      const testOptions = {};
      const result = getRadioGroupDisplayData(
        testOptions, 1, 1, 1, 'First Option', 'Second Option',
      );
      expect(result)
        .toMatchObject({
          dayNumberTextField: 1,
          weekNumber: 1,
          dayOfWeek: 1,
          radioGroupValue: 'Second Option',
        });
    });

    it('should return "Second Option" if byweekday is non-empty array', () => {
      let testOptions = {
        byweekday: [RRULE_DAYS_OF_WEEK[3].nth(1)],
      };

      let result = getRadioGroupDisplayData(
        testOptions, 1, 1, 1, 'First Option', 'Second Option',
      );
      expect(result)
        .toMatchObject({
          dayNumberTextField: 1,
          weekNumber: 0,
          dayOfWeek: 4,
          radioGroupValue: 'Second Option',
        });

      testOptions = {
        byweekday: [RRULE_DAYS_OF_WEEK[6].nth(-1)],
      };
      result = getRadioGroupDisplayData(
        testOptions, 1, 1, 1, 'First Option', 'Second Option',
      );
      expect(result)
        .toMatchObject({
          dayNumberTextField: 1,
          weekNumber: 4,
          dayOfWeek: 0,
          radioGroupValue: 'Second Option',
        });
    });
  });
  describe('#handleWeekDaysChange', () => {
    it('should add a day of week', () => {
      const result = handleWeekDaysChange({ byweekday: [RRULE_DAYS_OF_WEEK[1]] }, 3);

      expect(result)
        .toMatchObject({
          byweekday: [RRULE_DAYS_OF_WEEK[1], RRULE_DAYS_OF_WEEK[3]],
        });
    });
    it('should remove a day of week', () => {
      const result = handleWeekDaysChange({ byweekday: [RRULE_DAYS_OF_WEEK[3]] }, 3);

      expect(result)
        .toMatchObject({
          byweekday: [],
        });
    });
    it('should create a new array for byweekday prop', () => {
      const result = handleWeekDaysChange({}, 3);

      expect(result)
        .toMatchObject({
          byweekday: [RRULE_DAYS_OF_WEEK[3]],
        });
    });
  });
  describe('#getDaysOfWeekArray', () => {
    it('should return days from Sunday to Saturday', () => {
      const result = getDaysOfWeekArray(0);

      expect(result)
        .toEqual(DAYS_OF_WEEK_ARRAY);
    });
    it('should return days from Monday to Sunday', () => {
      const result = getDaysOfWeekArray(1);

      expect(result)
        .toEqual([0, 1, 2, 3, 4, 5, 6]);
    });
    it('should return days from Tuesday to Monday', () => {
      const result = getDaysOfWeekArray(2);

      expect(result)
        .toEqual([1, 2, 3, 4, 5, 6, 0]);
    });
    it('should return days from Wednesday to Tuesday', () => {
      const result = getDaysOfWeekArray(3);

      expect(result)
        .toEqual([2, 3, 4, 5, 6, 0, 1]);
    });
    it('should return days from Thursday to Wednesday', () => {
      const result = getDaysOfWeekArray(4);

      expect(result)
        .toEqual([3, 4, 5, 6, 0, 1, 2]);
    });
    it('should return days from Friday to Thursday', () => {
      const result = getDaysOfWeekArray(5);

      expect(result)
        .toEqual([4, 5, 6, 0, 1, 2, 3]);
    });
    it('should return days from Saturday to Sunday', () => {
      const result = getDaysOfWeekArray(6);

      expect(result)
        .toEqual([5, 6, 0, 1, 2, 3, 4]);
    });
  });
  describe('#getDaysOfWeekDates', () => {
    it('should return days from Sunday to Saturday', () => {
      const result = getDaysOfWeekDates(0);

      expect(result)
        .toEqual(DAYS_OF_WEEK_DATES);
    });
    it('should return days from Monday to Sunday', () => {
      const result = getDaysOfWeekDates(1);

      expect(result)
        .toEqual([
          MONDAY_DATE, TUESDAY_DATE, WEDNESDAY_DATE,
          THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE, SUNDAY_DATE,
        ]);
    });
    it('should return days from Tuesday to Monday', () => {
      const result = getDaysOfWeekDates(2);

      expect(result)
        .toEqual([
          TUESDAY_DATE, WEDNESDAY_DATE, THURSDAY_DATE, FRIDAY_DATE,
          SATURDAY_DATE, SUNDAY_DATE, MONDAY_DATE,
        ]);
    });
    it('should return days from Wednesday to Tuesday', () => {
      const result = getDaysOfWeekDates(3);

      expect(result)
        .toEqual([
          WEDNESDAY_DATE, THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE,
          SUNDAY_DATE, MONDAY_DATE, TUESDAY_DATE,
        ]);
    });
    it('should return days from Thursday to Wednesday', () => {
      const result = getDaysOfWeekDates(4);

      expect(result)
        .toEqual([
          THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE, SUNDAY_DATE,
          MONDAY_DATE, TUESDAY_DATE, WEDNESDAY_DATE,
        ]);
    });
    it('should return days from Friday to Thursday', () => {
      const result = getDaysOfWeekDates(5);

      expect(result)
        .toEqual([
          FRIDAY_DATE, SATURDAY_DATE, SUNDAY_DATE, MONDAY_DATE,
          TUESDAY_DATE, WEDNESDAY_DATE, THURSDAY_DATE,
        ]);
    });
    it('should return days from Saturday to Sunday', () => {
      const result = getDaysOfWeekDates(6);

      expect(result)
        .toEqual([
          SATURDAY_DATE, SUNDAY_DATE, MONDAY_DATE, TUESDAY_DATE,
          WEDNESDAY_DATE, THURSDAY_DATE, FRIDAY_DATE,
        ]);
    });
  });
  describe('#prepareChangedAppointment', () => {
    it('should turn multiple instance resource fields into arrays', () => {
      const resourceFields = {
        singleInstanceResource: 'singleInstanceResource',
        multipleInstanceResource: 'multipleInstanceResource',
      };
      const resources = [
        { fieldName: 'singleInstanceResource', allowMultiple: false },
        { fieldName: 'multipleInstanceResource', allowMultiple: true },
      ];

      expect(checkMultipleResourceFields(resourceFields, resources))
        .toEqual({
          singleInstanceResource: 'singleInstanceResource',
          multipleInstanceResource: ['multipleInstanceResource'],
        });
    });
  });
});
