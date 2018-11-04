import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { VerticalAppointment } from './vertical-appointment';
import { Appointment } from './appointment';

jest.mock('./appointment', () => ({
  Appointment: jest.fn(),
}));

describe('VerticalAppointment', () => {
  const defaultProps = {
    data: {},
  };
  const mapAppointmentData = () => ({
    title: 'title',
    startDate: new Date('2018-07-27 13:10'),
    endDate: new Date('2018-07-27 17:10'),
  });

  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<VerticalAppointment {...defaultProps} />);
    mount = createMount({ dive: true });
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
  describe('VerticalAppointment', () => {
    it('should pass rest props to the root element', () => {
      mount((
        <VerticalAppointment
          {...defaultProps}
          customProp="custom prop"
          mapAppointmentData={mapAppointmentData}
        />
      ));
      const { customProp } = Appointment.mock.calls[0][0];

      expect(customProp)
        .toBe('custom prop');
    });

    it('should render title', () => {
      const tree = mount((
        <VerticalAppointment
          {...defaultProps}
          mapAppointmentData={mapAppointmentData}
        />
      ));

      expect(tree.find(`.${classes.title}`).text())
        .toBe('title');
    });

    it('should render appointment times', () => {
      const tree = mount((
        <VerticalAppointment
          {...defaultProps}
          mapAppointmentData={mapAppointmentData}
        />
      ));

      expect(tree.find(`.${classes.time}`).at(0).text())
        .toBe('1:10 PM');
      expect(tree.find(`.${classes.time}`).at(1).text())
        .toBe(' - ');
      expect(tree.find(`.${classes.time}`).at(2).text())
        .toBe('5:10 PM');
    });

    it('should render children', () => {
      const child = mount((
        <VerticalAppointment
          {...defaultProps}
          mapAppointmentData={mapAppointmentData}
        >
          <div className="child" />
        </VerticalAppointment>
      ));

      expect(child.exists())
        .toBeTruthy();
    });
  });
});
