import {
  isMonthCell, isReducedBrightnessAppointment, getCurrentTimeIndicatorTop, isCellShaded,
} from './helpers';

describe('CurrentTimeIndicator helpers', () => {
  describe('#isMonthCell', () => {
    it('should return true if parameter is true or false', () => {
      expect(isMonthCell(true))
        .toBeTruthy();
      expect(isMonthCell(false))
        .toBeTruthy();
    });

    it('should return false if parameter is undefined', () => {
      expect(isMonthCell(undefined))
        .toBeFalsy();
    });
  });

  describe('#isReducedBrightnessAppointment', () => {
    const defaultCurrentTime = (new Date(2019, 10, 13, 12, 0)).getTime();

    it('should return true when appointment ends before current time', () => {
      const testAppointment = {
        startDate: new Date(2019, 10, 13, 10, 10),
        endDate: new Date(2019, 10, 13, 11, 10),
      };
      expect(isReducedBrightnessAppointment({ data: testAppointment }, defaultCurrentTime, true))
        .toBeTruthy();
    });

    it('should return false when reduceBrightness is false', () => {
      const testAppointment = {
        startDate: new Date(2019, 10, 13, 10, 10),
        endDate: new Date(2019, 10, 13, 11, 10),
      };
      expect(isReducedBrightnessAppointment({ data: testAppointment }, defaultCurrentTime, true))
        .toBeTruthy();
    });

    it('should return false when appointment begins before the current time but ends after', () => {
      const testAppointment = {
        startDate: new Date(2019, 10, 13, 10, 10),
        endDate: new Date(2019, 10, 13, 12, 10),
      };
      expect(isReducedBrightnessAppointment({ data: testAppointment }, defaultCurrentTime, true))
        .toBeFalsy();
    });

    it('should return false when appointment begins after the current time', () => {
      const testAppointment = {
        startDate: new Date(2019, 10, 13, 12, 10),
        endDate: new Date(2019, 10, 13, 13, 10),
      };
      expect(isReducedBrightnessAppointment({ data: testAppointment }, defaultCurrentTime, true))
        .toBeFalsy();
    });

    it('should return false if appointment is allday and on the current day', () => {
      const testAppointment = {
        startDate: new Date(2019, 10, 13, 10, 10),
        endDate: new Date(2019, 10, 13, 11, 10),
        allDay: true,
      };
      expect(isReducedBrightnessAppointment({ data: testAppointment }, defaultCurrentTime, true))
        .toBeFalsy();
    });

    it('should return false if appointment is allday begins after current time', () => {
      const testAppointment = {
        startDate: new Date(2019, 10, 14, 10, 10),
        endDate: new Date(2019, 10, 14, 11, 10),
        allDay: true,
      };
      expect(isReducedBrightnessAppointment({ data: testAppointment }, defaultCurrentTime, true))
        .toBeFalsy();
    });

    it('should return true if appointment is allday and before the current day', () => {
      const testAppointment = {
        startDate: new Date(2019, 10, 12, 10, 10),
        endDate: new Date(2019, 10, 12, 11, 10),
        allDay: true,
      };
      expect(isReducedBrightnessAppointment({ data: testAppointment }, defaultCurrentTime, true))
        .toBeTruthy();
    });
  });

  describe('#getCurrentTimeIndicatorTop', () => {
    it('should return "0" if any of the parameters is undefined', () => {
      expect(getCurrentTimeIndicatorTop(undefined, new Date(), new Date()))
        .toBe('0');
      expect(getCurrentTimeIndicatorTop(new Date(), undefined, new Date()))
        .toBe('0');
      expect(getCurrentTimeIndicatorTop(new Date(), new Date(), undefined))
        .toBe('0');
    });

    it('should work', () => {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getTime() - 100);
      const endDate = new Date(currentDate.getTime() + 100);
      expect(getCurrentTimeIndicatorTop(startDate, endDate, currentDate))
        .toBe('50%');
    });
  });

  describe('#isCellShaded', () => {
    const defaultCurrentTime = (new Date(2019, 10, 13, 12, 0)).getTime();

    it('should return true if cell\'s endDate is before currentTime', () => {
      const testCell = {
        startDate: new Date(defaultCurrentTime - 200),
        endDate: new Date(defaultCurrentTime - 100),
      };

      expect(isCellShaded({ ...testCell }, defaultCurrentTime, true))
        .toBeTruthy();
    });

    it('should return false if shadePastCells is false', () => {
      const testCell = {
        startDate: new Date(defaultCurrentTime - 200),
        endDate: new Date(defaultCurrentTime - 100),
      };

      expect(isCellShaded({ ...testCell }, defaultCurrentTime, false))
        .toBeFalsy();
    });

    it('should return true if cell\'s startDate is before currentTime', () => {
      const testCell = {
        startDate: new Date(defaultCurrentTime - 100),
        endDate: new Date(defaultCurrentTime + 100),
      };

      expect(isCellShaded({ ...testCell }, defaultCurrentTime, true))
        .toBeTruthy();
    });

    it('should work with otherMonth', () => {
      const testCell = {
        startDate: new Date(defaultCurrentTime - 200),
        endDate: new Date(defaultCurrentTime - 100),
        otherMonth: true,
      };

      expect(isCellShaded({ ...testCell }, defaultCurrentTime, true))
        .toBeTruthy();
    });

    it(
      'should return false if cell\'s startDate is before currentTime but otherMonth if defined',
      () => {
        const testCell = {
          startDate: new Date(defaultCurrentTime - 100),
          endDate: new Date(defaultCurrentTime + 100),
          otherMonth: true,
        };

        expect(isCellShaded({ ...testCell }, defaultCurrentTime, true))
          .toBeFalsy();
      },
    );

    it('should return false if startDate is after currentTime', () => {
      const testCell = {
        startDate: new Date(defaultCurrentTime + 100),
        endDate: new Date(defaultCurrentTime + 200),
      };

      expect(isCellShaded({ ...testCell }, defaultCurrentTime, true))
        .toBeFalsy();
    });
  });
});
