import React from 'react';
import { Checkbox, TableCell, Table } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectAllCell } from './table-select-all-cell';

describe('TableHeaderCell', () => {
  let resetConsole;
  let mount;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    const mountMUI = createMount();
    mount = component => mountMUI(<Table>{component}</Table>);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render indeterminate state checkbox if the `someSelected` property is true', () => {
    const tree = mount(
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        someSelected
      />,
    );

    expect(tree.find(Checkbox).prop('indeterminate'))
      .toBeTruthy();
  });

  it('should not call the `toggleAll` function on cell click if selection is not available', () => {
    const toggleAll = jest.fn();
    const tree = mount(
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        toggleAll={toggleAll}
      />,
    );
    tree.find(TableCell).simulate('click');

    expect(toggleAll)
      .not.toHaveBeenCalled();
  });

  it('should call the `toggleAll` function on cell click if selection is available', () => {
    const toggleAll = jest.fn();
    const tree = mount(
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        selectionAvailable
        toggleAll={toggleAll}
      />,
    );
    tree.find(TableCell).simulate('click');

    expect(toggleAll)
      .toHaveBeenCalledTimes(1);
  });
});
