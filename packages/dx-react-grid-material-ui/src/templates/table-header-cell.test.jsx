import React from 'react';

import { TableCell } from 'material-ui';

import { DragDropContext, DragSource } from '@devexpress/dx-react-core';
import { setupConsole } from '@devexpress/dx-testing';

import { mountWithStyles } from '../utils/testing';
import { TableHeaderCell, styleSheet } from './table-header-cell';

describe('TableHeaderCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should use column name if title is not specified', () => {
    const { tree, classes } = mountWithStyles(
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />,
      styleSheet,
    );

    expect(tree.find(`.${classes.plainTitle}`).text()).toBe('Test');
  });

  it('should cancel sorting by using the Ctrl key', () => {
    const changeSortingDirection = jest.fn();
    const tree = mountWithStyles(
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

  test('should have correct styles when user interaction disallowed', () => {
    const { tree, classes } = mountWithStyles(
      <TableHeaderCell
        column={{}}
      />,
      styleSheet,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeFalsy();
    expect(tree.find(TableCell).hasClass(classes.cellClickable)).toBeFalsy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeFalsy();
  });

  test('should have correct styles when sorting is allowed', () => {
    const { tree, classes } = mountWithStyles(
      <TableHeaderCell
        column={{}}
        allowSorting
      />,
      styleSheet,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellClickable)).toBeTruthy();
  });

  test('should have correct styles when dragging is allowed', () => {
    const { tree, classes } = mountWithStyles(
      <DragDropContext>
        <TableHeaderCell
          column={{}}
          allowDragging
        />
      </DragDropContext>,
      styleSheet,
    );

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeTruthy();
  });

  test('should have correct styles while dragging', () => {
    const { tree, classes } = mountWithStyles(
      <DragDropContext>
        <TableHeaderCell
          column={{}}
          allowDragging
        />
      </DragDropContext>,
      styleSheet,
    );

    expect(tree.find(TableCell).hasClass(classes.cellDragging)).toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    expect(tree.find(TableCell).hasClass(classes.cellDragging)).toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    expect(tree.find(TableCell).hasClass(classes.cellDragging)).toBeFalsy();
  });
});
