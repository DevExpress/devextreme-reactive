import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Appointment } from './appointment';

describe('Appointment', () => {
  const defaultProps = {
    style: {},
  };

  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(
      <Appointment {...defaultProps}>
        <div />
      </Appointment>,
    );
    shallow = createShallow({ dive: true });
  });
  describe('AppointmentWrapper', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Appointment {...defaultProps} className="custom-class">
          <div />
        </Appointment>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.appointment}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.clickableAppointment}`))
        .toBeFalsy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Appointment {...defaultProps} customProp={{ a: 1 }}>
          <div />
        </Appointment>
      ));

      expect(tree.props().customProp)
        .toMatchObject({ a: 1 });
    });

    it('should render children', () => {
      const child = shallow((
        <Appointment {...defaultProps}>
          <div className="child" />
        </Appointment>
      )).find('.child');

      expect(child.exists())
        .toBeTruthy();
    });

    it('should handle the "onClick" handler if exists', () => {
      const clickMock = jest.fn();
      const appointment = shallow((
        <Appointment
          {...defaultProps}
          onClick={clickMock}
          data={{ text: 'a' }}
        >
          <div />
        </Appointment>
      )).find(`.${classes.appointment}`);

      appointment.simulate('click', { target: 'target' });

      expect(clickMock.mock.calls[0][0])
        .toEqual({ target: 'target', data: { text: 'a' } });
    });

    it('should apply clickable class if onClick event exists', () => {
      const tree = shallow((
        <Appointment
          {...defaultProps}
          onClick={() => undefined}
        >
          <div />
        </Appointment>
      ));

      expect(tree.is(`.${classes.clickableAppointment}`))
        .toBeTruthy();
    });

    it('should apply clickable class if onDoubleClick event exists', () => {
      const tree = shallow((
        <Appointment
          {...defaultProps}
          onDoubleClick={() => undefined}
        >
          <div />
        </Appointment>
      ));

      expect(tree.is(`.${classes.clickableAppointment}`))
        .toBeTruthy();
    });

    it('should apply clickable class if draggable is true', () => {
      const tree = shallow((
        <Appointment
          {...defaultProps}
          draggable
        >
          <div />
        </Appointment>
      ));

      expect(tree.is(`.${classes.clickableAppointment}`))
        .toBeTruthy();
    });
  });
});
