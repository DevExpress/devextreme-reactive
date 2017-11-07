import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableDetailToggleCell } from './table-detail-toggle-cell';

describe('TableDetailToggleCell', () => {
  let resetConsole;
  let mount;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting', 'SheetsRegistry'] });
    mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render IconButton', () => {
    const tree = mount((
      <TableDetailToggleCell />
    ));

    expect(tree.find('IconButton').exists())
      .toBeTruthy();
  });

  it('should handle click', () => {
    const toggleExpanded = jest.fn();
    const tree = mount((
      <TableDetailToggleCell
        toggleExpanded={toggleExpanded}
      />
    ));

    tree.find('IconButton').simulate('click');
    expect(toggleExpanded)
      .toHaveBeenCalled();
  });
});
