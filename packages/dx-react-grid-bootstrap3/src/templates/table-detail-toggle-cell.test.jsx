import React from 'react';
import { mount } from 'enzyme';
import { TableDetailToggleCell } from './table-detail-toggle-cell';

describe('TableDetailToggleCell', () => {
  it('can get focus', () => {
    const tree = mount((
      <TableDetailToggleCell />
    ));

    expect(tree.find('i').prop('tabIndex'))
      .toBe(0);
  });

  it('should handle the "Enter" key down', () => {
    const toggleExpanded = jest.fn();
    const tree = mount((
      <TableDetailToggleCell
        toggleExpanded={toggleExpanded}
      />
    ));

    tree.find('TableDetailToggleCell').simulate('keydown', { keyCode: 13 });
    expect(toggleExpanded)
      .toHaveBeenCalled();

    toggleExpanded.mockClear();
    tree.find('TableDetailToggleCell').simulate('keydown', { keyCode: 31 });
    expect(toggleExpanded)
      .not.toHaveBeenCalled();
  });
});
