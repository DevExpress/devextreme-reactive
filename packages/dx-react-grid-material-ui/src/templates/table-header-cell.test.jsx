import React from 'react';
import { TableCell } from 'material-ui';
import { DragDropContext } from '@devexpress/dx-react-core';
import { mountWithStyles, setupConsole } from '../utils/testing';
import { TableHeaderCell, styleSheet } from './table-header-cell';

describe('TableHeaderCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  test('should use column name if title is not specified', () => {
    const tree = mountWithStyles(
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('div').text()).toBe('Test');
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
});
