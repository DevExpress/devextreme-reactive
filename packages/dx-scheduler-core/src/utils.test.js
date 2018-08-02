import moment from 'moment';
import {
  viewPredicate,
  sortAppointments,
  calculateFirstDateOfWeek,
  findOverlappedAppointments,
  adjustAppointments,
  unwrapGroups,
} from './utils';

describe('Utils', () => {
  const appointmentsBase = [
    { start: moment('2018-07-02 10:00'), end: moment('2018-07-02 11:00') },
    { start: moment('2018-07-02 10:30'), end: moment('2018-07-02 12:00') },
    { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 13:00') },
    { start: moment('2018-07-01 11:30'), end: moment('2018-07-01 12:00') },
    { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 11:00') },
    { start: moment('2018-07-02 10:40'), end: moment('2018-07-02 13:00') },
    { start: moment('2018-07-03 11:00'), end: moment('2018-07-03 15:00') },
    { start: moment('2018-07-02 12:00'), end: moment('2018-07-02 15:00') },
    { start: moment('2018-07-02 12:00'), end: moment('2018-07-03 09:30') },
    { start: moment('2018-07-01 12:00'), end: moment('2018-07-02 00:00') },
  ];
  const sortedAppointmentsBase = [
    appointmentsBase[2], appointmentsBase[4], appointmentsBase[3],
    appointmentsBase[0], appointmentsBase[1], appointmentsBase[5], appointmentsBase[6],
  ];
  const overlappedAppointments = [
    [{ ...appointmentsBase[2] }, { ...appointmentsBase[4] }, { ...appointmentsBase[3] }],
    [{ ...appointmentsBase[0] }, { ...appointmentsBase[1] }, { ...appointmentsBase[5] }],
    [{ ...appointmentsBase[6] }],
  ];
  describe('#viewPredicate', () => {
    it('should filter outside appointments', () => {
      const appointments = [
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 10:00') },
        { start: moment('2018-07-10 10:00'), end: moment('2018-07-10 12:00') },
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 12:00') },
        { start: moment('2018-07-10 09:30'), end: moment('2018-07-10 10:30') },
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 09:00') },
        { start: moment('2018-07-10 11:00'), end: moment('2018-07-10 12:00') },
      ];
      const filtered = appointments.filter(appointment => viewPredicate(appointment, '2018-07-10 09:00', '2018-07-10 11:00'));

      expect(filtered)
        .toEqual(appointments.slice(0, 4));
    });

    it('should filter appointments from excluded days', () => {
      const appointments = [
        { start: moment('2018-07-03 09:00'), end: moment('2018-07-03 11:00') },
        { start: moment('2018-07-04 09:00'), end: moment('2018-07-05 11:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-06 11:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-07 10:00') },
        { start: moment('2018-07-05 09:00'), end: moment('2018-07-05 11:00') },
        { start: moment('2018-07-07 09:00'), end: moment('2018-07-07 09:00') },
        { start: moment('2018-07-07 09:00'), end: moment('2018-07-08 10:00') },
      ];
      const filtered = appointments.filter(appointment => viewPredicate(appointment, '2018-07-02', '2018-07-08 23:59', [4, 6, 0]));

      expect(filtered)
        .toEqual(appointments.slice(0, 4));
    });

    it('should filter all-day appointments', () => {
      const appointments = [
        { start: moment('2018-07-10 08:00'), end: moment('2018-07-10 10:00'), expected: true },
        { start: moment('2018-07-10 22:00'), end: moment('2018-07-11 02:00'), expected: true },
        { start: moment('2018-07-09 08:00'), end: moment('2018-07-10 08:00'), expected: false },
      ];
      const filtered = appointments.filter(appointment => viewPredicate(appointment, '2018-07-08', '2018-07-12', [], true));

      expect(filtered)
        .toEqual(appointments.slice(0, 2));
    });
  });
  describe('#sortAppointments', () => {
    it('should sort appointments', () => {
      const appointments = [
        { start: moment('2018-07-02 10:00'), end: moment('2018-07-02 11:00') },
        { start: moment('2018-07-02 10:30'), end: moment('2018-07-02 12:00') },
        { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 13:00') },
        { start: moment('2018-07-01 11:30'), end: moment('2018-07-01 12:00') },
        { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 11:00') },
        { start: moment('2018-07-02 10:40'), end: moment('2018-07-02 13:00') },
        { start: moment('2018-07-03 11:00'), end: moment('2018-07-03 15:00') },
      ];
      const sortedAppointments = [
        appointments[2], appointments[4], appointments[3],
        appointments[0], appointments[1], appointments[5], appointments[6],
      ];
      expect(sortAppointments(appointments))
        .toEqual(sortedAppointments);
    });
    it('should sort appointments depend on day', () => {
      const appointments = [
        { start: moment('2018-07-01 09:00'), end: moment('2018-07-01 12:00') },
        { start: moment('2018-07-02 10:00'), end: moment('2018-07-02 11:00') },
        { start: moment('2018-07-01 10:00'), end: moment('2018-07-02 11:00') },
      ];
      const sortedAppointments = [
        appointments[2], appointments[0], appointments[1],
      ];
      expect(sortAppointments(appointments, true))
        .toEqual(sortedAppointments);
    });
  });

  describe('#findOverlappedAppointments', () => {
    it('should detect overlapped appointments', () => {
      expect(findOverlappedAppointments(sortedAppointmentsBase))
        .toEqual(overlappedAppointments);
    });

    it('should detect overlapped appointments depend on', () => {
      const sortedAppointmentsForDay = [
        appointmentsBase[0], appointmentsBase[7],
      ];
      const overlappedAppointmentsForDay = [
        [{ ...appointmentsBase[0] }, { ...appointmentsBase[7] }],
      ];
      expect(findOverlappedAppointments(sortedAppointmentsForDay, true))
        .toEqual(overlappedAppointmentsForDay);
    });

    it('should detect if appointment ends at 12:00 AM', () => {
      const sortedAppointmentsForDay = [
        appointmentsBase[9], appointmentsBase[0],
      ];
      expect(findOverlappedAppointments(sortedAppointmentsForDay, true))
        .toEqual([
          [{ ...appointmentsBase[9] }],
          [{ ...appointmentsBase[0] }],
        ]);
    });
  });

  describe('#adjustAppointments', () => {
    it('should calculate appointment offset and reduce coefficient', () => {
      expect(adjustAppointments(overlappedAppointments))
        .toEqual([
          {
            items: [
              { ...appointmentsBase[2], offset: 0 },
              { ...appointmentsBase[4], offset: 1 },
              { ...appointmentsBase[3], offset: 1 },
            ],
            reduceValue: 2,
          },
          {
            items: [
              { ...appointmentsBase[0], offset: 0 },
              { ...appointmentsBase[1], offset: 1 },
              { ...appointmentsBase[5], offset: 2 },
            ],
            reduceValue: 3,
          },
          {
            items: [
              { ...appointmentsBase[6], offset: 0 },
            ],
            reduceValue: 1,
          },
        ]);
    });

    it('should consider if appointments start and end at the same time', () => {
      const groups = [
        [{ ...appointmentsBase[1] }, { ...appointmentsBase[7] }],
      ];
      expect(adjustAppointments(groups))
        .toEqual([
          {
            items: [
              { ...appointmentsBase[1], offset: 0 },
              { ...appointmentsBase[7], offset: 0 },
            ],
            reduceValue: 1,
          },
        ]);
    });

    it('should calculate appointment offset depend on day', () => {
      const groups = [
        [{ ...appointmentsBase[8] }, { ...appointmentsBase[6] }],
      ];
      expect(adjustAppointments(groups, true))
        .toEqual([
          {
            items: [
              { ...appointmentsBase[8], offset: 0 },
              { ...appointmentsBase[6], offset: 1 },
            ],
            reduceValue: 2,
          },
        ]);
    });
  });
  describe('#unwrapGroups', () => {
    it('should calculate appointment offset and reduce coefficient', () => {
      const appointmentsGroups = [
        {
          reduceValue: 1,
          items: [
            {
              start: moment('2017-07-20 08:00'),
              end: moment('2017-07-20 08:30'),
              dataItem: {},
              offset: 1,
            },
            {
              start: moment('2017-07-20 08:30'),
              end: moment('2017-07-20 09:00'),
              dataItem: {},
              offset: 2,
            },
          ],
        },
        {
          reduceValue: 2,
          items: [
            {
              start: moment('2017-04-20 08:00'),
              end: moment('2017-04-22 08:30'),
              dataItem: {},
              offset: 0,
            },
            {
              start: moment('2017-05-25 08:00'),
              end: moment('2017-05-25 09:15'),
              dataItem: {},
              offset: 1,
            },
          ],
        },
      ];
      expect(unwrapGroups(appointmentsGroups))
        .toEqual([
          {
            ...appointmentsGroups[0].items[0],
            reduceValue: 1,
          },
          {
            ...appointmentsGroups[0].items[1],
            reduceValue: 1,
          },
          {
            ...appointmentsGroups[1].items[0],
            reduceValue: 2,
          },
          {
            ...appointmentsGroups[1].items[1],
            reduceValue: 2,
          },
        ]);
    });
  });
  describe('#calculateFirstDateOfWeek', () => {
    it('should calculate first daye of week', () => {
      const firstDateOfWeek = calculateFirstDateOfWeek('2018-07-06', 3);
      expect(firstDateOfWeek.toString())
        .toBe(new Date(2018, 6, 4).toString());
    });

    it('should calculate first date of week depend on excluded days', () => {
      const firstDateOfWeek = calculateFirstDateOfWeek('2018-07-06', 2, [3, 2, 1]);
      expect(firstDateOfWeek.toString())
        .toBe(new Date(2018, 6, 5).toString());
    });
  });
});
