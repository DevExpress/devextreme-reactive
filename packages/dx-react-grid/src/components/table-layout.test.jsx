/* globals window:true */

import React from 'react';
import { shallow } from 'enzyme';
import {
  getAnimations,
  filterActiveAnimations,
  evalAnimations,
} from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { TableLayout } from './table-layout';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(() => ({
    getBoundingClientRect: () => ({ width: 300 }),
  })),
}));
jest.mock('@devexpress/dx-grid-core', () => ({
  getAnimations: jest.fn(),
  filterActiveAnimations: jest.fn(),
  evalAnimations: jest.fn(),
}));

const defaultRows = [
  { key: 1, rowId: 1 },
  { key: 2, rowId: 2 },
  { key: 3, rowId: 3 },
];
const defaultColumns = [
  { key: 'a', column: { name: 'a' } },
  { key: 'b', column: { name: 'b' } },
  { key: 'c', column: { name: 'c' } },
  { key: 'd', column: { name: 'd' } },
];

describe('TableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
    jest.clearAllMocks();
  });

  it('should render the body RowsBlockLayout', () => {
    const bodyTemplate = () => null;
    const cellTemplate = () => null;
    const rowTemplate = () => null;

    const tree = shallow((
      <TableLayout
        rows={defaultRows}
        columns={defaultColumns}
        tableTemplate={() => null}
        bodyTemplate={bodyTemplate}
        rowTemplate={rowTemplate}
        cellTemplate={cellTemplate}
      />
    ));

    expect(tree.find('RowsBlockLayout').props())
      .toMatchObject({
        blockTemplate: bodyTemplate,
        cellTemplate,
        rowTemplate,
        columns: defaultColumns,
        rows: defaultRows,
      });
  });

  it('should render the head RowsBlockLayout', () => {
    const headTemplate = () => null;
    const cellTemplate = () => null;
    const rowTemplate = () => null;

    const tree = shallow((
      <TableLayout
        headerRows={defaultRows}
        rows={[]}
        columns={defaultColumns}
        tableTemplate={() => null}
        headTemplate={headTemplate}
        bodyTemplate={() => null}
        rowTemplate={rowTemplate}
        cellTemplate={cellTemplate}
      />
    ));

    expect(tree.find('RowsBlockLayout').at(0).props())
      .toMatchObject({
        blockTemplate: headTemplate,
        cellTemplate,
        rowTemplate,
        columns: defaultColumns,
        rows: defaultRows,
      });
  });

  it('should pass correct styles to the tableTemplate', () => {
    const rows = [
      { key: 1, height: 100 },
      { key: 2 },
    ];
    const columns = [
      { key: 'a', column: { name: 'a' }, width: 100 },
      { key: 'b', column: { name: 'b' } },
    ];
    const tableTemplate = () => null;

    const tree = shallow((
      <TableLayout
        rows={rows}
        columns={columns}
        minColumnWidth={150}
        tableTemplate={tableTemplate}
        bodyTemplate={() => null}
        rowTemplate={() => null}
        cellTemplate={() => null}
      />
    ));

    expect(tree.find('TemplateRenderer').props())
      .toMatchObject({
        template: tableTemplate,
        params: {
          style: {
            minWidth: '250px',
            tableLayout: 'fixed',
          },
        },
      });
  });

  describe('flex column', () => {
    it('should add flex column if all columns have fixed widths', () => {
      const rows = [
        { key: 1 },
        { key: 2 },
      ];
      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' }, width: 100 },
      ];
      const tableTemplate = () => null;

      const tree = shallow((
        <TableLayout
          rows={rows}
          columns={columns}
          tableTemplate={tableTemplate}
          bodyTemplate={() => null}
          rowTemplate={() => null}
          cellTemplate={() => null}
        />
      ));

      expect(tree.find('TemplateRenderer').props())
        .toMatchObject({
          template: tableTemplate,
          params: {
            style: {
              minWidth: '200px',
            },
          },
        });
      expect(tree.find('RowsBlockLayout').prop('columns'))
        .toContainEqual({
          key: 'flex',
          type: 'flex',
        });
    });
  });

  describe('animation', () => {
    let originalRaf;

    beforeEach(() => {
      originalRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = jest.fn();
    });
    afterEach(() => {
      window.requestAnimationFrame = originalRaf;
    });

    it('should be updated on the "columns" property change', () => {
      filterActiveAnimations.mockImplementation(() => new Map());
      evalAnimations.mockImplementation(() => new Map());

      const rows = [
        { key: 1, rowId: 1, height: 100 },
        { key: 2, rowId: 2 },
      ];
      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' } },
      ];
      const nextColumns = [columns[1], columns[0]];

      const tree = shallow((
        <TableLayout
          rows={rows}
          columns={columns}
          tableTemplate={() => null}
          bodyTemplate={() => null}
          rowTemplate={() => null}
          cellTemplate={() => null}
        />
      ));
      tree.setProps({ columns: nextColumns });

      expect(getAnimations)
        .toHaveBeenCalledTimes(1);
      expect(getAnimations)
        .toHaveBeenCalledWith(columns, nextColumns, 300, new Map());
    });

    it('should start on the "columns" property change', () => {
      const rows = [
        { key: 1, rowId: 1, height: 100 },
        { key: 2, rowId: 2 },
      ];
      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' } },
      ];
      const nextColumns = [columns[1], columns[0]];
      const animations = new Map([
        ['a', { left: { from: 200, to: 0 } }],
        ['b', { left: { from: 0, to: 100 } }],
      ]);

      filterActiveAnimations.mockImplementation(() => animations);

      const tree = shallow((
        <TableLayout
          rows={rows}
          columns={columns}
          tableTemplate={() => null}
          bodyTemplate={() => null}
          rowTemplate={() => null}
          cellTemplate={() => null}
        />
      ));
      tree.setProps({ columns: nextColumns });

      expect(filterActiveAnimations)
        .toHaveBeenCalledTimes(1);
      expect(evalAnimations)
        .toHaveBeenCalledTimes(1);
      expect(evalAnimations)
        .toHaveBeenCalledWith(animations);
    });

    it('should not start if the "columns" property length is changed', () => {
      filterActiveAnimations.mockImplementation(() => new Map());

      const rows = [
        { key: 1, rowId: 1, height: 100 },
        { key: 2, rowId: 2 },
      ];
      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' } },
      ];
      const nextColumns = [columns[1]];

      const tree = shallow((
        <TableLayout
          rows={rows}
          columns={columns}
          tableTemplate={() => null}
          bodyTemplate={() => null}
          rowTemplate={() => null}
          cellTemplate={() => null}
        />
      ));
      tree.setProps({ columns: nextColumns });

      expect(getAnimations)
        .not.toHaveBeenCalled();
    });
  });
});
