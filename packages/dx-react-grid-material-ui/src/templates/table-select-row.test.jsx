import React from 'react';
import { TableRow as TableRowMUI } from 'material-ui/Table';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('TableSelectRow', () => {
  let resetConsole;
  let mount;
  const defaultProps = {
    selected: false,
    selectByRowClick: false,
    onToggle: () => {},
  };

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should have correct selected prop', () => {
    let tree = mount(<TableSelectRow
      {...defaultProps}
    />);
    expect(tree.find(TableRowMUI).prop('selected')).toBeFalsy();

    tree = mount(<TableSelectRow
      {...defaultProps}
      selected
    />);
    expect(tree.find(TableRowMUI).prop('selected')).toBeTruthy();
  });

  it('should handle row click', () => {
    const onToggleMock = jest.fn();
    const tree = mount(<TableSelectRow
      {...defaultProps}
      onToggle={onToggleMock}
      selectByRowClick
    />);

    tree.find(TableRowMUI).simulate('click');
    expect(onToggleMock).toBeCalled();
  });
});
