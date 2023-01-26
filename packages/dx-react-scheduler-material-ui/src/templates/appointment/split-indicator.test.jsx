import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { SplitIndicator, classes } from './split-indicator';

describe('Appointment', () => {
  const defaultProps = {
    position: 'start',
    appointmentType: 'vertical',
  };
  describe('SplitIndicator', () => {
    let shallow;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <SplitIndicator {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
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
