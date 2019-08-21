
import { RRule } from 'rrule';
import {
  callActionIfExists, isAllDayCell, changeRecurrenceFrequency,
} from './helpers';
import { DEFAULT_RULE_OBJECT } from './constants';

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
    it('should set recurrence frequency', () => {
      const rule = new RRule({
        interval: 3,
      });

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(rule.toString(), RRule.MONTHLY)))
      )
        .options)
        .toMatchObject((new RRule({
          interval: 3,
          freq: RRule.MONTHLY,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceFrequency(undefined, RRule.WEEKLY)))
      )
        .options)
        .toMatchObject((new RRule({
          ...DEFAULT_RULE_OBJECT,
          freq: RRule.WEEKLY,
        }))
          .options);
    });
  });
});
