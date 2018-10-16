import { changeAppointmentField, callActionIfExists, isAllDayCell } from './helpers';

describe('AppointmentForm helpers', () => {
  describe('#changeAppointmentField', () => {
    const firstAction = jest.fn();
    const secondAction = jest.fn();
    const changeAction = () => 'change';
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should work', () => {
      expect(changeAppointmentField(true, firstAction, secondAction, changeAction))
        .toEqual(expect.any(Function));
    });

    it('should call first action if conditional is true', () => {
      changeAppointmentField(true, firstAction, secondAction, changeAction)();

      expect(firstAction)
        .toBeCalledWith({ change: 'change' });
      expect(secondAction)
        .not.toBeCalled();
    });

    it('should call second action if conditional is false', () => {
      changeAppointmentField(false, firstAction, secondAction, changeAction)();

      expect(secondAction)
        .toBeCalledWith({ change: 'change' });
      expect(firstAction)
        .not.toBeCalled();
    });
  });
  describe('#callActionIfExists', () => {
    const action = jest.fn();
    const payload = {};
    it('should call action if it is defined', () => {
      callActionIfExists(action, payload);
      expect(action)
        .toBeCalledWith(payload);
    });

    it('should not call action if it is not defined', () => {
      expect(() => callActionIfExists(undefined, payload))
        .not.toThrow();
    });
  });
  describe('#isAllDayCell', () => {
    it('should work', () => {
      expect(isAllDayCell(new Date('2018-10-10'), new Date('2018-10-11')))
        .toBeTruthy();
    });
  });
});
