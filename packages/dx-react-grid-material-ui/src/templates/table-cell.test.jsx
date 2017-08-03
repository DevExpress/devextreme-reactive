import React from 'react';
import { TableCell as TableCellMUI } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { styleSheet, TableCell } from './table-cell';

describe('TableCell', () => {
  let resetConsole;
  let mount;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
    classes = getClasses(styleSheet);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should have correct text alignment', () => {
    let tree = mount(
      <TableCell
        column={{}}
      />,
    );
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeFalsy();

    tree = mount(
      <TableCell
        column={{ align: 'left' }}
      />,
    );
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeFalsy();

    tree = mount(
      <TableCell
        column={{ align: 'right' }}
      />,
    );
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeTruthy();
  });
});
