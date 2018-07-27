import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { HorizontalAppointment } from './horizontal-appointment';

describe('Appointment', () => {
  const defaultProps = {
    getTitle: () => 'title',
    appointment: {},
  };

  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<HorizontalAppointment {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('HorizontalAppointment', () => {
    it('should pass classes to the component', () => {
      const tree = shallow((
        <HorizontalAppointment {...defaultProps} />
      ));

      expect(tree.find(`.${classes.main}`).props())
        .toBeDefined();
      expect(tree.find(`.${classes.title}`).props())
        .toBeDefined();
    });
    it('should write title', () => {
      const tree = shallow((
        <HorizontalAppointment {...defaultProps} />
      ));

      expect(tree.find(`.${classes.title}`).props().children)
        .toBe('title');
    });
  });
});
