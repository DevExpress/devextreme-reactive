import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { Container } from './drag-drop';

describe('Container', () => {
  configure({ adapter: new Adapter() });
  it('should have correct styles', () => {
    const tree = mount(
      <Container
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
      />,
    );

    expect(tree.find('ul').prop('style'))
      .toMatchObject({
        transform: 'translate(calc(10px - 50%), calc(20px - 50%))',
        cursor: 'move',
      });
  });
});
