import { changeAppointmentField, conditionalActionCall } from './helpers';

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
  describe('#conditionalActionCall', () => {
    const action = jest.fn();
    const payload = {};
    it('should call action if it is defined', () => {
      conditionalActionCall(action, payload);
      expect(action)
        .toBeCalledWith({});
    });

    it('should not call action if it is not defined', () => {
      expect(() => conditionalActionCall(undefined, payload))
        .not.toThrow();
    });
  });
});
