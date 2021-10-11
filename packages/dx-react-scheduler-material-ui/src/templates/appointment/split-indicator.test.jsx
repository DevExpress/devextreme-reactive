import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { SplitIndicator } from './split-indicator';

describe('Appointment', () => {
  const defaultProps = {
    position: 'start',
    appointmentType: 'vertical',
  };
  describe('SplitIndicator', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      classes = getClasses(<SplitIndicator {...defaultProps} />);
      shallow = createShallow({ dive: true });
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <SplitIndicator {...defaultProps} a={{ a: 1 }} />
      ));

      expect(tree.props().a)
        .toMatchObject({ a: 1 });
    });
    it('should pass className', () => {
      const tree = shallow((
        <SplitIndicator {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.slice}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.verticalStart}`))
        .toBeTruthy();
    });
    it('should manage classes by props', () => {
      let tree = shallow((
        <SplitIndicator position="start" appointmentType="horizontal" />
      ));

      expect(tree.is(`.${classes.horizontalStart}`))
        .toBeTruthy();

      tree = shallow((
        <SplitIndicator position="end" appointmentType="horizontal" />
      ));

      expect(tree.is(`.${classes.horizontalEnd}`))
        .toBeTruthy();

      tree = shallow((
        <SplitIndicator position="end" appointmentType="vertical" />
      ));

      expect(tree.is(`.${classes.verticalEnd}`))
        .toBeTruthy();
    });
  });
});
