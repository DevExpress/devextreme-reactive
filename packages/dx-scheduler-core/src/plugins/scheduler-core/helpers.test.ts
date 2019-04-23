import { dateTimeFormatInstance } from './helpers';

describe('SchedulerCore helpers', () => {
  describe('#dateTimeFormatInstance', () => {
    it('should work', () => {
      const locale = 'en-US';
      const formatOptions = { day: 'numeric' };
      const date = new Date('2019-01-29 10:00');
      const timeFormatInstance = dateTimeFormatInstance(locale, formatOptions);
      expect(timeFormatInstance.format(date))
        .toEqual('29');
    });
  });
});
