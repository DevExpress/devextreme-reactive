import { appointmentWithOffset } from './helpers';

describe('#appointmentWithOffset', () => {
  it('should find appointments intersection', () => {
    const appointments = [
      { start: '2018-06-29 12:00', end: '2018-06-29 12:15', dataItem: 'appointment_2' },
      { start: '2018-06-29 10:00', end: '2018-06-29 11:00', dataItem: 'appointment_0' },
      { start: '2018-06-29 12:00', end: '2018-06-29 12:30', dataItem: 'appointment_3' },
      { start: '2018-06-29 10:30', end: '2018-06-29 11:00', dataItem: 'appointment_1' },
    ];
    const result = appointmentWithOffset(appointments);
    expect(result)
      .toEqual([
        { ...appointments[1], offset: 0 },
        { ...appointments[3], overlapped: true, offset: 1 },
        { ...appointments[2], offset: 0 },
        { ...appointments[0], overlapped: true, offset: 1 },
      ]);
  });

  it('should find all appointments intersection', () => {
    const appointments = [
      { start: '2018-06-29 09:00', end: '2018-06-29 12:00', dataItem: 'appointment_0' },
      { start: '2018-06-29 10:00', end: '2018-06-29 10:30', dataItem: 'appointment_1' },
      { start: '2018-06-29 10:40', end: '2018-06-29 11:00', dataItem: 'appointment_2' },
      { start: '2018-06-29 10:50', end: '2018-06-29 12:30', dataItem: 'appointment_3' },
    ];
    const result = appointmentWithOffset(appointments);
    expect(result)
      .toEqual([
        { ...appointments[0], offset: 0 },
        { ...appointments[1], overlapped: true, offset: 1 },
        { ...appointments[2], overlapped: true, offset: 1 },
        { ...appointments[3], overlapped: true, offset: 2 },
      ]);
  });
});
