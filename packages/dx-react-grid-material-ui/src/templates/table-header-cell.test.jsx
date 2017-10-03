import React from 'react';
import { TableCell, Table } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DragDropContext, DragSource } from '@devexpress/dx-react-core';
import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';

describe('TableHeaderCell', () => {
  let resetConsole;
  let mount;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
    classes = getClasses(<TableHeaderCell column={{}} />);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should use column name if title is not specified', () => {
    const tree = mount(
      <Table>
        <TableHeaderCell
          column={{
            name: 'Test',
          }}
        />
      </Table>,
    );

    expect(tree.find(`.${classes.plainTitle}`).text()).toBe('Test');
  });

  it('should cancel sorting by using the Ctrl key', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount(
      <Table>
        <TableHeaderCell
          column={{
            name: 'Test',
          }}
          changeSortingDirection={changeSortingDirection}
          allowSorting
        />
      </Table>,
    );

    tree.find(TableHeaderCell).simulate('click', { ctrlKey: true });

    expect(changeSortingDirection.mock.calls).toHaveLength(1);
    expect(changeSortingDirection.mock.calls[0][0].cancel).toBeTruthy();
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = mount(
      <Table>
        <TableHeaderCell
          column={{}}
        />
      </Table>,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeFalsy();
    expect(tree.find(TableCell).hasClass(classes.cellClickable)).toBeFalsy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeFalsy();
  });

  it('should have correct styles when sorting is allowed', () => {
    const tree = mount(
      <Table>
        <TableHeaderCell
          column={{ name: 'a' }}
          allowSorting
        />
      </Table>,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellClickable)).toBeTruthy();
  });

  it('should have correct styles when dragging is allowed', () => {
    const tree = mount(
      <DragDropContext>
        <Table>
          <TableHeaderCell
            column={{}}
            allowDragging
          />
        </Table>
      </DragDropContext>,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeTruthy();
  });

  it('should have correct styles while dragging', () => {
    const tree = mount(
      <DragDropContext>
        <Table>
          <TableHeaderCell
            column={{}}
            allowDragging
          />
        </Table>
      </DragDropContext>,
    );

    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();
  });

  it('should render resize control if resize allowed', () => {
    const changeColumnWidth = () => {};
    const changeDraftColumnWidth = () => {};
    const tree = mount(
      <Table>
        <TableHeaderCell
          column={{}}
          allowResizing
          changeDraftColumnWidth={changeDraftColumnWidth}
          changeColumnWidth={changeColumnWidth}
        />
      </Table>,
    );

    expect(tree.find(ResizingControl).exists())
      .toBeTruthy();
    expect(tree.find(ResizingControl).prop('changeDraftColumnWidth'))
      .toBe(changeDraftColumnWidth);
    expect(tree.find(ResizingControl).prop('changeColumnWidth'))
      .toBe(changeColumnWidth);
  });
});
