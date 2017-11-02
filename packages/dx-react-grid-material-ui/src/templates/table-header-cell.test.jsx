import React from 'react';
import { TableCell, TableSortLabel } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole, mockRaf } from '@devexpress/dx-testing';
import { DragDropContext, DragSource } from '@devexpress/dx-react-core';
import { TableHeaderCell } from './table-header-cell';
import { SortingControl } from './table-header-cell/sorting-control';
import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';

jest.mock('./table-header-cell/grouping-control', () => ({
  GroupingControl: jest.fn(),
}));

describe('TableHeaderCell', () => {
  let resetConsole;
  let mount;
  let classes;
  let resetRaf;
  beforeAll(() => {
    resetRaf = mockRaf();
    resetConsole = setupConsole({ ignore: ['validateDOMNesting', 'SheetsRegistry'] });
    classes = getClasses(<TableHeaderCell column={{}} />);
    mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
  });
  afterAll(() => {
    resetRaf();
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
    const tree = mount((
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find(`.${classes.plainTitle}`).text()).toBe('Test');
  });

  it('should cancel sorting by using the Ctrl key', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
        changeSortingDirection={changeSortingDirection}
        allowSorting
      />
    ));

    tree.find('TableSortLabel').simulate('click', { ctrlKey: true });

    expect(changeSortingDirection.mock.calls).toHaveLength(1);
    expect(changeSortingDirection.mock.calls[0][0].cancel).toBeTruthy();
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = mount((
      <TableHeaderCell
        column={{}}
      />
    ));

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeFalsy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeFalsy();
  });

  it('should have correct styles when sorting is allowed', () => {
    const tree = mount((
      <TableHeaderCell
        column={{ name: 'a' }}
        allowSorting
      />
    ));

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
  });

  it('should have correct styles when dragging is allowed', () => {
    const tree = mount((
      <DragDropContext>
        <TableHeaderCell
          column={{}}
          allowDragging
        />
      </DragDropContext>
    ));

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeTruthy();
  });

  it('should have correct styles while dragging', () => {
    const tree = mount((
      <DragDropContext>
        <TableHeaderCell
          column={{}}
          allowDragging
        />
      </DragDropContext>
    ));

    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();
  });

  it('should render resize control if resize allowed', () => {
    const changeColumnWidth = () => {};
    const changeDraftColumnWidth = () => {};
    const tree = mount((
      <TableHeaderCell
        column={{}}
        allowResizing
        changeDraftColumnWidth={changeDraftColumnWidth}
        changeColumnWidth={changeColumnWidth}
      />
    ));

    expect(tree.find(ResizingControl).exists())
      .toBeTruthy();
    expect(tree.find(ResizingControl).prop('changeDraftColumnWidth'))
      .toBe(changeDraftColumnWidth);
    expect(tree.find(ResizingControl).prop('changeColumnWidth'))
      .toBe(changeColumnWidth);
  });

  describe('with keyboard navigation', () => {
    const ENTER_KEY_CODE = 13;
    const SPACE_KEY_CODE = 32;

    it('can not get focus if sorting is not allow', () => {
      const tree = mount((
        <TableHeaderCell
          column={{ align: 'right', title: 'test' }}
        />
      ));

      expect(tree.find(SortingControl).exists())
        .not.toBeTruthy();
    });

    it('can get focus if sorting is allow', () => {
      const tree = mount((
        <TableHeaderCell
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));

      expect(tree.find(SortingControl).exists())
        .toBeTruthy();
    });

    it('should handle the "Enter" and "Space" keys down', () => {
      const changeSortingDirection = jest.fn();
      const tree = mount((
        <TableHeaderCell
          changeSortingDirection={changeSortingDirection}
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));
      const SortLabel = tree.find(TableSortLabel);

      SortLabel.simulate('keydown', { keyCode: ENTER_KEY_CODE });
      expect(changeSortingDirection)
        .toHaveBeenCalled();

      changeSortingDirection.mockClear();
      SortLabel.simulate('keydown', { keyCode: SPACE_KEY_CODE });
      expect(changeSortingDirection)
        .toHaveBeenCalled();

      changeSortingDirection.mockClear();
      SortLabel.simulate('keydown', { keyCode: 51 });
      expect(changeSortingDirection)
        .not.toHaveBeenCalled();
    });

    it('should handle the "Shift" key with sorting', () => {
      const changeSortingDirection = jest.fn();
      const tree = mount((
        <TableHeaderCell
          changeSortingDirection={changeSortingDirection}
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', { keyCode: ENTER_KEY_CODE, shiftKey: true });
      expect(changeSortingDirection)
        .toHaveBeenCalledWith({ keepOther: true, cancel: false });
    });

    it('should handle the "Ctrl" key with sorting', () => {
      const changeSortingDirection = jest.fn();
      const tree = mount((
        <TableHeaderCell
          changeSortingDirection={changeSortingDirection}
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true });
      expect(changeSortingDirection)
        .toHaveBeenCalledWith({ keepOther: true, cancel: true });
    });

    it('should switch sorting derection when "Enter" key down', () => {
      const changeSortingDirection = jest.fn();
      const tree = mount((
        <TableHeaderCell
          changeSortingDirection={changeSortingDirection}
          column={{ align: 'right', title: 'test' }}
          allowSorting
          sortingDirection="desc"
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: false });
      expect(changeSortingDirection)
        .toHaveBeenCalledWith({ keepOther: false, cancel: true });
    });
  });
});
