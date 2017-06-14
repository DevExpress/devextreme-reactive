import React from 'react';
import { TableCell as TableCellMUI } from 'material-ui';
import { format } from 'util';
import { setupConsole } from '@devexpress/dx-core';
import { mountWithStyles } from '../utils/testing';
import { styleSheet, TableCell } from './table-cell';

describe('TableCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'], formatOutput: format });
  });

  afterAll(() => {
    resetConsole();
  });

  test('should have correct text alignment', () => {
    let mounted = mountWithStyles(
      <TableCell
        column={{}}
      />,
      styleSheet,
    );
    expect(mounted.tree.find(TableCellMUI).hasClass(mounted.classes.cellRightAlign)).toBeFalsy();

    mounted = mountWithStyles(
      <TableCell
        column={{ align: 'left' }}
      />,
      styleSheet,
    );
    expect(mounted.tree.find(TableCellMUI).hasClass(mounted.classes.cellRightAlign)).toBeFalsy();

    mounted = mountWithStyles(
      <TableCell
        column={{ align: 'right' }}
      />,
      styleSheet,
    );
    expect(mounted.tree.find(TableCellMUI).hasClass(mounted.classes.cellRightAlign)).toBeTruthy();
  });
});
