import React from 'react';
import { TableCell } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DragDropContext, DragSource, Draggable } from '@devexpress/dx-react-core';
import { TableHeaderCell } from './table-header-cell';

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
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find(`.${classes.plainTitle}`).text()).toBe('Test');
  });

  it('should cancel sorting by using the Ctrl key', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount(
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
        changeSortingDirection={changeSortingDirection}
        allowSorting
      />,
    );

    tree.simulate('click', { ctrlKey: true });

    expect(changeSortingDirection.mock.calls).toHaveLength(1);
    expect(changeSortingDirection.mock.calls[0][0].cancel).toBeTruthy();
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = mount(
      <TableHeaderCell
        column={{}}
      />,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeFalsy();
    expect(tree.find(TableCell).hasClass(classes.cellClickable)).toBeFalsy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeFalsy();
  });

  it('should have correct styles when sorting is allowed', () => {
    const tree = mount(
      <TableHeaderCell
        column={{}}
        allowSorting
      />,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellClickable)).toBeTruthy();
  });

  it('should have correct styles when dragging is allowed', () => {
    const tree = mount(
      <DragDropContext>
        <TableHeaderCell
          column={{}}
          allowDragging
        />
      </DragDropContext>,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeTruthy();
  });

  it('should have correct styles while dragging', () => {
    const tree = mount(
      <DragDropContext>
        <TableHeaderCell
          column={{}}
          allowDragging
        />
      </DragDropContext>,
    );

    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();
  });

  describe('resizing', () => {
    it('should have correct styles while resizing', () => {
      const tree = mount(
        <TableHeaderCell
          column={{}}
          allowResizing
          changeColumnWidth={() => {}}
        />,
      );

      const handle = tree.find(`.${classes.resizeHandle}`);
      expect(handle.exists()).toBeTruthy();

      tree.find(Draggable).prop('onStart')({ x: 0, y: 0 });
      expect(handle.hasClass(classes.resizeHandleActive)).toBeTruthy();

      tree.find(Draggable).prop('onEnd')({ x: 0, y: 0 });
      expect(handle.hasClass(classes.resizeHandleActive)).toBeFalsy();
    });

    it('should trigger changeColumnWidth with correct change on resize end', () => {
      const changeColumnWidth = jest.fn();
      const tree = mount(
        <TableHeaderCell
          column={{}}
          allowResizing
          changeColumnWidth={changeColumnWidth}
        />,
      );

      tree.find(Draggable).prop('onStart')({ x: 0 });

      tree.find(Draggable).prop('onEnd')({ x: 10 });
      expect(changeColumnWidth)
        .toBeCalledWith({ shift: 10 });
    });

    it('should trigger changeDraftColumnWidth with correct change on resize update', () => {
      const changeDraftColumnWidth = jest.fn();
      const tree = mount(
        <TableHeaderCell
          column={{}}
          allowResizing
          changeDraftColumnWidth={changeDraftColumnWidth}
        />,
      );

      tree.find(Draggable).prop('onStart')({ x: 0 });

      tree.find(Draggable).prop('onUpdate')({ x: 10 });
      expect(changeDraftColumnWidth)
        .toBeCalledWith({ shift: 10 });
    });
  });
});
