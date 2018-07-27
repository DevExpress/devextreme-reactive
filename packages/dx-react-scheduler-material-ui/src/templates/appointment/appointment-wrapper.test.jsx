import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { AppointmentWrapper } from './appointment-wrapper';

describe('Appointment', () => {
  const defaultProps = {
    top: 0,
    left: 1,
    width: 2,
    height: 3,
    getTitle: () => 'title',
    getStartDate: () => new Date(2018, 6, 7),
    getEndDate: () => new Date(2018, 6, 8),
    appointment: {},
    appointmentComponent: () => null,
  };

  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<AppointmentWrapper {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('AppointmentWrapper', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <AppointmentWrapper {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.appointmentWrapper}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <AppointmentWrapper {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should define position by props', () => {
      const tree = shallow((
        <AppointmentWrapper {...defaultProps} />
      ));

      expect(tree.props().style)
        .toEqual({
          transform: `translateY(${defaultProps.top}px)`,
          left: `${defaultProps.left}%`,
          width: `${defaultProps.width}%`,
          height: defaultProps.height,
        });
    });
    it('should render appointmentComponent and pass to it necessary props', () => {
      const appointment = props => <div {...props} />;
      const tree = shallow((
        <AppointmentWrapper {...defaultProps} appointmentComponent={appointment} />
      ));

      expect(tree.find(appointment).props())
        .toMatchObject({
          getStartDate: defaultProps.getStartDate,
          getEndDate: defaultProps.getEndDate,
          getTitle: defaultProps.getTitle,
          appointment: defaultProps.appointment,
        });
    });
  });
});
