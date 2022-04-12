import * as React from 'react';
import { createMount, createShallow } from '@devexpress/dx-testing';
import { DraftAppointment, SourceAppointment, classes } from './appointments';

describe('DragDrop', () => {
  const defaultProps = {
    data: {},
    type: 'horizontal',
    fromPrev: false,
    toNext: false,
    formatDate: jest.fn(),
    durationType: 'long',
  };
  describe('DraftAppointment', () => {
    let shallow;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <DraftAppointment {...defaultProps} a={{ a: 1 }} />
      ));

      expect(tree.props().a)
        .toMatchObject({ a: 1 });
    });
    it('should pass className', () => {
      const tree = shallow((
        <DraftAppointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.appointment}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.shadedAppointment}`))
        .toBeFalsy();
    });
    it('should be shaded if "isShaded" is true', () => {
      const tree = shallow((
        <DraftAppointment
          {...defaultProps}
          isShaded
        />
      ));

      expect(tree.is(`.${classes.shadedAppointment}`))
        .toBeTruthy();
    });
  });

  describe('SourceAppointment', () => {
    let shallow;
    let mount;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
      mount = createMount();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <SourceAppointment {...defaultProps} a={{ a: 1 }} />
      ));

      expect(tree.props().a)
        .toMatchObject({ a: 1 });
    });
    it('should pass className', () => {
      const tree = shallow((
        <SourceAppointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.appointment}`))
        .toBeTruthy();
    });
    it('should pass "isShaded" to the root component', () => {
      const tree = shallow((
        <SourceAppointment {...defaultProps} isShaded />
      ));

      expect(tree.prop('isShaded'))
        .toBeTruthy();
    });
    it('should pass ref to the dom element', () => {
      const testRef = React.createRef();
      const tree = mount((
        <SourceAppointment
          {...defaultProps}
          forwardedRef={testRef}
        />
      ));

      expect(testRef.current)
        .toEqual(tree.getDOMNode());
    });
  });
});
