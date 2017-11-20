import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithWidths,
  changeTableColumnWidths,
  changeDraftTableColumnWidths,
} from '@devexpress/dx-grid-core';
import { TableColumnResizing } from './table-column-resizing';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithWidths: jest.fn(),
  changeTableColumnWidths: jest.fn(),
  changeDraftTableColumnWidths: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined' }],
  },
  plugins: ['Table'],
};

const defaultProps = {};

describe('TableColumnReordering', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithWidths.mockImplementation(() => 'tableColumnsWithWidths');
    changeTableColumnWidths.mockImplementation(() => ({}));
    changeDraftTableColumnWidths.mockImplementation(() => ({}));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should apply the column widths specified in the "defaultColumnWidths" property in uncontrolled mode', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            defaultColumnWidths={{ a: 100 }}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithWidths');
      expect(tableColumnsWithWidths)
        .toBeCalledWith(defaultDeps.getter.tableColumns, { a: 100 }, {});
    });

    it('should apply the column widths specified in the "columnWidths" property in controlled mode', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            columnWidths={{ a: 100 }}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithWidths');
      expect(tableColumnsWithWidths)
        .toBeCalledWith(defaultDeps.getter.tableColumns, { a: 100 }, {});
    });
  });

  it('should fire the "onColumnWidthsChange" callback and should change the column widths in uncontrolled mode after the "changeTableColumnWidths" action is fired', () => {
    const columnWidthsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnResizing
          {...defaultProps}
          defaultColumnWidths={{ a: 100 }}
          onColumnWidthsChange={columnWidthsChange}
        />
      </PluginHost>
    ));

    const payload = { changes: { a: 50 } };

    changeTableColumnWidths.mockReturnValue({ columnWidths: { a: 150 } });
    getComputedState(tree).actions.changeTableColumnWidths(payload);

    expect(changeTableColumnWidths)
      .toBeCalledWith(expect.objectContaining({ columnWidths: { a: 100 } }), payload);

    expect(tableColumnsWithWidths)
      .toBeCalledWith(defaultDeps.getter.tableColumns, { a: 150 }, {});

    expect(columnWidthsChange)
      .toBeCalledWith({ a: 150 });
  });

  it('should fire the "onColumnWidthsChange" callback and should change the column widths in controlled mode after the "changeTableColumnWidths" action is fired', () => {
    const columnWidthsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnResizing
          {...defaultProps}
          columnWidths={{ a: 100 }}
          onColumnWidthsChange={columnWidthsChange}
        />
      </PluginHost>
    ));

    const payload = { changes: { a: 50 } };

    changeTableColumnWidths.mockReturnValue({ columnWidths: { a: 150 } });
    getComputedState(tree).actions.changeTableColumnWidths(payload);

    expect(changeTableColumnWidths)
      .toBeCalledWith(expect.objectContaining({ columnWidths: { a: 100 } }), payload);

    expect(tableColumnsWithWidths)
      .toBeCalledWith(defaultDeps.getter.tableColumns, { a: 100 }, {});

    expect(columnWidthsChange)
      .toBeCalledWith({ a: 150 });
  });

  it('should correctly update column widths after the "changeDraftTableColumnWidths" action is fired', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnResizing
          {...defaultProps}
          defaultColumnWidths={{ a: 100 }}
        />
      </PluginHost>
    ));

    const payload = { changes: { a: 50 } };

    changeDraftTableColumnWidths.mockReturnValue({ draftColumnWidths: { a: 150 } });
    getComputedState(tree).actions.changeDraftTableColumnWidths(payload);

    expect(changeDraftTableColumnWidths)
      .toBeCalledWith(expect.objectContaining({ draftColumnWidths: {} }), payload);

    expect(tableColumnsWithWidths)
      .toBeCalledWith(defaultDeps.getter.tableColumns, { a: 100 }, { a: 150 });
  });
});
