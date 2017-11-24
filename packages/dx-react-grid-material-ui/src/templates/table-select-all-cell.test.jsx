import React from 'react';
import { Checkbox, Table } from 'material-ui';
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
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        someSelected
      />
    ));

    expect(tree.find(Checkbox).prop('indeterminate'))
      .toBeTruthy();
  });

  it('should not fire the `onToggle` event on cell click if selection is not available', () => {
    const onToggle = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        disabled
        onToggle={onToggle}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  it('should fire the `onToggle` event on cell click if selection is available', () => {
    const onToggle = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        onToggle={onToggle}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(onToggle)
      .toHaveBeenCalledTimes(1);
  });
});
