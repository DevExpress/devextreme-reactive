import React from 'react';
import { mount, shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';

jest.mock('./table-header-cell/grouping-control', () => ({
  GroupingControl: jest.fn(),
}));

describe('TableHeaderCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    GroupingControl.mockImplementation(() => null);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should use column name if title is not specified', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find('th > div').text()).toBe('Test');
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
      />
    ));

    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
      });

    expect(tree.find('th').prop('style').cursor)
      .toBeUndefined();
  });

  it('should have correct styles when sorting is allowed', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ name: 'a' }}
        allowSorting
      />
    ));

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'pointer',
      });
  });

  it('should have correct styles when dragging is allowed', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
        allowDragging
      />
    ));

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'pointer',
      });
  });

  it('should have correct styles in the "draft" mode', () => {
    const tree = mount((
      <TableHeaderCell
        column={{}}
        draft
      />
    ));

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        opacity: 0.3,
      });
  });

  it('should render resize control if resize allowed', () => {
    const onWidthChange = () => {};
    const onDraftWidthChange = () => {};
    const tree = shallow((
      <TableHeaderCell
        column={{}}
        allowResizing
        onDraftWidthChange={onDraftWidthChange}
        onWidthChange={onWidthChange}
      />
    ));

    expect(tree.find(ResizingControl).exists())
      .toBeTruthy();
    expect(tree.find(ResizingControl).prop('onDraftWidthChange'))
      .toBe(onDraftWidthChange);
    expect(tree.find(ResizingControl).prop('onWidthChange'))
      .toBe(onWidthChange);
  });

  it('should have correct styles when grouping by click is not allowed and column align is left', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
        showGroupingControls={false}
      />
    ));
    expect(tree.find('th > div').prop('style'))
      .toMatchObject({
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });

  it('should have correct styles when grouping by click is allowed and column align is left', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
        showGroupingControls
      />
    ));
    expect(tree.find('th > div').prop('style'))
      .toMatchObject({
        textAlign: 'left',
        marginRight: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });

  it('should have correct styles when grouping by click is not allowed and column align is right', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ align: 'right' }}
        showGroupingControls={false}
      />
    ));
    expect(tree.find('th > div').prop('style'))
      .toMatchObject({
        textAlign: 'right',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });

  it('should have correct styles when grouping by click is allowed and column align is right', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ align: 'right' }}
        showGroupingControls
      />
    ));
    expect(tree.find('th > div').prop('style'))
      .toMatchObject({
        textAlign: 'right',
        marginLeft: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ title: 'a' }}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  describe('with keyboard navigation', () => {
    const ENTER_KEY_CODE = 13;
    const SPACE_KEY_CODE = 32;

    it('should handle the "Enter" and "Space" keys down', () => {
      const onSort = jest.fn();
      const tree = mount((
        <TableHeaderCell
          onSort={onSort}
          column={{ align: 'right', title: 'test' }}
          allowSorting
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
        <TableHeaderCell
          onSort={onSort}
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));

      const targetElement = tree.find('SortingControl');
      targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, shiftKey: true });
      expect(onSort)
        .toHaveBeenCalledWith({ keepOther: true, cancel: undefined });
    });

    it('should handle the "Ctrl" key with sorting', () => {
      const onSort = jest.fn();
      const tree = mount((
        <TableHeaderCell
          onSort={onSort}
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));

      const targetElement = tree.find('SortingControl');
      targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true });
      expect(onSort)
        .toHaveBeenCalledWith({ keepOther: true, cancel: true });
    });
  });
});
