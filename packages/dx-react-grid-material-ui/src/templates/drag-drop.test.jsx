import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Container, Column, classes } from './drag-drop';

describe('DragDrop', () => {
  describe('Container', () => {
    let shallow;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
    });

    it('should have correct styles', () => {
      const tree = shallow((
        <Container
          clientOffset={{ x: 10, y: 20 }}
        />
      ));

      expect(tree.find('div').hasClass(classes.container))
        .toBeTruthy();
    });

    it('should apply custom styles', () => {
      const tree = shallow((
        <Container
          clientOffset={{ x: 10, y: 20 }}
          style={{ color: 'red' }}
        />
      ));

      expect(tree.find('div').prop('style'))
        .toMatchObject({
          transform: 'translate(calc(10px - 50%), calc(20px - 50%))',
          msTransform: 'translateX(10px) translateX(-50%) translateY(20px) translateY(-50%)',
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
    beforeAll(() => {
      shallow = createShallow({ dive: true });
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
