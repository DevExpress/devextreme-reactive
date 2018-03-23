import * as React from 'react';
import { shallow } from 'enzyme';
import { SortingControl } from './sorting-control';

const defaultProps = {
  title: 'test',
  sort: () => {},
};

describe('SortingControl', () => {
  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toEqual({ a: 1 });
  });

  it('should add custom class', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        className="custom"
      />
    ));

    expect(tree.find('span.dx-rg-bs4-sorting-control').exists())
      .toBeTruthy();
    expect(tree.find('span.custom').exists())
      .toBeTruthy();
  });
});

describe('TableHeaderCell with keyboard navigation', () => {
  const ENTER_KEY_CODE = 13;
  const SPACE_KEY_CODE = 32;

  it('can get focus', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
      />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(0);
  });

  it('can not get focus if disabled is true', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        disabled
      />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(-1);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const sort = jest.fn();
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        sort={sort}
      />
    ));

    const targetElement = tree.find('span');
    targetElement.simulate('click', { keyCode: ENTER_KEY_CODE, preventDefault: jest.fn() });
    expect(sort)
      .toHaveBeenCalled();

    sort.mockClear();
    targetElement.simulate('click', { keyCode: SPACE_KEY_CODE, preventDefault: jest.fn() });
    expect(sort)
      .toHaveBeenCalled();

    sort.mockClear();
    targetElement.simulate('click', { keyCode: 51 });
    expect(sort)
      .not.toHaveBeenCalled();
  });

  it('should keep other sorting parameters on sorting change when the "Shift" key is pressed', () => {
    const sort = jest.fn();
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        sort={sort}
      />
    ));

    const targetElement = tree.find('span');
    targetElement.simulate('click', { keyCode: ENTER_KEY_CODE, shiftKey: true, preventDefault: jest.fn() });
    expect(sort)
      .toHaveBeenCalledWith({ keepOther: true, direction: undefined });
  });

  it('should handle the "Ctrl" key with sorting', () => {
    const sort = jest.fn();
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        sort={sort}
      />
    ));

    const targetElement = tree.find('span');
    targetElement.simulate('click', { keyCode: ENTER_KEY_CODE, ctrlKey: true, preventDefault: jest.fn() });
    expect(sort)
      .toHaveBeenCalledWith({ keepOther: true, direction: null });
  });
});
