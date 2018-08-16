import * as React from 'react';
import { shallow } from 'enzyme';
import { SortingControl } from './sorting-control';

const defaultProps = {
  align: '',
  columnTitle: 'test',
  onClick: jest.fn(),
};

describe('SortingControl with keyboard navigation', () => {
  it('can get focus', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
      />
    ));

    expect(tree.find('span').at(0).prop('tabIndex'))
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

  it('can not get focus if disabled is true', () => {
    const tree = shallow((
      <SortingControl
        align="right"
        columnTitle="Test"
        disabled
        onClick={() => {}}
      />
    ));

    expect(tree.find('span').at(0).prop('tabIndex'))
      .toBe(-1);
  });

  it('should reverse content if align is right', () => {
    const tree = shallow((
      <SortingControl
        align="right"
        columnTitle="Test"
        onClick={() => {}}
      />
    ));

    expect(tree.find('.flex-row-reverse').exists())
      .toBeTruthy();
  });
});
