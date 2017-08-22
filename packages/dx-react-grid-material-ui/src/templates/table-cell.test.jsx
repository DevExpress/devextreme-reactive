import React from 'react';
import { TableCell as TableCellMUI } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  let resetConsole;
  let mount;
  let classes;
  const mountTableCell = column => (
    mount(
      <TableCell
        column={column}
        value={'text'}
      />,
    )
  );
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
    classes = getClasses(<TableCell />);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should have correct text alignment', () => {
    let tree = mountTableCell({});
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeFalsy();

    tree = mountTableCell({ align: 'left' });
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeFalsy();

    tree = mountTableCell({ align: 'right' });
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeTruthy();
  });

  it('should have correct text', () => {
    const tree = mountTableCell({});
    expect(tree.find(TableCellMUI).text()).toBe('text');
  });
});
