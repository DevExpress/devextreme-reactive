import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { Appointment } from './appointment';
import { HorizontalAppointment } from './horizontal-appointment';

jest.mock('./appointment', () => ({
  Appointment: jest.fn(),
}));

describe('HorizontalAppointment', () => {
  const defaultProps = {
    appointment: {},
  };

  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<HorizontalAppointment {...defaultProps} />);
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });
  beforeEach(() => {
    Appointment.mockImplementation(({ children }) => (
      <div className="appointment">
        {children}
      </div>
    ));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('HorizontalAppointment', () => {
    it('should pass rest props to the root element', () => {
      mount((
        <HorizontalAppointment {...defaultProps} customProp="custom prop" />
      ));

      const { customProp } = Appointment.mock.calls[0][0];

      expect(customProp)
        .toBe('custom prop');
    });

    it('should render title', () => {
      const tree = mount((
        <HorizontalAppointment
          {...defaultProps}
          getTitle={() => 'title'}
        />
      ));

      expect(tree.find(`.${classes.title}`).text())
        .toBe('title');
    });

    it('should render children', () => {
      const child = mount((
        <HorizontalAppointment {...defaultProps}>
          <div className="child" />
        </HorizontalAppointment>
      ));

      expect(child.exists())
        .toBeTruthy();
    });
  });
});
