import React from 'react';
import { TableCell } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DragDropContext, DragSource } from '@devexpress/dx-react-core';
import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';

jest.mock('./table-header-cell/grouping-control', () => ({
  GroupingControl: jest.fn(),
}));

describe('TableHeaderCell', () => {
  let resetConsole;
  let mount;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting', 'SheetsRegistry'] });
    classes = getClasses(<TableHeaderCell column={{}} />);
    mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
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

    tree.find(TableHeaderCell).simulate('click', { ctrlKey: true });

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
    expect(tree.find(TableCell).hasClass(classes.cellClickable)).toBeFalsy();
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
    expect(tree.find(TableCell).hasClass(classes.cellClickable)).toBeTruthy();
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

  it('should have correct offset when grouping by click is not allowed and column align is left', () => {
    const tree = mount((
      <TableHeaderCell
        column={{}}
        allowGroupingByClick={false}
      />
    ));

    expect(tree.find(`.${classes.titleLeftOffset}`)).toHaveLength(0);
    expect(tree.find(`.${classes.titleRightOffset}`)).toHaveLength(0);
    expect(tree.find(`.${classes.titleLeft}`)).toHaveLength(1);
    expect(tree.find(`.${classes.titleRight}`)).toHaveLength(0);
  });

  it('should have correct offset when grouping by click is allowed column align is left', () => {
    const tree = mount((
      <TableHeaderCell
        column={{}}
        allowGroupingByClick
      />
    ));

    expect(tree.find(`.${classes.titleLeftOffset}`)).toHaveLength(1);
    expect(tree.find(`.${classes.titleRightOffset}`)).toHaveLength(0);
    expect(tree.find(`.${classes.titleLeft}`)).toHaveLength(1);
    expect(tree.find(`.${classes.titleRight}`)).toHaveLength(0);
  });

  it('should have correct offset when grouping by click is not allowed and column align is right', () => {
    const tree = mount((
      <TableHeaderCell
        column={{ align: 'right' }}
        allowGroupingByClick={false}
      />
    ));

    expect(tree.find(`.${classes.titleLeftOffset}`)).toHaveLength(0);
    expect(tree.find(`.${classes.titleRightOffset}`)).toHaveLength(0);
    expect(tree.find(`.${classes.titleLeft}`)).toHaveLength(0);
    expect(tree.find(`.${classes.titleRight}`)).toHaveLength(1);
  });

  it('should have correct offset when grouping by click is allowed column align is right', () => {
    const tree = mount((
      <TableHeaderCell
        column={{ align: 'right' }}
        allowGroupingByClick
      />
    ));

    expect(tree.find(`.${classes.titleLeftOffset}`)).toHaveLength(0);
    expect(tree.find(`.${classes.titleRightOffset}`)).toHaveLength(1);
    expect(tree.find(`.${classes.titleLeft}`)).toHaveLength(0);
    expect(tree.find(`.${classes.titleRight}`)).toHaveLength(1);
  });
});
