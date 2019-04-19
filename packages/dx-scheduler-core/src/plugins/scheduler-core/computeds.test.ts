import { appointments, dateTimeFormat } from './computeds';

describe('SchedulerCore computeds', () => {
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

  describe('#dateTimeFormat', () => {
    const locale = 'en-US';
    it('should work with same arguments', () => {
      const localizationFormatter = dateTimeFormat(locale);
      const formatterInstance = localizationFormatter();

      const date = new Date('2019-04-19 10:00');
      const options = { day: 'numeric' };

      expect(formatterInstance(date, options))
        .toEqual('19');
      expect(formatterInstance(date, options))
        .toEqual('19');
    });
  });
});
