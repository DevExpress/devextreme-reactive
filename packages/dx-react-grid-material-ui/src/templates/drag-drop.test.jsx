import React from 'react';
import { Paper } from 'material-ui';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { Container, Column } from './drag-drop';

describe('DragDrop', () => {
  describe('Container', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
      classes = getClasses((
        <Container
          clientOffset={{ x: 10, y: 20 }}
        />
      ));
    });

    it('should have correct styles', () => {
      const tree = shallow((
        <Container
          clientOffset={{ x: 10, y: 20 }}
        />
      ));

      expect(tree.find(Paper).hasClass(classes.container))
        .toBeTruthy();
    });

    it('should apply custom styles', () => {
      const tree = shallow((
        <Container
          clientOffset={{ x: 10, y: 20 }}
          style={{ color: 'red' }}
        />
      ));

      expect(tree.find(Paper).prop('style'))
        .toMatchObject({
          transform: 'translate(calc(10px - 50%), calc(20px - 50%))',
          color: 'red',
        });
    });

    it('should pass the className prop to the root element', () => {
      const tree = shallow((
        <Container
          clientOffset={{ x: 10, y: 20 }}
          className="custom-class"
        />
      ));

      expect(tree.is(`.${classes.container}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Container
          clientOffset={{ x: 10, y: 20 }}
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });

  describe('Column', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
      classes = getClasses((
        <Column
          column={{
            title: 'Test',
          }}
        />
      ));
    });

    it('should pass the className prop to the root element', () => {
      const tree = shallow((
        <Column
          column={{
            title: 'Test',
          }}
          className="custom-class"
        />
      ));

      expect(tree.is(`.${classes.column}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Column
          column={{
            title: 'Test',
          }}
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
