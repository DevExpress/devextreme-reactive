import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  pluginDepsToComponents, getComputedState,
  executeComputedAction, testStatePluginField, setupConsole,
} from '@devexpress/dx-testing';
import {
  tableColumnsWithWidths,
  tableColumnsWithDraftWidths,
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
  TABLE_DATA_TYPE,
} from '@devexpress/dx-grid-core';
import { TableColumnResizing } from './table-column-resizing';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithWidths: jest.fn(),
  tableColumnsWithDraftWidths: jest.fn(),
  changeTableColumnWidth: jest.fn(),
  draftTableColumnWidth: jest.fn(),
  cancelTableColumnWidthDraft: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [
      { key: 'a', type: TABLE_DATA_TYPE, column: { name: 'a' } },
    ],
  },
  plugins: ['Table'],
};

const defaultProps = {
  minColumnWidth: 40,
  maxColumnWidth: Infinity,
  columnExtensions: undefined,
  resizingMode: 'widget',
  cachedWidths: {}, // NOTE: need to correct (?)
};

describe('TableColumnResizing', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithWidths.mockImplementation(() => 'tableColumnsWithWidths');
    tableColumnsWithDraftWidths.mockImplementation(() => 'tableColumnsWithDraftWidths');
    changeTableColumnWidth.mockImplementation(() => ([]));
    draftTableColumnWidth.mockImplementation(() => ([]));
    cancelTableColumnWidthDraft.mockImplementation(() => ([]));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    defaultDeps,
    defaultProps,
    Plugin: TableColumnResizing,
    propertyName: 'columnWidths',
    getGetterValue: () => tableColumnsWithWidths
      .mock
      .calls[tableColumnsWithWidths.mock.calls.length - 1][1],
    customPayload: defaultProps,
    values: [
      [{ columnName: 'a', width: 1 }],
      [{ columnName: 'a', width: 2 }],
      [{ columnName: 'a', width: 3 }],
    ],
    actions: [{
      actionName: 'changeTableColumnWidth',
      reducer: changeTableColumnWidth,
      fieldReducer: false,
    }],
  });

  describe('table layout getters', () => {
    // tslint:disable-next-line: max-line-length
    it('should apply the column widths specified in the "defaultColumnWidths" property in uncontrolled mode', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            defaultColumnWidths={[{ columnName: 'a', width: 100 }]}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithDraftWidths');
      expect(tableColumnsWithWidths)
        .toBeCalledWith(
          defaultDeps.getter.tableColumns,
          [{ columnName: 'a', width: 100 }],
          defaultProps.resizingMode,
        );
      expect(tableColumnsWithDraftWidths)
        .toBeCalledWith('tableColumnsWithWidths', [], defaultProps.resizingMode);
    });
  });

  describe('undefined columnExtensions', () => {
    const tableColumn = { column: { name: 'a' } };
    const payload = {
      cachedWidths: {
        a: 100,
      },
      changes: { a: 50 },
      columnName: 'a',
      minColumnWidth: defaultProps.minColumnWidth,
      maxColumnWidth: defaultProps.maxColumnWidth,
      columnExtensions: undefined,
      resizingMode: defaultProps.resizingMode,
    };

    // tslint:disable-next-line: max-line-length
    it('should correctly update column widths after the "changeTableColumnWidth" action is fired', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            defaultColumnWidths={[{ columnName: 'a', width: 100 }]}
          />
        </PluginHost>
      ));

      changeTableColumnWidth.mockReturnValue({ columnWidths: [{ columnName: 'a', width: 150 }] });
      executeComputedAction(tree, actions => actions.storeWidthGetters({
        tableColumn,
        getter: () => 100,
        tableColumns: [tableColumn],
      }));
      executeComputedAction(tree, actions => actions.draftTableColumnWidth(payload));
      executeComputedAction(tree, actions => actions.changeTableColumnWidth(payload));

      expect(changeTableColumnWidth)
        .toBeCalledWith(expect.objectContaining(
          { columnWidths: [{ columnName: 'a', width: 100 }] }), payload,
        );

      expect(tableColumnsWithDraftWidths)
        .toBeCalledWith('tableColumnsWithWidths', [], payload.resizingMode);
    });

    // tslint:disable-next-line: max-line-length
    it('should correctly update column widths after the "draftTableColumnWidth" action is fired', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            defaultColumnWidths={[{ columnName: 'a', width: 100 }]}
          />
        </PluginHost>
      ));

      draftTableColumnWidth.mockReturnValue({
        draftColumnWidths: [{ columnName: 'a', width: 150 }],
      });
      executeComputedAction(tree, actions => actions.storeWidthGetters({
        tableColumn,
        getter: () => 100,
        tableColumns: [tableColumn],
      }));
      executeComputedAction(tree, actions => actions.draftTableColumnWidth(payload));

      expect(draftTableColumnWidth)
        .toBeCalledWith(expect.objectContaining({ draftColumnWidths: [] }), payload);

      expect(tableColumnsWithDraftWidths)
        .toBeCalledWith(
          'tableColumnsWithWidths',
          [{ columnName: 'a', width: 150 }],
          payload.resizingMode,
        );
    });
  });

  describe('defined columnExtensions', () => {
    const tableColumn = { column: { name: 'a' } };
    const columnExtensions = [{ columnName: 'a', minWidth: 50, maxWidth: 150 }];
    const payload = {
      cachedWidths: {
        a: 100,
      },
      changes: { a: 50 },
      columnName: 'a',
      minColumnWidth: defaultProps.minColumnWidth,
      maxColumnWidth: defaultProps.maxColumnWidth,
      columnExtensions,
      resizingMode: 'widget',
    };

    it('should correctly provide columnExtensions into the "changeTableColumnWidth" action', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            defaultColumnWidths={[{ columnName: 'a', width: 100 }]}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      changeTableColumnWidth.mockReturnValue({ columnWidths: [{ columnName: 'a', width: 150 }] });
      executeComputedAction(tree, actions => actions.storeWidthGetters({
        tableColumn,
        getter: () => 100,
        tableColumns: [tableColumn],
      }));
      executeComputedAction(tree, actions => actions.draftTableColumnWidth(payload));
      executeComputedAction(tree, actions => actions.changeTableColumnWidth(payload));

      expect(changeTableColumnWidth)
        .toBeCalledWith(
          expect.objectContaining({ columnWidths: [{ columnName: 'a', width: 100 }] }),
          payload,
        );

      expect(tableColumnsWithDraftWidths)
        .toBeCalledWith('tableColumnsWithWidths', [], payload.resizingMode);
    });

    // tslint:disable-next-line: max-line-length
    it('should correctly provide columnExtensions into the "draftTableColumnWidth" action', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            defaultColumnWidths={[{ columnName: 'a', width: 100 }]}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      draftTableColumnWidth.mockReturnValue({
        draftColumnWidths: [{ columnName: 'a', width: 150 }],
      });
      executeComputedAction(tree, actions => actions.storeWidthGetters({
        tableColumn,
        getter: () => 100,
        tableColumns: [tableColumn],
      }));
      executeComputedAction(tree, actions => actions.draftTableColumnWidth(payload));

      expect(draftTableColumnWidth)
        .toBeCalledWith(expect.objectContaining({ draftColumnWidths: [] }), payload);

      expect(tableColumnsWithDraftWidths)
        .toBeCalledWith('tableColumnsWithWidths',
          [{ columnName: 'a', width: 150 }], payload.resizingMode,
        );
    });
  });

  // tslint:disable-next-line: max-line-length
  it('should correctly update column widths after the "cancelTableColumnWidthDraft" action is fired', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnResizing
          {...defaultProps}
          defaultColumnWidths={[{ columnName: 'a', width: 100 }]}
        />
      </PluginHost>
    ));

    const payload = { changes: { a: 50 } };

    cancelTableColumnWidthDraft.mockReturnValue({
      draftColumnWidths: [{ columnName: 'a', width: 150 }],
    });
    executeComputedAction(tree, actions => actions.cancelTableColumnWidthDraft(payload));

    expect(cancelTableColumnWidthDraft)
      .toBeCalledWith(expect.objectContaining({ draftColumnWidths: [] }), payload);

    expect(tableColumnsWithDraftWidths)
      .toBeCalledWith('tableColumnsWithWidths',
        [{ columnName: 'a', width: 150 }], defaultProps.resizingMode,
      );
  });

  describe('nextColumn resizing mode', () => {
    const resizingMode = 'nextColumn';
    const tableColumnA = { column: { name: 'a' } };
    const tableColumnB = { column: { name: 'b' } };
    const payload = {
      cachedWidths: {
        a: 100,
        b: 100,
      },
      changes: { a: 50 },
      columnName: 'a',
      nextColumnName: 'b',
      minColumnWidth: defaultProps.minColumnWidth,
      maxColumnWidth: defaultProps.maxColumnWidth,
      columnExtensions: undefined,
      resizingMode,
    };

    it('should correctly provide nextResizing into the "changeTableColumnWidth" action', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            defaultColumnWidths={[{ columnName: 'a', width: 100 }, { columnName: 'b', width: 100 }]}
            resizingMode={resizingMode}
          />
        </PluginHost>
      ));

      changeTableColumnWidth.mockReturnValue({
        columnWidths: [{ columnName: 'a', width: 150 }, { columnName: 'b', width: 50 }],
      });
      executeComputedAction(tree, actions => actions.storeWidthGetters({
        tableColumn: tableColumnA,
        getter: () => 100,
        tableColumns: [tableColumnA, tableColumnB],
      }));
      executeComputedAction(tree, actions => actions.storeWidthGetters({
        tableColumn: tableColumnB,
        getter: () => 100,
        tableColumns: [tableColumnA, tableColumnB],
      }));
      executeComputedAction(tree, actions => actions.draftTableColumnWidth(payload));
      executeComputedAction(tree, actions => actions.changeTableColumnWidth(payload));

      expect(changeTableColumnWidth)
        .toBeCalledWith(
          expect.objectContaining({
            columnWidths: [{ columnName: 'a', width: 100 }, { columnName: 'b', width: 100 }],
          }),
          payload,
        );

      expect(tableColumnsWithDraftWidths)
        .toBeCalledWith('tableColumnsWithWidths', [], resizingMode);
    });

    it('should correctly provide nextResizing into the "draftTableColumnWidth" action', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            defaultColumnWidths={[{ columnName: 'a', width: 100 }, { columnName: 'b', width: 100 }]}
            resizingMode={resizingMode}
          />
        </PluginHost>
      ));

      draftTableColumnWidth.mockReturnValue({
        draftColumnWidths: [{ columnName: 'a', width: 150 }, { columnName: 'b', width: 50 }],
      });
      executeComputedAction(tree, actions => actions.storeWidthGetters({
        tableColumn: tableColumnA,
        getter: () => 100,
        tableColumns: [tableColumnA, tableColumnB],
      }));
      executeComputedAction(tree, actions => actions.storeWidthGetters({
        tableColumn: tableColumnB,
        getter: () => 100,
        tableColumns: [tableColumnA, tableColumnB],
      }));
      executeComputedAction(tree, actions => actions.draftTableColumnWidth(payload));

      expect(draftTableColumnWidth)
        .toBeCalledWith(expect.objectContaining({ draftColumnWidths: [] }), payload);

      expect(tableColumnsWithDraftWidths)
        .toBeCalledWith('tableColumnsWithWidths',
          [{ columnName: 'a', width: 150 }, { columnName: 'b', width: 50 }],
          payload.resizingMode,
        );
    });
  });
});
