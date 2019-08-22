
import { RRule } from 'rrule';
import {
  callActionIfExists, isAllDayCell, changeRecurrenceFrequency, getRecurrenceOptions,
  changeRecurrenceOptions, handleStartDateChange, handleToDayOfWeekChange, handleWeekNumberChange,
  getRRuleFrequency, getFrequencyString,
} from './helpers';
import { DEFAULT_RULE_OBJECT, REPEAT_TYPES, RRULE_REPEAT_TYPES } from './constants';

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
    const testDate = new Date(2019, 1, 1, 0, 0);
    it('should create new rule for a given frequency', () => {
      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(undefined, RRule.DAILY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...DEFAULT_RULE_OBJECT,
          freq: RRule.DAILY,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(undefined, RRule.WEEKLY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...DEFAULT_RULE_OBJECT,
          freq: RRule.WEEKLY,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(undefined, RRule.MONTHLY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...DEFAULT_RULE_OBJECT,
          freq: RRule.MONTHLY,
          bymonthday: 1,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(undefined, RRule.YEARLY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...DEFAULT_RULE_OBJECT,
          freq: RRule.YEARLY,
          bymonthday: 1,
          bymonth: 2,
        }))
          .options);
    });

    it('should return a changed rule depending on frequency', () => {
      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(rule, RRule.DAILY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...RRule.parseString(rule),
          freq: RRule.DAILY,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(rule, RRule.WEEKLY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...RRule.parseString(rule),
          freq: RRule.WEEKLY,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(rule, RRule.MONTHLY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...RRule.parseString(rule),
          freq: RRule.MONTHLY,
          bymonthday: 1,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(rule, RRule.YEARLY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...RRule.parseString(rule),
          freq: RRule.YEARLY,
          bymonthday: 1,
          bymonth: 2,
        }))
          .options);
    });

    it('should clean bymonthday and byweekday when switching to daily', () => {
      const testRule = 'RRULE:INTERVAL=4;BYMONTHDAY=24;BYWEEKDAY=MO';

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(testRule, RRule.DAILY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...RRule.parseString(testRule),
          freq: RRule.DAILY,
          bymonthday: undefined,
          byweekday: undefined,
        }))
          .options);
    });

    it('should clean bymonthday and byweekday when switching to weekly', () => {
      const testRule = 'RRULE:INTERVAL=4;BYMONTHDAY=24;BYWEEKDAY=MO';

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(testRule, RRule.WEEKLY, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          ...RRule.parseString(testRule),
          freq: RRule.WEEKLY,
          bymonthday: undefined,
          byweekday: undefined,
        }))
          .options);
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

    it('should return options object with byweekday represented as an array of numbers', () => {
      expect(getRecurrenceOptions('RRULE:BYWEEKDAY=SU,MO,WE'))
        .toMatchObject({ byweekday: [6, 0, 2] });
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
          bymonthday: [1, 2, 3, 4, 5, 6, 7],
          byweekday: [1],
        });
      expect(getRecurrenceOptions(handleToDayOfWeekChange(1, 0, options)))
        .toMatchObject({
          bymonthday: [8, 9, 10, 11, 12, 13, 14],
          byweekday: [6],
        });
      expect(getRecurrenceOptions(handleToDayOfWeekChange(4, 5, options)))
        .toMatchObject({
          bymonthday: [-1, -2, -3, -4, -5, -6, -7],
          byweekday: [4],
        });
    });
  });

  describe('#handleWeekNumberChange', () => {
    const options = {};
    it('should rule with bymonthday and byweekday depending on props', () => {
      expect(getRecurrenceOptions(handleWeekNumberChange(2, options)))
        .toMatchObject({
          bymonthday: [15, 16, 17, 18, 19, 20, 21],
        });
      expect(getRecurrenceOptions(handleWeekNumberChange(4, options)))
        .toMatchObject({
          bymonthday: [-1, -2, -3, -4, -5, -6, -7],
        });
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
});
