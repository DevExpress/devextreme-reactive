import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Slice } from './slice';

describe('Appointment', () => {
  const defaultProps = {
    position: 'start',
    appointmentType: 'vertical',
  };
  describe('Slice', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      classes = getClasses(<Slice {...defaultProps} />);
      shallow = createShallow({ dive: true });
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Slice {...defaultProps} a={{ a: 1 }} />
      ));

      expect(tree.props().a)
        .toMatchObject({ a: 1 });
    });
    it('should pass className', () => {
      const tree = shallow((
        <Slice {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.slice}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.verticalTop}`))
        .toBeTruthy();
    });
    it('should manage classes by props', () => {
      let tree = shallow((
        <Slice position="start" appointmentType="horizontal" />
      ));

      expect(tree.is(`.${classes.horizontalTop}`))
        .toBeTruthy();

      tree = shallow((
        <Slice position="end" appointmentType="horizontal" />
      ));

      expect(tree.is(`.${classes.horizontalBottom}`))
        .toBeTruthy();

      tree = shallow((
        <Slice position="end" appointmentType="vertical" />
      ));

      expect(tree.is(`.${classes.verticalBottom}`))
        .toBeTruthy();
    });
  });
});
