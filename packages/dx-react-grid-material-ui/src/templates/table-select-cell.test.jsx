import React from 'react';
import { Checkbox, Table } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectCell } from './table-select-cell';

describe('TableHeaderCell', () => {
  let mount;
  beforeAll(() => {
    setupConsole({ ignore: ['validateDOMNesting'] });
    const mountMUI = createMount();
    mount = component => mountMUI(<Table>{component}</Table>);
  });

  it('should call the `changeSelected` function on cell click if selection is available', () => {
    const changeSelected = jest.fn();
    const tree = mount((
      <TableSelectCell
        changeSelected={changeSelected}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(changeSelected)
      .toHaveBeenCalledTimes(1);
  });
});
