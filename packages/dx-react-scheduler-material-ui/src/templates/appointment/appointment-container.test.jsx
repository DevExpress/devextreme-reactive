import * as React from 'react';
import { shallow } from 'enzyme';
import { AppointmentContainer } from './appointment-container';

describe('Appointments', () => {
  const defaultProps = {
    style: {},
  };
  describe('AppointmentContainer', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <AppointmentContainer {...defaultProps} className="custom-class">
          <div />
        </AppointmentContainer>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
    });
    it('should render children inside', () => {
      const tree = shallow((
        <AppointmentContainer {...defaultProps} data={{ a: 1 }}>
          <div className="child" />
        </AppointmentContainer>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
  });
});
