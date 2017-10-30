import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'material-ui';
import { setupConsole } from '@devexpress/dx-testing';
import { TableDetailToggleCell } from './table-detail-toggle-cell';

describe('TableDetailToggleCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting', 'SheetsRegistry'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render IconButton', () => {
    const tree = mount((
      <Table><TableDetailToggleCell /></Table>
    ));

    expect(tree.find('IconButton').exists())
      .toBeTruthy();
  });

  it('should handle click', () => {
    const toggleExpanded = jest.fn();
    const tree = mount((
      <Table>
        <TableDetailToggleCell
          toggleExpanded={toggleExpanded}
        />
      </Table>
    ));

    tree.find('IconButton').simulate('click');
    expect(toggleExpanded)
      .toHaveBeenCalled();
  });
});
