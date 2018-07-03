import { filteredAppointments } from './computeds';

describe('Appointment computeds', () => {
  describe('#filteredAppointments', () => {
    const getAppointmentStartDate = appointment => appointment.start;
    const getAppointmentEndDate = appointment => appointment.end;

    it('should work', () => {
      const appointments = [
        { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 27, 11) },
        { start: new Date(2018, 5, 27, 11), end: new Date(2018, 5, 27, 16) },
        { start: new Date(2018, 5, 27, 11), end: new Date(2018, 5, 27, 12) },
        { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 27, 16) },
        { start: new Date(2018, 5, 27, 8), end: new Date(2018, 5, 27, 9) },
        { start: new Date(2018, 5, 27, 16), end: new Date(2018, 5, 27, 17) },
      ];
      const filtered = filteredAppointments(
        appointments,
        new Date(2018, 5, 27, 10),
        new Date(2018, 5, 27, 15),
        [],
        getAppointmentStartDate,
        getAppointmentEndDate,
      );

      expect(filtered).toEqual([
        appointments[0],
        appointments[1],
        appointments[2],
        appointments[3],
      ]);
    });

    fit('should filter appointments from excluded days', () => {
      const appointments = [
        { start: new Date(2018, 6, 3, 9), end: new Date(2018, 6, 3, 11) }, // true
        { start: new Date(2018, 6, 4, 9), end: new Date(2018, 6, 5, 11) }, // true
        { start: new Date(2018, 6, 5, 9), end: new Date(2018, 6, 5, 11) }, // false
        { start: new Date(2018, 6, 5, 9), end: new Date(2018, 6, 6, 11) }, // true
        { start: new Date(2018, 6, 7, 9), end: new Date(2018, 6, 7, 9) }, // false
        { start: new Date(2018, 6, 7, 9), end: new Date(2018, 6, 8, 10) }, // false
        { start: new Date(2018, 6, 5, 9), end: new Date(2018, 6, 7, 10) }, // true
      ];

      const filtered = filteredAppointments(
        appointments,
        new Date(2018, 6, 2),
        new Date(2018, 6, 8, 23, 59),
        [4, 6, 0],
        getAppointmentStartDate,
        getAppointmentEndDate,
      );

      expect(filtered).toEqual([
        appointments[0],
        appointments[1],
        appointments[3],
        appointments[6],
      ]);
    });
  });
});
