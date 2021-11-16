import * as React from 'react';
import { createMount, createShallow } from '@devexpress/dx-testing';
import { Resize, classes } from './resize';

describe('DragDrop', () => {
  const defaultProps = {
    position: 'start',
    appointmentType: 'vertical',
  };
  describe('Resize', () => {
    let shallow;
    let mount;
    beforeAll(() => {
      shallow = createShallow();
      mount = createMount();
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

    it('should pass ref to the dom element', () => {
      const testRef = React.createRef();
      const tree = mount((
        <Resize
          {...defaultProps}
          forwardedRef={testRef}
        >
          <div />
        </Resize>
      ));

      expect(testRef.current)
        .toEqual(tree.getDOMNode());
    });
  });
});
