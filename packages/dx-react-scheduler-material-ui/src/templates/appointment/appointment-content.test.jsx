import * as React from 'react';
import { mount } from 'enzyme';
import { createShallow } from '@mui/material/test-utils';
import { AppointmentContent } from './appointment-content';
import { HorizontalAppointment } from './horizontal-appointment';
import { VerticalAppointment } from './vertical-appointment';

describe('AppointmentContent', () => {
  let shallow;
  const defaultProps = {
    data: {},
    type: 'horizontal',
    recurringIconComponent: () => <div />,
    formatDate: () => undefined,
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('AppointmentWrapper', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <AppointmentContent {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should render horizontal type', () => {
      const tree = mount((
        <AppointmentContent {...defaultProps} type="horizontal" />
      ));

      expect(tree.find(HorizontalAppointment).exists())
        .toBeTruthy();
    });

    it('should render vertical type', () => {
      const tree = mount((
        <AppointmentContent {...defaultProps} type="vertical" />
      ));

      expect(tree.find(VerticalAppointment).exists())
        .toBeTruthy();
    });
  });
});
