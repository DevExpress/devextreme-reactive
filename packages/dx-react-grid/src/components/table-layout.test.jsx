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
    ref={props.tableRef}
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
      const rowData = rowWrapper.children(PropsContainer).props();

      expect(rowData.row).toMatchObject(row);

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
      { type: TABLE_DATA_TYPE, id: 1 },
      { type: TABLE_DATA_TYPE, id: 2 },
      { type: TABLE_DATA_TYPE, id: 3 },
    ];
    const columns = [
      { type: TABLE_DATA_TYPE, id: 'a' },
      { type: TABLE_DATA_TYPE, id: 'b' },
      { type: TABLE_DATA_TYPE, id: 'c' },
      { type: TABLE_DATA_TYPE, id: 'd' },
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
      { type: TABLE_DATA_TYPE, id: 1 },
      { type: TABLE_DATA_TYPE, id: 2 },
      { type: TABLE_DATA_TYPE, id: 3 },
    ];
    const columns = [
      { type: TABLE_DATA_TYPE, id: 'a' },
      { type: TABLE_DATA_TYPE, id: 'b' },
      { type: TABLE_DATA_TYPE, id: 'c' },
      { type: TABLE_DATA_TYPE, id: 'd' },
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
      { type: TABLE_DATA_TYPE, id: 1, colSpanStart: 0 },
      { type: TABLE_DATA_TYPE, id: 2, colSpanStart: 1 },
    ];
    const columns = [
      { type: TABLE_DATA_TYPE, id: 'a' },
      { type: TABLE_DATA_TYPE, id: 'b' },
      { type: TABLE_DATA_TYPE, id: 'c' },
      { type: TABLE_DATA_TYPE, id: 'd' },
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
    expect(rowColumn.at(0).children(PropsContainer).props().colspan).toBe(4);

    rowColumn = rowWrappers.at(1).find('td');
    expect(rowColumn.length).toBe(2);
    expect(rowColumn.at(0).children(PropsContainer).props()).not.toHaveProperty('colspan');
    expect(rowColumn.at(1).children(PropsContainer).props().colspan).toBe(3);
  });

  it('should have correct styles', () => {
    const rows = [
      { type: TABLE_DATA_TYPE, id: 1, height: 100 },
      { type: TABLE_DATA_TYPE, id: 2 },
    ];
    const columns = [
      { type: TABLE_DATA_TYPE, id: 'a', width: 100 },
      { type: TABLE_DATA_TYPE, id: 'b' },
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

  it('should handle click in body', () => {
    const rows = [
      { type: TABLE_DATA_TYPE, id: 1 },
      { type: TABLE_DATA_TYPE, id: 2 },
    ];
    const columns = [
      { type: TABLE_DATA_TYPE, id: 'a' },
      { type: TABLE_DATA_TYPE, id: 'b' },
    ];
    const onClick = jest.fn();
    const tree = mount(
      <TableLayout
        rows={rows}
        columns={columns}
        minColumnWidth={150}
        tableTemplate={tableTemplateMock}
        bodyTemplate={bodyTemplateMock}
        rowTemplate={rowTemplateMock}
        cellTemplate={cellTemplateMock}
        onClick={onClick}
      />,
    );

    tree.find('tr').at(1).find('td').at(1)
      .simulate('click');
    expect(onClick.mock.calls[0][0])
      .toMatchObject({ tableRow: rows[1], tableColumn: columns[1], e: {} });
  });

  it('should handle click in head', () => {
    const rows = [
      { type: TABLE_DATA_TYPE, id: 1 },
      { type: TABLE_DATA_TYPE, id: 2 },
    ];
    const columns = [
      { type: TABLE_DATA_TYPE, id: 'a' },
      { type: TABLE_DATA_TYPE, id: 'b' },
    ];
    const onClick = jest.fn();
    const tree = mount(
      <TableLayout
        headerRows={rows}
        rows={[]}
        columns={columns}
        minColumnWidth={150}
        tableTemplate={tableTemplateMock}
        headTemplate={headTemplateMock}
        bodyTemplate={bodyTemplateMock}
        rowTemplate={rowTemplateMock}
        cellTemplate={cellTemplateMock}
        onClick={onClick}
      />,
    );

    tree.find('tr').at(1).find('td').at(1)
      .simulate('click');
    expect(onClick.mock.calls[0][0])
      .toMatchObject({ tableRow: rows[1], tableColumn: columns[1], e: {} });
  });

  describe('flex column', () => {
    it('should add flex column if all columns have fixed widths', () => {
      const rows = [
        { type: TABLE_DATA_TYPE, id: 1 },
        { type: TABLE_DATA_TYPE, id: 2 },
      ];
      const columns = [
        { type: TABLE_DATA_TYPE, id: 'a', width: 100 },
        { type: TABLE_DATA_TYPE, id: 'b', width: 100 },
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
        { type: TABLE_DATA_TYPE, id: 1 },
        { type: TABLE_DATA_TYPE, id: 2 },
      ];
      const columns = [
        { type: TABLE_DATA_TYPE, id: 'a' },
        { type: TABLE_DATA_TYPE, id: 'b' },
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
        { type: TABLE_DATA_TYPE, id: 1 },
        { type: TABLE_DATA_TYPE, id: 2 },
      ];
      const columns = [
        { type: TABLE_DATA_TYPE, id: 'a' },
        { type: TABLE_DATA_TYPE, id: 'b' },
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
        { type: TABLE_DATA_TYPE, id: 1 },
        { type: TABLE_DATA_TYPE, id: 2 },
      ];
      const columns = [
        { type: TABLE_DATA_TYPE, id: 'a' },
        { type: TABLE_DATA_TYPE, id: 'b' },
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
  });
});
