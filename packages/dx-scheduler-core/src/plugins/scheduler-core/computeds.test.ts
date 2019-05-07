import { appointments, formatDateTimeGetter } from './computeds';
import { dateTimeFormatInstance } from './helpers';

jest.mock('./helpers', () => ({
  dateTimeFormatInstance: jest.fn(),
}));

describe('SchedulerCore computeds', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('#appointments', () => {
    const data = [
      { startDate: '2018-06-27 09:00', endDate: '2018-06-27 10:00' },
      { startDate: '2018-06-27 11:00', endDate: '2018-06-27 12:00' },
    ];

    it('should work without the "allDay" appointment field', () => {
      const result = appointments(
        data,
      );

      expect(result).toEqual([
        {
          start: '2018-06-27 09:00',
          end: '2018-06-27 10:00',
          dataItem: data[0],
        },
        {
          start: '2018-06-27 11:00',
          end: '2018-06-27 12:00',
          dataItem: data[1],
        },
      ]);
    });
    it('should work with the "allDay" appointment field', () => {
      const dataWithAllDay = [
        { startDate: '2018-06-27 09:00', endDate: '2018-06-27 10:00', allDay: true },
      ];
      const result = appointments(
        dataWithAllDay,
        appointment => ({
          startDate: appointment.starts.at,
          endDate: appointment.ends.at,
          allDay: appointment.allDay,
        }),
      );

      expect(result).toEqual([
        {
          start: '2018-06-27 09:00',
          end: '2018-06-27 10:00',
          allDay: true,
          dataItem: dataWithAllDay[0],
        },
      ]);
    });
  });

  describe('#formatDateTimeGetter', () => {
    const locale = 'en-US';
    it('should work with same arguments', () => {
      dateTimeFormatInstance.mockImplementation(
        () => new Intl.DateTimeFormat('en-US', { day: 'numeric' }),
      );
      const formatterInstance = formatDateTimeGetter(locale);
      const options = { day: 'numeric' };

      formatterInstance(new Date('2019-04-19 10:00'), options);
      formatterInstance(new Date('2019-04-20 10:00'), options);

      expect(dateTimeFormatInstance)
        .toBeCalledWith(locale, options);
      expect(dateTimeFormatInstance)
        .toHaveBeenCalledTimes(1);
    });

    it('should work with another options', () => {
      dateTimeFormatInstance.mockImplementation(
        () => new Intl.DateTimeFormat('en-US', { day: 'numeric' }),
      );
      const formatterInstance = formatDateTimeGetter(locale);
      const date = new Date('2019-04-19 10:00');
      const options1 = { day: 'numeric' };
      const options2 = { weekDay: 'numeric' };

      formatterInstance(date, options1);
      formatterInstance(date, options2);
      formatterInstance(date, options1);

      expect(dateTimeFormatInstance)
        .toHaveBeenCalledTimes(2);
    });

    it('should work with strings', () => {
      dateTimeFormatInstance.mockImplementation(
        () => new Intl.DateTimeFormat('en-US', { day: 'numeric' }),
      );
      const formatterInstance = formatDateTimeGetter(locale);
      const date = '2019-04-19 10:00';
      const options1 = { day: 'numeric' };

      formatterInstance(date, options1);

      expect(dateTimeFormatInstance)
        .toHaveBeenCalledTimes(1);
    });

    it('should work with numbers', () => {
      dateTimeFormatInstance.mockImplementation(
        () => new Intl.DateTimeFormat('en-US', { day: 'numeric' }),
      );
      const formatterInstance = formatDateTimeGetter(locale);
      const date = 100000000;
      const options1 = { day: 'numeric' };

      formatterInstance(date, options1);

      expect(dateTimeFormatInstance)
        .toHaveBeenCalledTimes(1);
    });
  });
});
