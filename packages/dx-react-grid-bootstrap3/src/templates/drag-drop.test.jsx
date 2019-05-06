import * as React from 'react';
import { shallow } from 'enzyme';
import { Container, Column } from './drag-drop';

describe('Container', () => {
  it('should have correct styles', () => {
    const tree = shallow((
      <Container
        clientOffset={{ x: 10, y: 20 }}
      />
    ));

    expect(tree.find('ul').prop('style'))
      .toMatchObject({
        transform: 'translate(calc(10px - 50%), calc(20px - 50%))',
        msTransform: 'translateX(10px) translateX(-50%) translateY(20px) translateY(-50%)',
        cursor: 'move',
      });
  });

  it('should apply custom styles', () => {
    const tree = shallow((
      <Container
        clientOffset={{ x: 10, y: 20 }}
        style={{ color: 'red' }}
      />
    ));

    expect(tree.find('ul').prop('style'))
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

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is('.list-group'))
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
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Column
        column={{
          title: 'Test',
        }}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is('.list-group-item'))
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
