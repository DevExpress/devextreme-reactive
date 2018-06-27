import { filteredAppointments } from './computeds';

describe('Appointment computeds', () => {
  describe('#filteredAppointments', () => {
    const start = new Date(2018, 5, 27, 10);
    const end = new Date(2018, 5, 27, 15);
    const getAppointmentStartDate = appointment => appointment.start;
    const getAppointmentEndDate = appointment => appointment.end;
    const appointments = [
      { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 27, 11) },
      { start: new Date(2018, 5, 27, 11), end: new Date(2018, 5, 27, 16) },
      { start: new Date(2018, 5, 27, 11), end: new Date(2018, 5, 27, 12) },
      { start: new Date(2018, 5, 27, 9), end: new Date(2018, 5, 27, 16) },
      { start: new Date(2018, 5, 27, 8), end: new Date(2018, 5, 27, 9) },
      { start: new Date(2018, 5, 27, 16), end: new Date(2018, 5, 27, 17) },
    ];

    it('should work', () => {
      const filtered = filteredAppointments(
        start,
        end,
        appointments,
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
  });
});
