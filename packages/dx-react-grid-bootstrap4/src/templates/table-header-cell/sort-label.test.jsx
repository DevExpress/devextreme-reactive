import * as React from 'react';
import { shallow } from 'enzyme';
import { SortLabel } from './sort-label';

const defaultProps = {
  title: 'test',
  onSort: () => {},
};

describe('SortLabel', () => {
  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <SortLabel
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toEqual({ a: 1 });
  });

  it('should add custom class', () => {
    const tree = shallow((
      <SortLabel
        {...defaultProps}
        className="custom"
      />
    ));

    expect(tree.find('span.custom').exists())
      .toBeTruthy();
  });

  it('should not add the onClick and onKeyDown handlers if disabled is true', () => {
    const { onClick, onKeyDown } = shallow((
      <SortLabel
        {...defaultProps}
        disabled
      />
    )).props();

    expect(onClick).toBeUndefined();
    expect(onKeyDown).toBeUndefined();
  });
});

describe('Keyboard navigation', () => {
  const ENTER_KEY_CODE = 13;
  const SPACE_KEY_CODE = 32;

  it('can get focus', () => {
    const tree = shallow((
      <SortLabel
        {...defaultProps}
      />
    ));

    expect(tree.prop('tabIndex'))
      .toBe(0);
  });

  it('can not get focus if disabled is true', () => {
    const tree = shallow((
      <SortLabel
        {...defaultProps}
        disabled
      />
    ));

    expect(tree.prop('tabIndex'))
      .toBe(-1);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const onSort = jest.fn();
    const tree = shallow((
      <SortLabel
        {...defaultProps}
        onSort={onSort}
      />
    ));

    tree.simulate('click', { keyCode: ENTER_KEY_CODE, preventDefault: jest.fn() });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    tree.simulate('click', { keyCode: SPACE_KEY_CODE, preventDefault: jest.fn() });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    tree.simulate('click', { keyCode: 51 });
    expect(onSort)
      .not.toHaveBeenCalled();
  });

  it('should keep other sorting parameters on sorting change when the "Shift" key is pressed', () => {
    const onSort = jest.fn();
    const tree = shallow((
      <SortLabel
        {...defaultProps}
        onSort={onSort}
      />
    ));

    tree.simulate('click', { keyCode: ENTER_KEY_CODE, shiftKey: true, preventDefault: jest.fn() });
    expect(onSort)
      .toHaveBeenCalledWith({ keepOther: true, direction: undefined });
  });

  it('should handle the "Ctrl" key with sorting', () => {
    const onSort = jest.fn();
    const tree = shallow((
      <SortLabel
        {...defaultProps}
        onSort={onSort}
      />
    ));

    tree.simulate('click', { keyCode: ENTER_KEY_CODE, ctrlKey: true, preventDefault: jest.fn() });
    expect(onSort)
      .toHaveBeenCalledWith({ keepOther: true, direction: null });
  });
});
