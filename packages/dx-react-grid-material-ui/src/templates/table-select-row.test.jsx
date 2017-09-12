import React from 'react';
import { TableRow as TableRowMUI } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('TableSelectRow', () => {
  let resetConsole;
  let mount;

  const mountTableRow = ({ tableRow, changeSelected, selectByRowClick }) => (
    mount(
      <TableSelectRow
        tableRow={tableRow}
        changeSelected={changeSelected}
        selectByRowClick={selectByRowClick}
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
    let tree = mountTableRow({ tableRow: { selected: false } });
    expect(tree.find(TableRowMUI).prop('selected')).toBeFalsy();

    tree = mountTableRow({ tableRow: { selected: true } });
    expect(tree.find(TableRowMUI).prop('selected')).toBeTruthy();
  });

  it('should handle row click', () => {
    const changeSelectedMock = jest.fn();
    const tree = mountTableRow({ changeSelected: changeSelectedMock, selectByRowClick: true });

    tree.find(TableRowMUI).simulate('click');

    expect(changeSelectedMock).toBeCalled();
  });
});
