import { filteredAppointments } from './computeds';

describe('Appointment computeds', () => {
  describe('#filteredAppointments', () => {
    const start = new Date(2018, 5, 27, 10);
    const end = new Date(2018, 5, 27, 15);
    const appointments = [
      [new Date(2018, 5, 27, 9), new Date(2018, 5, 27, 11)],
      [new Date(2018, 5, 27, 11), new Date(2018, 5, 27, 16)],
      [new Date(2018, 5, 27, 11), new Date(2018, 5, 27, 12)],
      [new Date(2018, 5, 27, 9), new Date(2018, 5, 27, 16)],
      [new Date(2018, 5, 27, 8), new Date(2018, 5, 27, 9)],
      [new Date(2018, 5, 27, 16), new Date(2018, 5, 27, 17)],
    ];

    it('should work', () => {
      const filtered = filteredAppointments(start, end, appointments);

      expect(filtered).toEqual([
        appointments[0],
        appointments[1],
        appointments[2],
        appointments[3],
      ]);
    });
  });
});
