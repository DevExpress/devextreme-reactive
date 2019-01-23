import { appointments } from './computeds';

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
