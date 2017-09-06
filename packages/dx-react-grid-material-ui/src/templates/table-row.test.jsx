import React from 'react';
import { TableRow as TableRowMUI } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableRow } from './table-row';

describe('TableRow', () => {
  let resetConsole;
  let mount;

  const mountTableCell = ({ tableRow }) => (
    mount(
      <TableRow
        tableRow={tableRow}
      />,
    )
  );
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should have correct selected prop', () => {
    let tree = mountTableCell({ tableRow: { } });
    expect(tree.find(TableRowMUI).prop('selected')).toBeFalsy();

    tree = mountTableCell({ tableRow: { selected: true } });
    expect(tree.find(TableRowMUI).prop('selected')).toBeTruthy();
  });
});
