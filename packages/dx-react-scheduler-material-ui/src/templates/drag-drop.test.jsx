import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { DraftAppointment, SourceAppointment, Container } from './drag-drop';


describe('DragDrop', () => {
  const defaultProps = {
    style: {},
    data: {},
    type: 'horizontal',
  };
  describe('DraftAppointment', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      classes = getClasses(<DraftAppointment {...defaultProps} />);
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
      expect(tree.is(`.${classes.draft}`))
        .toBeTruthy();
    });
  });

  describe('SourceAppointment', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      classes = getClasses(<SourceAppointment {...defaultProps} />);
      shallow = createShallow({ dive: true });
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
      expect(tree.is(`.${classes.source}`))
        .toBeTruthy();
    });
  });

  describe('Container', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      classes = getClasses(<Container />);
      shallow = createShallow({ dive: true });
    });
    it('should render children inside itself', () => {
      const tree = shallow((
        <Container>
          <div className="child" />
        </Container>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Container a={{ a: 1 }} />
      ));

      expect(tree.props().a)
        .toMatchObject({ a: 1 });
    });
    it('should pass className', () => {
      const tree = shallow((
        <Container className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.container}`))
        .toBeTruthy();
    });
  });
});
