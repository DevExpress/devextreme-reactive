import React from 'react';
import { TableCell, TableSortLabel } from 'material-ui';
import { createMount, createShallow, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DragDropProvider, DragSource } from '@devexpress/dx-react-core';
import { TableHeaderCell } from './table-header-cell';
import { SortingControl } from './table-header-cell/sorting-control';
import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';

jest.mock('./table-header-cell/grouping-control', () => ({
  GroupingControl: jest.fn(),
}));

const defaultProps = {
  getMessage: key => key,
};

describe('TableHeaderCell', () => {
  let resetConsole;
  let mount;
  let shallow;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting', 'SheetsRegistry'] });
    classes = getClasses(<TableHeaderCell {...defaultProps} />);
    mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
    shallow = createShallow({ dive: true });
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
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
        {...defaultProps}
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find(`.${classes.plainTitle}`).text()).toBe('Test');
  });

  it('should cancel sorting by using the Ctrl key', () => {
    const onSort = jest.fn();
    const tree = mount((
      <TableHeaderCell
        {...defaultProps}
        column={{ name: 'Test' }}
        onSort={onSort}
        showSortingControls
      />
    ));

    tree.find(TableSortLabel).simulate('click', { ctrlKey: true });

    expect(onSort.mock.calls).toHaveLength(1);
    expect(onSort.mock.calls[0][0].direction).toBe(null);
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
      />
    ));

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeFalsy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeFalsy();
  });

  it('should have correct styles when sorting is allowed', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        column={{ name: 'a' }}
        showSortingControls
      />
    ));

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
  });

  it('should have correct styles when dragging is allowed', () => {
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          {...defaultProps}
          draggingEnabled
        />
      </DragDropProvider>
    ));

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeTruthy();
  });

  it('should have correct styles while dragging', () => {
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          {...defaultProps}
          draggingEnabled
        />
      </DragDropProvider>
    ));

    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    tree.update();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    tree.update();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();
  });

  it('should render resize control if resize allowed', () => {
    const onWidthChange = () => {};
    const onDraftWidthChange = () => {};
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        resizingEnabled
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

  it('should pass correct text to SortingControl', () => {
    const tree = mount((
      <TableHeaderCell
        {...defaultProps}
        showSortingControls
        tableColumn={{ align: 'right' }}
        column={{ title: 'test' }}
      />
    ));

    const tooltip = tree.find('Tooltip');
    expect(tooltip.exists())
      .toBeTruthy();
    expect(tooltip.prop('title'))
      .toBe('sortingHint');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        className="custom-class"
        column={{ title: 'a' }}
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        data={{ a: 1 }}
        column={{ title: 'a' }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  describe('with keyboard navigation', () => {
    const ENTER_KEY_CODE = 13;
    const SPACE_KEY_CODE = 32;

    it('can not get focus if sorting is not allow', () => {
      const tree = mount((
        <TableHeaderCell
          {...defaultProps}
          column={{ title: 'text' }}
        />
      ));

      expect(tree.find(SortingControl).exists())
        .not.toBeTruthy();
    });

    it('can get focus if sorting is allow', () => {
      const tree = mount((
        <TableHeaderCell
          {...defaultProps}
          column={{ title: 'text' }}
          showSortingControls
        />
      ));

      expect(tree.find(SortingControl).exists())
        .toBeTruthy();
    });

    it('should handle the "Enter" and "Space" keys down', () => {
      const onSort = jest.fn();
      const tree = mount((
        <TableHeaderCell
          {...defaultProps}
          onSort={onSort}
          column={{ title: 'text' }}
          showSortingControls
        />
      ));
      const SortLabel = tree.find(TableSortLabel);

      SortLabel.simulate('keydown', { keyCode: ENTER_KEY_CODE });
      expect(onSort)
        .toHaveBeenCalled();

      onSort.mockClear();
      SortLabel.simulate('keydown', { keyCode: SPACE_KEY_CODE });
      expect(onSort)
        .toHaveBeenCalled();

      onSort.mockClear();
      SortLabel.simulate('keydown', { keyCode: 51 });
      expect(onSort)
        .not.toHaveBeenCalled();
    });

    it('should keep other sorting parameters on sorting change when the "Shift" key is pressed', () => {
      const onSort = jest.fn();
      const tree = mount((
        <TableHeaderCell
          {...defaultProps}
          onSort={onSort}
          column={{ title: 'text' }}
          showSortingControls
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', { keyCode: ENTER_KEY_CODE, shiftKey: true });
      expect(onSort)
        .toHaveBeenCalledWith({ keepOther: true, cancel: undefined });
    });

    it('should handle the "Ctrl" key with sorting', () => {
      const onSort = jest.fn();
      const tree = mount((
        <TableHeaderCell
          {...defaultProps}
          onSort={onSort}
          column={{ title: 'text' }}
          showSortingControls
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true });
      expect(onSort)
        .toHaveBeenCalledWith({ keepOther: true, direction: null });
    });
  });
});
