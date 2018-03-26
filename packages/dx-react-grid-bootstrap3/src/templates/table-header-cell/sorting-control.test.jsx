import * as React from 'react';
import { mount } from 'enzyme';

import { SortingControl } from './sorting-control';

const defaultProps = {
  title: 'test',
  onSort: () => {},
};

describe('SortingControl', () => {
  it('should spread rest props to the root element', () => {
    const tree = mount((
      <SortingControl
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toEqual({ a: 1 });
  });

  it('should add custom styles', () => {
    const tree = mount((
      <SortingControl
        {...defaultProps}
        style={{ color: 'red' }}
      />
    ));

    expect(tree.find('span').props().style)
      .toMatchObject({
        cursor: 'pointer',
        color: 'red',
      });
  });
});

describe('with keyboard navigation', () => {
  const ENTER_KEY_CODE = 13;
  const SPACE_KEY_CODE = 32;

  it('can get focus', () => {
    const tree = mount((
      <SortingControl
        {...defaultProps}
      />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(0);
  });

  it('can not get focus if disabled is true', () => {
    const tree = mount((
      <SortingControl
        {...defaultProps}
        disabled
      />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(-1);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const onSort = jest.fn();
    const tree = mount((
      <SortingControl
        {...defaultProps}
        onSort={onSort}
      />
    ));

    const targetElement = tree.find('SortingControl');
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    targetElement.simulate('keydown', { keyCode: SPACE_KEY_CODE });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    targetElement.simulate('keydown', { keyCode: 51 });
    expect(onSort)
      .not.toHaveBeenCalled();
  });

  it('should keep other sorting parameters on sorting change when the "Shift" key is pressed', () => {
    const onSort = jest.fn();
    const tree = mount((
      <SortingControl
        {...defaultProps}
        onSort={onSort}
      />
    ));

    const targetElement = tree.find('SortingControl');
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, shiftKey: true });
    expect(onSort)
      .toHaveBeenCalledWith({ keepOther: true, direction: undefined });
  });

  it('should handle the "Ctrl" key with sorting', () => {
    const onSort = jest.fn();
    const tree = mount((
      <SortingControl
        {...defaultProps}
        onSort={onSort}
      />
    ));

    const targetElement = tree.find('SortingControl');
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true });
    expect(onSort)
      .toHaveBeenCalledWith({ keepOther: true, direction: null });
  });
});
