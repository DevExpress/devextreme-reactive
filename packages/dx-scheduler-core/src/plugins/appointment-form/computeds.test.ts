import { RRule } from 'rrule';
import {
  changeRecurrenceInterval,
  changeRecurrenceFrequency,
  changeRecurrenceEndDate,
  changeRecurrenceCount,
  changeRecurrenceWeekDays,
  getRecurrenceInterval,
  getRecurrenceFrequency,
  getRecurrenceEndDate,
  getRecurrenceCount,
  getRecurrenceWeekDays,
} from './computeds';
import { DEFAULT_RULE_OBJECT } from './constants';

describe('AppointmentForm computeds', () => {
  describe('#changeRecurrenceInterval', () => {
    it('should set recurrence interval', () => {
      const rule = new RRule({
        freq: RRule.MONTHLY,
      });

      expect((new RRule(
        RRule.parseString(changeRecurrenceInterval(rule.toString(), 1)))
      )
        .options)
        .toMatchObject((new RRule({
          freq: RRule.MONTHLY,
          interval: 1,
        })
        )
          .options);

      expect((new RRule(RRule.parseString(changeRecurrenceInterval(null, 1)))).options)
        .toMatchObject((new RRule({
          interval: 1,
        })
        )
          .options);
    });
  });

  describe('#getRecurrenceInterval', () => {
    it('should return recurrence interval', () => {
      const rule = new RRule({
        freq: RRule.MONTHLY,
        interval: 34,
      });

      expect(getRecurrenceInterval(rule.toString()))
        .toEqual(34);
      expect(getRecurrenceInterval(null))
        .toEqual(undefined);
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

  describe('#getRecurrenceFrequency', () => {
    it('should return recurrence frequency', () => {
      const rule = new RRule({
        freq: RRule.MONTHLY,
        interval: 34,
      });

      expect(getRecurrenceFrequency(rule.toString()))
        .toEqual(RRule.MONTHLY);
      expect(getRecurrenceFrequency(null))
        .toEqual(undefined);
    });
  });

  describe('#setRecurrenceEndDate', () => {
    it('should set recurrence end date', () => {
      const rule = new RRule({
        freq: RRule.DAILY,
      });
      const testDate = new Date(2019, 1, 1, 1);

      expect((new RRule(
        RRule.parseString(changeRecurrenceEndDate(rule.toString(), testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          freq: RRule.DAILY,
          until: testDate,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceEndDate(undefined, testDate)))
      )
        .options)
        .toMatchObject((new RRule({
          until: testDate,
        }))
          .options);

    });
  });

  describe('#getRecurrenceEndDate', () => {
    it('should return recurrence until parameter', () => {
      const rule = new RRule({
        freq: RRule.MONTHLY,
        until: new Date(1, 1, 1, 1),
      });

      expect(getRecurrenceEndDate(rule.toString()))
        .toEqual(new Date(1, 1, 1, 1));
      expect(getRecurrenceEndDate(null))
        .toEqual(null);
    });
  });

  describe('#setRecurrenceCount', () => {
    it('should set recurrence count', () => {
      const rule = new RRule({
        freq: RRule.DAILY,
      });

      expect((new RRule(
        RRule.parseString(changeRecurrenceCount(rule.toString(), 56)))
      )
        .options)
        .toMatchObject((new RRule({
          count: 56,
          freq: RRule.DAILY,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceCount(undefined, 72)))
      )
        .options)
        .toMatchObject((new RRule({
          count: 72,
        }))
          .options);
    });
  });

  describe('#getRecurrenceCount', () => {
    it('should return recurrence count', () => {
      const rule = new RRule({
        freq: RRule.MONTHLY,
        count: 125,
      });

      expect(getRecurrenceCount(rule.toString()))
        .toEqual(125);
      expect(getRecurrenceCount(null))
        .toEqual(undefined);
    });
  });

  describe('#setRecurrenceWeekDays', () => {
    it('should set recurrence byweekday parameter', () => {
      const rule = new RRule({
        freq: RRule.DAILY,
        byweekday: [RRule.SA],
      });

      expect((new RRule(
        RRule.parseString(changeRecurrenceWeekDays(rule.toString(), [RRule.MO, RRule.SU])))
      )
        .options)
        .toMatchObject((new RRule({
          byweekday: [RRule.MO, RRule.SU],
          freq: RRule.DAILY,
        }))
          .options);

      expect((new RRule(
        RRule.parseString(changeRecurrenceWeekDays(undefined, [RRule.MO, RRule.SU])))
      )
        .options)
        .toMatchObject((new RRule({
          byweekday: [RRule.MO, RRule.SU],
        }))
          .options);
    });
  });

  describe('#getRecurrenceWeekDys', () => {
    it('should return recurrence byweekday parameter', () => {
      const rule = new RRule({
        freq: RRule.MONTHLY,
        byweekday: [RRule.MO, RRule.WE, RRule.FR],
      });

      expect(getRecurrenceWeekDays(rule.toString()))
        .toEqual([RRule.MO, RRule.WE, RRule.FR]);
      expect(getRecurrenceWeekDays(null))
        .toEqual(undefined);
    });
  });
});
