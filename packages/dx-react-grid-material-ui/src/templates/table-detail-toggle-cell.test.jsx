import React from 'react';
import { mount } from 'enzyme';
import { TableDetailToggleCell } from './table-detail-toggle-cell';

describe('TableDetailToggleCell', () => {
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
