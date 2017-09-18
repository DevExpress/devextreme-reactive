import React from 'react';
import { TableRow as TableRowMUI } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectRow } from './table-select-row';

describe('TableSelectRow', () => {
  let resetConsole;
  let mount;
  const defaultProps = {
    selected: false,
    selectByRowClick: false,
    changeSelected: () => {},
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
    const changeSelectedMock = jest.fn();
    const tree = mount(<TableSelectRow
      {...defaultProps}
      changeSelected={changeSelectedMock}
      selectByRowClick
    />);

    tree.find(TableRowMUI).simulate('click');
    expect(changeSelectedMock).toBeCalled();
  });
});
