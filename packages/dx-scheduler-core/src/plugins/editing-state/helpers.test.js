import {
  createWeekAppointment,
  createMonthAppointment,
} from './helpers';

describe('EditingState Helpers', () => {
  describe('#createWeekAppointment', () => {
    it('should correct calculate arguments', () => {
      const addAppointment = jest.fn();
      const date = new Date('2018 9 25');
      const start = new Date('2018 8 20 10:00');
      const end = new Date('2018 7 27 12:00');
      const title = 'title';
      createWeekAppointment(addAppointment, {
        date, start, end, title,
      });

      expect(addAppointment)
        .toHaveBeenCalledWith({ title, startDate: new Date('2018 9 25 10:00'), endDate: new Date('2018 9 25 12:00') });
    });
  });

  describe('#createMonthAppointment', () => {
    it('should correct calculate arguments', () => {
      const addAppointment = jest.fn();
      const date = new Date('2018 9 25');
      const title = 'title';
      createMonthAppointment(addAppointment, {
        date, title,
      });

      expect(addAppointment)
        .toHaveBeenCalledWith({
          title, startDate: new Date('2018 9 25 00:00'), endDate: new Date('2018 9 26 00:00'), allDay: true,
        });
    });
  });
});
