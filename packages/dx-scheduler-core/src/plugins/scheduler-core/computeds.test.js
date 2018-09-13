import { appointments } from './computeds';

describe('#appointments', () => {
  const data = [
    { starts: { at: '2018-06-27 09:00' }, ends: { at: '2018-06-27 10:00' } },
    { starts: { at: '2018-06-27 11:00' }, ends: { at: '2018-06-27 12:00' } },
  ];

  it('should work without the "allDay" appointment field', () => {
    const result = appointments(
      data,
      appointment => appointment.starts.at,
      appointment => appointment.ends.at,
      appointment => appointment.allDay,
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
      { starts: { at: '2018-06-27 09:00' }, ends: { at: '2018-06-27 10:00' }, allDay: true },
    ];
    const result = appointments(
      dataWithAllDay,
      appointment => appointment.starts.at,
      appointment => appointment.ends.at,
      appointment => appointment.allDay,
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
