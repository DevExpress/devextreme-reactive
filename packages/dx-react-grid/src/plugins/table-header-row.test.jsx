import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';
import { TableHeaderRow } from './table-header-row';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithHeading: jest.fn(),
  isHeadingTableCell: jest.fn(),
  isHeadingTableRow: jest.fn(),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }],
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
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
  cellLayoutComponent: () => null,
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

      expect(getComputedState(tree).getters.tableHeaderRows)
        .toBe('tableRowsWithHeading');
      expect(tableRowsWithHeading)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows);
    });
  });

  it('should render header cell layout on user-defined column and header row intersection', () => {
    isHeadingTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    const tableCellProps = defaultDeps.template.tableCell;

    expect(isHeadingTableCell)
      .toBeCalledWith(
        tableCellProps.tableRow,
        tableCellProps.tableColumn,
      );
    expect(tree.find(defaultProps.cellLayoutComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: tableCellProps.tableColumn.column,
        draft: undefined,
        cellComponent: defaultProps.cellComponent,
        allowSorting: false,
        showGroupingControls: false,
        allowDragging: false,
        allowResizing: false,
        sortingDirection: undefined,
        onSort: expect.any(Function),
        onGroup: expect.any(Function),
        onWidthChange: expect.any(Function),
        onDraftWidthChange: expect.any(Function),
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

  it('should pass correct getMessage prop to cellLayoutComponent', () => {
    isHeadingTableCell.mockImplementation(() => true);

    const deps = {
      plugins: ['SortingState'],
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableHeaderRow
          {...defaultProps}
          allowSorting
          messages={{
            sortingHint: 'test',
          }}
        />
      </PluginHost>
    ));

    const { getMessage } = tree.find(defaultProps.cellLayoutComponent).props();
    expect(getMessage('sortingHint'))
      .toBe('test');
  });

  describe('resizing', () => {
    it('should require TableColumnResizing plugin', () => {
      expect(() => {
        mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <TableHeaderRow
              {...defaultProps}
              allowResizing
            />
          </PluginHost>
        ));
      })
        .toThrow();
    });

    it('should pass correct props to cellLayoutComponent', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            allowResizing
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.cellLayoutComponent).props())
        .toMatchObject({
          allowResizing: true,
          onWidthChange: expect.any(Function),
          onDraftWidthChange: expect.any(Function),
        });
    });

    it('should call correct action on the onWidthChange event', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
        action: {
          changeTableColumnWidths: jest.fn(),
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            allowResizing
          />
        </PluginHost>
      ));

      const { onWidthChange } = tree.find(defaultProps.cellLayoutComponent).props();
      onWidthChange({ shift: 10 });
      expect(deps.action.changeTableColumnWidths.mock.calls[0][0])
        .toEqual({ shifts: { a: 10 } });
    });

    it('should call correct action on the onDraftWidthChange event', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
        action: {
          changeDraftTableColumnWidths: jest.fn(),
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            allowResizing
          />
        </PluginHost>
      ));

      const { onDraftWidthChange } = tree.find(defaultProps.cellLayoutComponent).props();
      onDraftWidthChange({ shift: 10 });
      expect(deps.action.changeDraftTableColumnWidths.mock.calls[0][0])
        .toEqual({ shifts: { a: 10 } });
    });
  });
});
