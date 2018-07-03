import { filteredAppointments, sliceAppointments, formattedAppointments } from './computeds';

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

  describe('#sliceAppointments', () => {
    const startViewDate = new Date(2018, 5, 27, 10);
    const endViewDate = new Date(2018, 5, 29, 15);
    const timeScale = [new Date(2018, 6, 22, 10), new Date(2018, 6, 23, 15)];
    it('should slice if appointment `start` before startViewDate and `end` before endViewHour', () => {
      const appointments = [
        { start: new Date(2018, 5, 26, 9), end: new Date(2018, 5, 27, 11), dataItem: {} },
      ];
      const slicedAppointments = sliceAppointments(appointments, startViewDate, endViewDate, timeScale);

      expect(slicedAppointments).toEqual([
        { start: new Date(2018, 5, 27, 10), end: new Date(2018, 5, 27, 11), dataItem: {} },
      ]);
    });

    it('should slice if appointment `start` before endViewHour and `end` after endViewDate', () => {
      const appointments = [
        { start: new Date(2018, 5, 29, 12), end: new Date(2018, 5, 30, 11), dataItem: {} },
      ];
      const slicedAppointments = sliceAppointments(appointments, startViewDate, endViewDate, timeScale);

      expect(slicedAppointments).toEqual([
        { start: new Date(2018, 5, 29, 12), end: new Date(2018, 5, 29, 15), dataItem: {} },
      ]);
    });

    it('should slice if appointment `start` before endViewDate and `end` after endViewHour', () => {
      const appointments = [
        { start: new Date(2018, 5, 26, 12), end: new Date(2018, 5, 27, 16), dataItem: {} },
      ];
      const slicedAppointments = sliceAppointments(appointments, startViewDate, endViewDate, timeScale);

      expect(slicedAppointments).toEqual([
        { start: new Date(2018, 5, 27, 10), end: new Date(2018, 5, 27, 15), dataItem: {} },
      ]);
    });

    it('should slice if appointment `start` before startViewHour and `end` after endViewDate', () => {
      const appointments = [
        { start: new Date(2018, 5, 26, 12), end: new Date(2018, 5, 27, 16), dataItem: {} },
      ];
      const slicedAppointments = sliceAppointments(appointments, startViewDate, endViewDate, timeScale);

      expect(slicedAppointments).toEqual([
        { start: new Date(2018, 5, 27, 10), end: new Date(2018, 5, 27, 15), dataItem: {} },
      ]);
    });

    it('should slice if appointment `start` before endViewHour and `end` after startViewHour', () => {
      const appointments = [
        { start: new Date(2018, 5, 27, 14), end: new Date(2018, 5, 28, 12), dataItem: {} },
      ];
      const slicedAppointments = sliceAppointments(appointments, startViewDate, endViewDate, timeScale);

      expect(slicedAppointments).toEqual([
        { start: new Date(2018, 5, 27, 14), end: new Date(2018, 5, 27, 15), dataItem: {} },
        { start: new Date(2018, 5, 28, 10), end: new Date(2018, 5, 28, 12), dataItem: {} },
      ]);
    });

    it('should slice if two different months', () => {
      const appointments = [
        { start: new Date(2018, 5, 29, 14), end: new Date(2018, 5, 30, 12), dataItem: {} },
      ];
      const startView = new Date(2018, 5, 29, 10);
      const endView = new Date(2018, 6, 1, 15);
      const slicedAppointments = sliceAppointments(appointments, startView, endView, timeScale);

      expect(slicedAppointments).toEqual([
        { start: new Date(2018, 5, 29, 14), end: new Date(2018, 5, 29, 15), dataItem: {} },
        { start: new Date(2018, 5, 30, 10), end: new Date(2018, 5, 30, 12), dataItem: {} },
      ]);
    });
  });

  describe('#formattedAppointments', () => {
    const getAppointmentStartDate = appointment => appointment.startField;
    const getAppointmentEndDate = appointment => appointment.endField;
    const appointments = [
      { startField: new Date(2018, 5, 27, 9), endField: new Date(2018, 5, 27, 11) },
      { startField: new Date(2018, 5, 27, 11), endField: new Date(2018, 5, 27, 16) },
    ];

    it('should work', () => {
      const filtered = formattedAppointments(
        appointments,
        getAppointmentStartDate,
        getAppointmentEndDate,
      );

      expect(filtered).toEqual([
        {
          start: new Date(2018, 5, 27, 9),
          end: new Date(2018, 5, 27, 11),
          dataItem: { startField: new Date(2018, 5, 27, 9), endField: new Date(2018, 5, 27, 11) },
        },
        {
          start: new Date(2018, 5, 27, 11),
          end: new Date(2018, 5, 27, 16),
          dataItem: { startField: new Date(2018, 5, 27, 11), endField: new Date(2018, 5, 27, 16) },
        },
      ]);
    });
  });
});
