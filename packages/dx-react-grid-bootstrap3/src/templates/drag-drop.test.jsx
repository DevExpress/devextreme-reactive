import React from 'react';
import { shallow } from 'enzyme';
import { Container, Column } from './drag-drop';

describe('Container', () => {
  it('should have correct styles', () => {
    const tree = shallow((
      <Container
        clientOffset={{ x: 10, y: 20 }}
        columns={[{
          name: 'Test',
        }]}
        columnTemplate={() => <div />}
      />
    ));

    expect(tree.find('ul').prop('style'))
      .toMatchObject({
        transform: 'translate(calc(10px - 50%), calc(20px - 50%))',
        cursor: 'move',
      });
  });

  it('should apply custom styles', () => {
    const tree = shallow((
      <Container
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
        style={{ color: 'red' }}
      />
    ));

    expect(tree.find('ul').prop('style'))
      .toMatchObject({
        transform: 'translate(calc(10px - 50%), calc(20px - 50%))',
        color: 'red',
      });
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Container
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
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
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
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
