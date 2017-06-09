import React from 'react';
import { TableCell as TableCellMUI } from 'material-ui';
import { mountWithStyles, setupConsole } from '../utils/testing';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  test('should have correct text alignment', () => {
    let tree = mountWithStyles(
      <TableCell
        column={{}}
      />,
    );
    expect(tree.find(TableCellMUI).prop('style').textAlign).toBe('left');

    tree = mountWithStyles(
      <TableCell
        column={{ align: 'left' }}
      />,
    );
    expect(tree.find(TableCellMUI).prop('style').textAlign).toBe('left');

    tree = mountWithStyles(
      <TableCell
        column={{ align: 'right' }}
      />,
    );
    expect(tree.find(TableCellMUI).prop('style').textAlign).toBe('right');
  });
});
