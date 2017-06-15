import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should have correct text alignment', () => {
    let tree = mount(
      <TableCell
        column={{}}
      />,
    );
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = mount(
      <TableCell
        column={{ align: 'left' }}
      />,
    );
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = mount(
      <TableCell
        column={{ align: 'right' }}
      />,
    );
    expect(tree.find('td').prop('style').textAlign).toBe('right');
  });
});
