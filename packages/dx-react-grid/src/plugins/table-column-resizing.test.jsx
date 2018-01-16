import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithWidths,
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
} from '@devexpress/dx-grid-core';
import { TableColumnResizing } from './table-column-resizing';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithWidths: jest.fn(),
  changeTableColumnWidth: jest.fn(),
  draftTableColumnWidth: jest.fn(),
  cancelTableColumnWidthDraft: jest.fn(),
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
    changeTableColumnWidth.mockImplementation(() => ([]));
    draftTableColumnWidth.mockImplementation(() => ([]));
    cancelTableColumnWidthDraft.mockImplementation(() => ([]));
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
            defaultColumnWidths={[{ columnName: 'a', width: 100 }]}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithWidths');
      expect(tableColumnsWithWidths)
        .toBeCalledWith(defaultDeps.getter.tableColumns, [{ columnName: 'a', width: 100 }], []);
    });

    it('should apply the column widths specified in the "columnWidths" property in controlled mode', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            {...defaultProps}
            columnWidths={[{ columnName: 'a', width: 100 }]}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithWidths');
      expect(tableColumnsWithWidths)
        .toBeCalledWith(defaultDeps.getter.tableColumns, [{ columnName: 'a', width: 100 }], []);
    });
  });

  it('should fire the "onColumnWidthsChange" callback and should change the column widths in uncontrolled mode after the "changeTableColumnWidth" action is fired', () => {
    const columnWidthsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnResizing
          {...defaultProps}
          defaultColumnWidths={[{ columnName: 'a', width: 100 }]}
          onColumnWidthsChange={columnWidthsChange}
        />
      </PluginHost>
    ));

    const payload = { changes: { a: 50 } };

    changeTableColumnWidth.mockReturnValue({ columnWidths: [{ columnName: 'a', width: 150 }] });
    executeComputedAction(tree, actions => actions.changeTableColumnWidth(payload));

    expect(changeTableColumnWidth)
      .toBeCalledWith(expect.objectContaining({ columnWidths: [{ columnName: 'a', width: 100 }] }), payload);

    expect(tableColumnsWithWidths)
      .toBeCalledWith(defaultDeps.getter.tableColumns, [{ columnName: 'a', width: 150 }], []);

    expect(columnWidthsChange)
      .toBeCalledWith([{ columnName: 'a', width: 150 }]);
  });

  it('should fire the "onColumnWidthsChange" callback and should change the column widths in controlled mode after the "changeTableColumnWidth" action is fired', () => {
    const columnWidthsChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnResizing
          {...defaultProps}
          columnWidths={[{ columnName: 'a', width: 100 }]}
          onColumnWidthsChange={columnWidthsChange}
        />
      </PluginHost>
    ));

    const payload = { changes: { a: 50 } };

    changeTableColumnWidth.mockReturnValue({ columnWidths: [{ columnName: 'a', width: 150 }] });
    executeComputedAction(tree, actions => actions.changeTableColumnWidth(payload));

    expect(changeTableColumnWidth)
      .toBeCalledWith(expect.objectContaining({ columnWidths: [{ columnName: 'a', width: 100 }] }), payload);

    expect(tableColumnsWithWidths)
      .toBeCalledWith(defaultDeps.getter.tableColumns, [{ columnName: 'a', width: 100 }], []);

    expect(columnWidthsChange)
      .toBeCalledWith([{ columnName: 'a', width: 150 }]);
  });

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

    const payload = { changes: { a: 50 } };

    draftTableColumnWidth.mockReturnValue({ draftColumnWidths: [{ columnName: 'a', width: 150 }] });
    executeComputedAction(tree, actions => actions.draftTableColumnWidth(payload));

    expect(draftTableColumnWidth)
      .toBeCalledWith(expect.objectContaining({ draftColumnWidths: [] }), payload);

    expect(tableColumnsWithWidths)
      .toBeCalledWith(defaultDeps.getter.tableColumns, [{ columnName: 'a', width: 100 }], [{ columnName: 'a', width: 150 }]);
  });

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

    cancelTableColumnWidthDraft.mockReturnValue({ draftColumnWidths: [{ columnName: 'a', width: 150 }] });
    executeComputedAction(tree, actions => actions.cancelTableColumnWidthDraft(payload));

    expect(cancelTableColumnWidthDraft)
      .toBeCalledWith(expect.objectContaining({ draftColumnWidths: [] }), payload);

    expect(tableColumnsWithWidths)
      .toBeCalledWith(defaultDeps.getter.tableColumns, [{ columnName: 'a', width: 100 }], [{ columnName: 'a', width: 150 }]);
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const defaultColumnWidths = [{ columnName: 'a', width: 1 }];
      const transitionalColumnWidths = [{ columnName: 'a', width: 2 }];
      const newColumnWidths = [{ columnName: 'a', width: 3 }];
      const payload = {};

      const columnWidthsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            defaultColumnWidths={defaultColumnWidths}
            onColumnWidthsChange={columnWidthsChange}
          />
        </PluginHost>
      ));

      changeTableColumnWidth.mockReturnValueOnce({ columnWidths: transitionalColumnWidths });
      changeTableColumnWidth.mockReturnValueOnce({ columnWidths: newColumnWidths });
      executeComputedAction(tree, (actions) => {
        actions.changeTableColumnWidth(payload);
        actions.changeTableColumnWidth(payload);
      });

      expect(changeTableColumnWidth)
        .lastCalledWith(
          expect.objectContaining({ columnWidths: transitionalColumnWidths }),
          payload,
        );

      expect(columnWidthsChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const columnWidths = [{ columnName: 'a', width: 1 }];
      const transitionalColumnWidths = [{ columnName: 'a', width: 2 }];
      const newColumnWidths = [{ columnName: 'a', width: 3 }];
      const payload = {};

      const columnWidthsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={columnWidthsChange}
          />
        </PluginHost>
      ));

      changeTableColumnWidth.mockReturnValueOnce({ columnWidths: transitionalColumnWidths });
      changeTableColumnWidth.mockReturnValueOnce({ columnWidths: newColumnWidths });
      executeComputedAction(tree, (actions) => {
        actions.changeTableColumnWidth(payload);
        actions.changeTableColumnWidth(payload);
      });

      expect(changeTableColumnWidth)
        .lastCalledWith(
          expect.objectContaining({ columnWidths: transitionalColumnWidths }),
          payload,
        );

      expect(columnWidthsChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});
