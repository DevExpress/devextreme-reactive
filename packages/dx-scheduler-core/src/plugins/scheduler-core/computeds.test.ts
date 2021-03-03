import { appointments, formatDateTimeGetter } from './computeds';
import { dateTimeFormatInstance } from './helpers';
import { convertToMoment } from '../common/helpers';

jest.mock('./helpers', () => ({
  dateTimeFormatInstance: jest.fn(),
}));
jest.mock('../common/helpers', () => ({
  convertToMoment: jest.fn(),
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
          key :0,
        },
        {
          start: '2018-06-27 11:00',
          end: '2018-06-27 12:00',
          dataItem: data[1],
          key: 1,
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
          key :0,
        },
      ]);
    });
    it('should add endDate if it not exists', () => {
      const result = appointments(
        [{ startDate: '2018-06-27 09:00' }],
      );

      expect(result).toEqual([
        {
          start: '2018-06-27 09:00',
          end: '2018-06-27 09:00',
          dataItem: { startDate: '2018-06-27 09:00', endDate: '2018-06-27 09:00' },
          key: 0,
        },
      ]);
    });
  });

  describe('#formatDateTimeGetter', () => {
    beforeEach(() => {
      convertToMoment.mockImplementation(date => ({ toDate: () => new Date(date) }));
      dateTimeFormatInstance.mockImplementation(
        () => new Intl.DateTimeFormat('en-US', { day: 'numeric' }),
      );
    });
    const locale = 'en-US';

    it('should work with same arguments', () => {
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
      const formatterInstance = formatDateTimeGetter(locale);
      const date = '2019-04-19 10:00';
      const options1 = { day: 'numeric' };

      formatterInstance(date, options1);

      expect(dateTimeFormatInstance)
        .toHaveBeenCalledTimes(1);
    });

    it('should work with numbers', () => {
      const formatterInstance = formatDateTimeGetter(locale);
      const date = 100000000;
      const options1 = { day: 'numeric' };

      formatterInstance(date, options1);

      expect(dateTimeFormatInstance)
        .toHaveBeenCalledTimes(1);
    });

    // 3145
    it('should call moment to get the same behaviour in all browsers', () => {
      const formatterInstance = formatDateTimeGetter(locale);

      const date = 100000000;
      const options = { day: 'numeric' };

      formatterInstance(date, options);

      expect(convertToMoment)
        .toHaveBeenCalledTimes(1);
      expect(convertToMoment)
        .toHaveBeenCalledWith(date);
    });
  });
});
