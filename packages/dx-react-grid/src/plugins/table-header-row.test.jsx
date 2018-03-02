import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  getMessagesFormatter,
  getColumnSortingDirection,
} from '@devexpress/dx-grid-core';
import { TableHeaderRow } from './table-header-row';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithHeading: jest.fn(),
  isHeadingTableCell: jest.fn(),
  isHeadingTableRow: jest.fn(),
  getMessagesFormatter: jest.fn(),
  getColumnSortingDirection: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }],
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
    isColumnSortingEnabled: () => false,
    tableColumns: [],
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: { name: 'a' } },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['Table'],
};

const defaultProps = {
  cellComponent: () => null,
  rowComponent: () => null,
};

describe('TableHeaderRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableRowsWithHeading.mockImplementation(() => 'tableRowsWithHeading');
    isHeadingTableCell.mockImplementation(() => false);
    isHeadingTableRow.mockImplementation(() => false);
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
    getColumnSortingDirection.mockImplementation(() => null);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableHeaderRows)
        .toBe('tableRowsWithHeading');
      expect(tableRowsWithHeading)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows);
    });
  });

  it('should render heading cell on user-defined column and heading row intersection', () => {
    isHeadingTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isHeadingTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  it('should render row by using rowComponent', () => {
    isHeadingTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isHeadingTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject(defaultDeps.template.tableRow);
  });

  it('should pass correct getMessage prop to TableHeaderRowTemplate', () => {
    isHeadingTableCell.mockImplementation(() => true);

    const deps = {
      plugins: ['SortingState'],
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableHeaderRow
          {...defaultProps}
          showSortingControls
          messages={{
            sortingHint: 'test',
          }}
        />
      </PluginHost>
    ));

    const { getMessage } = tree.find(defaultProps.cellComponent).props();
    expect(getMessage('sortingHint')).toBe('test');
  });

  describe('resizing', () => {
    it('should pass correct props to cellComponent', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          tableColumnResizingEnabled: true,
        },
        plugins: ['TableColumnResizing'],
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.cellComponent).props())
        .toMatchObject({
          resizingEnabled: true,
          onWidthChange: expect.any(Function),
          onWidthDraft: expect.any(Function),
        });
    });

    it('should call correct action when on onWidthChange', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
        getter: {
          tableColumnResizingEnabled: true,
        },
        action: {
          changeTableColumnWidth: jest.fn(),
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      const { onWidthChange } = tree.find(defaultProps.cellComponent).props();
      onWidthChange({ shift: 10 });
      expect(deps.action.changeTableColumnWidth.mock.calls[0][0])
        .toEqual({ columnName: 'a', shift: 10 });
    });

    it('should call correct action when on onWidthDraft', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
        action: {
          draftTableColumnWidth: jest.fn(),
        },
        getter: {
          tableColumnResizingEnabled: true,
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      const { onWidthDraft } = tree.find(defaultProps.cellComponent).props();
      onWidthDraft({ shift: 10 });
      expect(deps.action.draftTableColumnWidth.mock.calls[0][0])
        .toEqual({ columnName: 'a', shift: 10 });
    });

    it('should call correct action when on onWidthDraftCancel', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
        action: {
          cancelTableColumnWidthDraft: jest.fn(),
        },
        getter: {
          tableColumnResizingEnabled: true,
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      const { onWidthDraftCancel } = tree.find(defaultProps.cellComponent).props();
      onWidthDraftCancel();
      expect(deps.action.cancelTableColumnWidthDraft.mock.calls[0][0])
        .toEqual();
    });
  });
});
