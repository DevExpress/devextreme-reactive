import React from 'react';
import { mount, shallow } from 'enzyme';
import { TableDetailToggleCell } from './table-detail-toggle-cell';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('TableDetailToggleCell', () => {
  it('should handle click with stopPropagation', () => {
    const toggleExpanded = jest.fn();
    const mockEvent = {
      stopPropagation: jest.fn(),
    };
    const tree = shallow((
      <TableDetailToggleCell
        toggleExpanded={toggleExpanded}
      />
    ));

    const buttonClickHandler = tree.find('td').prop('onClick');

    buttonClickHandler(mockEvent);
    expect(toggleExpanded)
      .toHaveBeenCalled();
    expect(mockEvent.stopPropagation)
      .toHaveBeenCalled();
  });

  it('can get focus', () => {
    const tree = shallow((
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
