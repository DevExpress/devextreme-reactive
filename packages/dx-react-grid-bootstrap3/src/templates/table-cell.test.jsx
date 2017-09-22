import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  const mountTableCell = column => (
    mount(
      <TableCell
        column={column}
        value={'text'}
      />,
    )
  );

  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should have correct text alignment', () => {
    let tree = mountTableCell({});
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = mountTableCell({ align: 'left' });
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = mountTableCell({ align: 'right' });
    expect(tree.find('td').prop('style').textAlign).toBe('right');
  });

  it('should have correct text', () => {
    const tree = mountTableCell({});
    expect(tree.find('td').text()).toBe('text');
  });

  it('should render children if passed', () => {
    const tree = mount(
      <TableCell>
        <span className="test" />
      </TableCell>,
    );

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
