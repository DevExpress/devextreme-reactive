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
import { number, nominalTypeHack } from 'prop-types';

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
    cachedColumn: { columnName: 'a', width: 100 },
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
        .toBeCalledWith(defaultDeps.getter.tableColumns, [{ columnName: 'a', width: 100 }]);
      expect(tableColumnsWithDraftWidths)
        .toBeCalledWith('tableColumnsWithWidths', []);
    });
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
    const tableColumn = { type: TABLE_DATA_TYPE, column: { name: 'a' } };

    executeComputedAction(tree, actions => actions.storeWidthGetters({
      tableColumn,
      getter: () => 100,
      tableColumns: [tableColumn],
    }));

    const payload = {
      changes: { a: 50 },
      columnName: 'a',
      width: 100,
      minColumnWidth: defaultProps.minColumnWidth,
    };

    draftTableColumnWidth.mockReturnValue({ draftColumnWidths: [{ columnName: 'a', width: 150 }] });
    executeComputedAction(tree, actions => actions.draftTableColumnWidth(payload));

    expect(draftTableColumnWidth)
      .toBeCalledWith(expect.objectContaining({ draftColumnWidths: [] }), payload);

    expect(tableColumnsWithDraftWidths)
      .toBeCalledWith('tableColumnsWithWidths', [{ columnName: 'a', width: 150 }]);
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

    cancelTableColumnWidthDraft.mockReturnValue(
      { draftColumnWidths: [{ columnName: 'a', width: 150 }] },
    );
    executeComputedAction(tree, actions => actions.cancelTableColumnWidthDraft(payload));

    expect(cancelTableColumnWidthDraft)
      .toBeCalledWith(expect.objectContaining({ draftColumnWidths: [] }), payload);

    expect(tableColumnsWithDraftWidths)
      .toBeCalledWith('tableColumnsWithWidths', [{ columnName: 'a', width: 150 }]);
  });
});
