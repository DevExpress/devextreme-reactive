import React from 'react';
import { mount } from 'enzyme';
import { Container } from './drag-drop';

describe('Container', () => {
  it('should have correct styles', () => {
    const tree = mount((
      <Container
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
      />
    ));

    expect(tree.find('ul').prop('style'))
      .toMatchObject({
        transform: 'translate(calc(10px - 50%), calc(20px - 50%))',
        cursor: 'move',
      });
  });
});
