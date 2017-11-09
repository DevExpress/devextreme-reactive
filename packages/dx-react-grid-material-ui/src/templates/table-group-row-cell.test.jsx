import React from 'react';
import { createMount, createShallow } from 'material-ui/test-utils';
import { Table, TableCell } from 'material-ui';
import { setupConsole } from '@devexpress/dx-testing';
import { TableGroupCell } from './table-group-row-cell';

describe('TableCell', () => {
  let resetConsole;
  let mount;
  let shallow;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    const mountMUI = createMount();
    shallow = createShallow({ dive: true });
    mount = component => mountMUI(<Table>{component}</Table>);
  });

  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render column title and value', () => {
    const tree = mount((
      <TableGroupCell
        column={{ title: 'Title' }}
        row={{ value: 'Value' }}
      />
    ));

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should render children if passed', () => {
    const tree = mount((
      <TableGroupCell>
        <span className="test" />
      </TableGroupCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should render IconButton', () => {
    const tree = mount((
      <TableGroupCell />
    ));

    expect(tree.find('IconButton').exists())
      .toBeTruthy();
  });

  it('should expand grouped row on click', () => {
    const toggleGroupExpanded = jest.fn();
    const tree = shallow((
      <TableGroupCell
        toggleGroupExpanded={toggleGroupExpanded}
      />
    ));
    tree.find(TableCell).simulate('click');

    expect(toggleGroupExpanded)
      .toHaveBeenCalled();
  });
});
