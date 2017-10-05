/* globals Element:true, window:true */

import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext, DropTarget } from '@devexpress/dx-react-core';
import { TABLE_DATA_TYPE } from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';

import { TableLayout } from './table-layout';

/* eslint-disable react/prop-types */
const PropsContainer = () => null;
const tableTemplateMock = ({ children, ...props }) => (
  <table
    ref={props.ref}
  >
    <PropsContainer {...props} />
    {children}
  </table>
);
const headTemplateMock = ({ children, ...props }) => (
  <thead
    onClick={props.onClick}
  >
    {children}
  </thead>
);
const bodyTemplateMock = ({ children, ...props }) => (
  <tbody
    onClick={props.onClick}
  >
    {children}
  </tbody>
);
const rowTemplateMock = ({ children, ...props }) => (
  <tr>
    <PropsContainer {...props} />
    {children}
  </tr>
);
const cellTemplateMock = props => (
  <td>
    <PropsContainer {...props} />
  </td>
);
/* eslint-enable react/prop-types */

describe('TableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
  });

  const testTablePart = ({ tree, rows, columns }) => {
    const rowWrappers = tree.find('tr');
    expect(rowWrappers).toHaveLength(rows.length);
    rows.forEach((row, rowIndex) => {
      const rowWrapper = rowWrappers.at(rowIndex);
      const rowProps = rowWrapper.children(PropsContainer).props();

      expect(rowProps.tableRow).toMatchObject(row);

      const columnWrappers = rowWrapper.find('td');
      expect(columnWrappers).toHaveLength(columns.length);
      columns.forEach((column, columnIndex) => {
        const columnWrapper = columnWrappers.at(columnIndex);
        const columnData = columnWrapper.children(PropsContainer).props();

        expect(columnData.tableRow).toMatchObject(row);
        expect(columnData.tableColumn).toMatchObject(column);
      });
    });
  };

  it('should render table with rows and columns', () => {
    const rows = [
      { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1 },
      { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2 },
      { key: `${TABLE_DATA_TYPE}_3`, type: TABLE_DATA_TYPE, rowId: 3 },
    ];
    const columns = [
      { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
      { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
      { key: `${TABLE_DATA_TYPE}_c'`, type: TABLE_DATA_TYPE, column: { name: 'c' } },
      { key: `${TABLE_DATA_TYPE}_d'`, type: TABLE_DATA_TYPE, column: { name: 'd' } },
    ];
    const tree = mount(
      <TableLayout
        rows={rows}
        columns={columns}
        tableTemplate={tableTemplateMock}
        bodyTemplate={bodyTemplateMock}
        rowTemplate={rowTemplateMock}
        cellTemplate={cellTemplateMock}
      />,
    );

    testTablePart({ tree: tree.find('table tbody'), rows, columns });
  });

  it('should render table with headerRows and columns', () => {
    const rows = [
      { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1 },
      { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2 },
      { key: `${TABLE_DATA_TYPE}_3`, type: TABLE_DATA_TYPE, rowId: 3 },
    ];
    const columns = [
      { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
      { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
      { key: `${TABLE_DATA_TYPE}_c'`, type: TABLE_DATA_TYPE, column: { name: 'c' } },
      { key: `${TABLE_DATA_TYPE}_d'`, type: TABLE_DATA_TYPE, column: { name: 'd' } },
    ];
    const tree = mount(
      <TableLayout
        headerRows={rows}
        rows={[]}
        columns={columns}
        tableTemplate={tableTemplateMock}
        bodyTemplate={bodyTemplateMock}
        headTemplate={headTemplateMock}
        rowTemplate={rowTemplateMock}
        cellTemplate={cellTemplateMock}
      />,
    );

    testTablePart({ tree: tree.find('table thead'), rows, columns });
  });

  it('should span columns if specified', () => {
    const rows = [
      { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1, colSpanStart: 0 },
      { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2, colSpanStart: 1 },
    ];
    const columns = [
      { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
      { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
      { key: `${TABLE_DATA_TYPE}_c'`, type: TABLE_DATA_TYPE, column: { name: 'c' } },
      { key: `${TABLE_DATA_TYPE}_d'`, type: TABLE_DATA_TYPE, column: { name: 'd' } },
    ];
    const tree = mount(
      <TableLayout
        rows={rows}
        columns={columns}
        tableTemplate={tableTemplateMock}
        bodyTemplate={bodyTemplateMock}
        rowTemplate={rowTemplateMock}
        cellTemplate={cellTemplateMock}
      />,
    );

    const rowWrappers = tree.find('tr');

    let rowColumn = rowWrappers.at(0).find('td');
    expect(rowColumn.length).toBe(1);
    expect(rowColumn.at(0).children(PropsContainer).props().colSpan).toBe(4);

    rowColumn = rowWrappers.at(1).find('td');
    expect(rowColumn.length).toBe(2);
    expect(rowColumn.at(0).children(PropsContainer).props()).not.toHaveProperty('colSpan');
    expect(rowColumn.at(1).children(PropsContainer).props().colSpan).toBe(3);
  });

  it('should have correct styles', () => {
    const rows = [
      { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1, height: 100 },
      { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2 },
    ];
    const columns = [
      { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' }, width: 100 },
      { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
    ];
    const tree = mount(
      <TableLayout
        rows={rows}
        columns={columns}
        minColumnWidth={150}
        tableTemplate={tableTemplateMock}
        bodyTemplate={bodyTemplateMock}
        rowTemplate={rowTemplateMock}
        cellTemplate={cellTemplateMock}
      />,
    );

    const tableWrapper = tree.find('table');
    expect(tableWrapper.children(PropsContainer).props().style)
      .toMatchObject({ tableLayout: 'fixed', minWidth: '250px' });

    let rowWrapper = tree.find('tr').at(0);
    expect(rowWrapper.children(PropsContainer).props().style)
      .toMatchObject({ height: '100px' });

    rowWrapper = tree.find('tr').at(1);
    expect(rowWrapper.children(PropsContainer).props().style)
      .toMatchObject({ height: undefined });

    let columnWrapper = tree.find('tr').at(0).find('td').at(0);
    expect(columnWrapper.children(PropsContainer).props().style)
      .toMatchObject({ width: '100px' });

    columnWrapper = tree.find('tr').at(0).find('td').at(1);
    expect(columnWrapper.children(PropsContainer).props().style)
      .toMatchObject({ width: undefined });
  });

  describe('flex column', () => {
    it('should add flex column if all columns have fixed widths', () => {
      const rows = [
        { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1 },
        { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2 },
      ];
      const columns = [
        { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' }, width: 100 },
        { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' }, width: 100 },
      ];
      const tree = mount(
        <TableLayout
          rows={rows}
          columns={columns}
          tableTemplate={tableTemplateMock}
          bodyTemplate={bodyTemplateMock}
          rowTemplate={rowTemplateMock}
          cellTemplate={cellTemplateMock}
        />,
      );

      const tableWrapper = tree.find('table');
      expect(tableWrapper.children(PropsContainer).props().style)
        .toMatchObject({ minWidth: '200px' });

      expect(tree.find('tr').at(1).find('td'))
        .toHaveLength(3);
    });
  });

  describe('drag\'n\'drop reordering', () => {
    let getRect;
    let originalRaf;

    beforeEach(() => {
      getRect = jest.spyOn(Element.prototype, 'getBoundingClientRect');
      originalRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = jest.fn();
    });

    afterEach(() => {
      getRect.mockRestore();
      window.requestAnimationFrame = originalRaf;
    });

    it('should preview column order while dragging', () => {
      getRect.mockImplementation(() =>
        ({ top: 100, left: 100, width: 100, height: 100, right: 200, bottom: 200 }));

      const rows = [
        { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1 },
        { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2 },
      ];
      const columns = [
        { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ];
      const tree = mount(
        <DragDropContext>
          <TableLayout
            rows={rows}
            columns={columns}
            tableTemplate={tableTemplateMock}
            bodyTemplate={bodyTemplateMock}
            rowTemplate={rowTemplateMock}
            cellTemplate={cellTemplateMock}
            allowColumnReordering
          />
        </DragDropContext>,
      );

      const targetWrapper = tree.find(DropTarget);
      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 175, y: 100 } });

      testTablePart({ tree: tree.find('tbody'), rows, columns: [columns[1], columns[0]] });
    });

    it('should revert column order when source moves out', () => {
      getRect.mockImplementation(() =>
        ({ top: 100, left: 100, width: 100, height: 100, right: 200, bottom: 200 }));

      const rows = [
        { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1 },
        { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2 },
      ];
      const columns = [
        { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ];
      const tree = mount(
        <DragDropContext>
          <TableLayout
            rows={rows}
            columns={columns}
            tableTemplate={tableTemplateMock}
            bodyTemplate={bodyTemplateMock}
            rowTemplate={rowTemplateMock}
            cellTemplate={cellTemplateMock}
            allowColumnReordering
          />
        </DragDropContext>,
      );

      const targetWrapper = tree.find(DropTarget);
      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 175, y: 100 } });
      targetWrapper.prop('onLeave')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 90, y: 90 } });

      testTablePart({ tree: tree.find('tbody'), rows, columns });
    });

    it('should change column order on drop', () => {
      getRect.mockImplementation(() =>
        ({ top: 100, left: 100, width: 100, height: 100, right: 200, bottom: 200 }));

      const rows = [
        { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1 },
        { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2 },
      ];
      const columns = [
        { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
      ];
      const setColumnOrder = jest.fn();
      const tree = mount(
        <DragDropContext>
          <TableLayout
            rows={rows}
            columns={columns}
            minColumnWidth={150}
            tableTemplate={tableTemplateMock}
            bodyTemplate={bodyTemplateMock}
            rowTemplate={rowTemplateMock}
            cellTemplate={cellTemplateMock}
            allowColumnReordering
            setColumnOrder={setColumnOrder}
          />
        </DragDropContext>,
      );

      const targetWrapper = tree.find(DropTarget);
      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 175, y: 100 } });
      targetWrapper.prop('onDrop')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 175, y: 100 } });

      expect(setColumnOrder)
        .toBeCalledWith({ sourceColumnName: 'a', targetColumnName: 'b' });
    });

    it('should not crush when the dragging column is dropped on a non-data column', () => {
      getRect.mockImplementation(() =>
        ({ top: 100, left: 100, width: 100, height: 100, right: 200, bottom: 200 }));

      const rows = [
        { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1 },
      ];
      const columns = [
        { key: 'something_a', type: 'something' },
        { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
      ];
      const setColumnOrder = jest.fn();
      const tree = mount(
        <DragDropContext>
          <TableLayout
            rows={rows}
            columns={columns}
            minColumnWidth={150}
            tableTemplate={tableTemplateMock}
            bodyTemplate={bodyTemplateMock}
            rowTemplate={rowTemplateMock}
            cellTemplate={cellTemplateMock}
            allowColumnReordering
            setColumnOrder={setColumnOrder}
          />
        </DragDropContext>,
      );

      const targetWrapper = tree.find(DropTarget);
      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 130, y: 100 } });
      expect(() => {
        targetWrapper.prop('onDrop')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 130, y: 100 } });
      }).not.toThrow();
    });
  });
});
