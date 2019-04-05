import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Resize } from './resize';

describe('DragDrop', () => {
  const defaultProps = {
    position: 'start',
    appointmentType: 'vertical',
  };
  describe('Resize', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      classes = getClasses(<Resize {...defaultProps} />);
      shallow = createShallow({ dive: true });
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Resize {...defaultProps} a={{ a: 1 }} />
      ));

      expect(tree.props().a)
        .toMatchObject({ a: 1 });
    });
    it('should pass className', () => {
      const tree = shallow((
        <Resize {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.resize}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.verticalStart}`))
        .toBeTruthy();
    });
    it('should manage classes by props', () => {
      let tree = shallow((
        <Resize position="start" appointmentType="horizontal" />
      ));

      expect(tree.is(`.${classes.horizontalStart}`))
        .toBeTruthy();

      tree = shallow((
        <Resize position="end" appointmentType="horizontal" />
      ));

      expect(tree.is(`.${classes.horizontalEnd}`))
        .toBeTruthy();

      tree = shallow((
        <Resize position="end" appointmentType="vertical" />
      ));

      expect(tree.is(`.${classes.verticalEnd}`))
        .toBeTruthy();
    });
  });
});
