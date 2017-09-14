import React from 'react';
import { TableRow as TableRowMUI } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('TableSelectRow', () => {
  let resetConsole;
  let mount;

  const mountTableRow = ({ selected, changeSelected, selectByRowClick }) => (
    mount(
      <TableSelectRow
        selected={selected}
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
    let tree = mountTableRow({ selected: false });
    expect(tree.find(TableRowMUI).prop('selected')).toBeFalsy();

    tree = mountTableRow({ selected: true });
    expect(tree.find(TableRowMUI).prop('selected')).toBeTruthy();
  });

  it('should handle row click', () => {
    const changeSelectedMock = jest.fn();
    const tree = mountTableRow({ changeSelected: changeSelectedMock, selectByRowClick: true });

    tree.find(TableRowMUI).simulate('click');

    expect(changeSelectedMock).toBeCalled();
  });
});
