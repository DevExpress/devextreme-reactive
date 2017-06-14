import React from 'react';
import { mount } from 'enzyme';
import { format } from 'util';
import { setupConsole } from '@devexpress/dx-core/';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'], formatOutput: format });
  });

  afterAll(() => {
    resetConsole();
  });

  test('should have correct text alignment', () => {
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
