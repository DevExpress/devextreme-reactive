import { getDaysOfWeek, getMonths, getNumberLabels } from './helpers';

const defaultMessages = {
  firstLabel: 'First',
  secondLabel: 'Second',
  thirdLabel: 'Third',
  fourthLabel: 'Fourth',
  lastLabel: 'Last',
  januaryLabel: 'January',
  februaryLabel: 'February',
  marchLabel: 'March',
  aprilLabel: 'April',
  mayLabel: 'May',
  juneLabel: 'June',
  julyLabel: 'July',
  augustLabel: 'August',
  septemberLabel: 'September',
  octoberLabel: 'October',
  novemberLabel: 'November',
  decemberLabel: 'December',
  sundayLabel: 'Sunday',
  mondayLabel: 'Monday',
  tuesdayLabel: 'Tuesday',
  wednesdayLabel: 'Wednesday',
  thursdayLabel: 'Thursday',
  fridayLabel: 'Friday',
  saturdayLabel: 'Saturday',
};

describe('AppointmentForm recurrence radio group helpers', () => {
  const defaultProps = {
    getMessage: message => defaultMessages[message],
  };
  describe('#getMonths', () => {
    it('should return months depending on getMessage function', () => {
      expect(getMonths(defaultProps.getMessage))
        .toEqual([
          { text: 'January', id: 1 },
          { text: 'February', id: 2 },
          { text: 'March', id: 3 },
          { text: 'April', id: 4 },
          { text: 'May', id: 5 },
          { text: 'June', id: 6 },
          { text: 'July', id: 7 },
          { text: 'August', id: 8 },
          { text: 'September', id: 9 },
          { text: 'October', id: 10 },
          { text: 'November', id: 11 },
          { text: 'December', id: 12 },
        ]);
    });
  });
  describe('#getDaysOfWeek', () => {
    it('should return days of week depending on getMessage function', () => {
      expect(getDaysOfWeek(defaultProps.getMessage))
        .toEqual([
          { text: 'Sunday', id: 0 },
          { text: 'Monday', id: 1 },
          { text: 'Tuesday', id: 2 },
          { text: 'Wednesday', id: 3 },
          { text: 'Thursday', id: 4 },
          { text: 'Friday', id: 5 },
          { text: 'Saturday', id: 6 },
        ]);
    });
  });
  describe('#getNumberLabels', () => {
    it('should return days of week depending on getMessage function', () => {
      expect(getNumberLabels(defaultProps.getMessage))
        .toEqual([
          { text: 'First', id: 0 },
          { text: 'Second', id: 1 },
          { text: 'Third', id: 2 },
          { text: 'Fourth', id: 3 },
          { text: 'Last', id: 4 },
        ]);
    });
  });
});
