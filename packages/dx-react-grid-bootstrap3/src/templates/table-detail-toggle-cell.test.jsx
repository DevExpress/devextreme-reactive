import React from 'react';
import { mount } from 'enzyme';
import { TableDetailToggleCell } from './table-detail-toggle-cell';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('TableDetailToggleCell', () => {
  it('can get focus', () => {
    const tree = mount((
      <TableDetailToggleCell />
    ));

    expect(tree.find('i').prop('tabIndex'))
      .toBe(0);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const toggleExpanded = jest.fn();
    const tree = mount((
      <TableDetailToggleCell
        toggleExpanded={toggleExpanded}
      />
    ));

    const targetElement = tree.find('i');
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE });
    expect(toggleExpanded)
      .toHaveBeenCalled();

    toggleExpanded.mockClear();
    targetElement.simulate('keydown', { keyCode: SPACE_KEY_CODE });
    expect(toggleExpanded)
      .toHaveBeenCalled();

    toggleExpanded.mockClear();
    targetElement.simulate('keydown', { keyCode: 51 });
    expect(toggleExpanded)
      .not.toHaveBeenCalled();
  });
});
