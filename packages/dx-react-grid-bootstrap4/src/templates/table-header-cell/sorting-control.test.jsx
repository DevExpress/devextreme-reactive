import * as React from 'react';
import { shallow } from 'enzyme';
import { SortingControl } from './sorting-control';

const defaultProps = {
  align: '',
  columnTitle: 'test',
  onClick: jest.fn(),
};

describe('TableHeaderCell with keyboard navigation', () => {
  it('can get focus', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
      />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(0);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const onClick = jest.fn();
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        onClick={onClick}
      />
    ));

    tree.simulate('keydown');
    expect(onClick)
      .toHaveBeenCalled();
  });
});
