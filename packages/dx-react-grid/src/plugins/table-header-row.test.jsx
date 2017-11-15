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
  headerCellTemplate: () => null,
  headerRowTemplate: () => null,
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

  it('should render heading cell on user-defined column and heading row intersection', () => {
    isHeadingTableCell.mockImplementation(() => true);
    const headerCellTemplate = jest.fn(() => null);

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
          headerCellTemplate={headerCellTemplate}
        />
      </PluginHost>
    ));

    expect(isHeadingTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(headerCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      }));
  });

  it('should render row by using headerRowTemplate', () => {
    isHeadingTableRow.mockImplementation(() => true);
    const headerRowTemplate = jest.fn(() => null);

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
          headerRowTemplate={headerRowTemplate}
        />
      </PluginHost>
    ));

    expect(isHeadingTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(headerRowTemplate)
      .toBeCalledWith(defaultDeps.template.tableRow);
  });

  it('should pass correct getMessage prop to TableHeaderRowTemplate', () => {
    isHeadingTableCell.mockImplementation(() => true);
    const headerCellTemplate = jest.fn(() => null);
    const deps = {
      plugins: ['SortingState'],
    };
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableHeaderRow
          {...defaultProps}
          allowSorting
          headerCellTemplate={headerCellTemplate}
          messages={{
            sortingHint: 'test',
          }}
        />
      </PluginHost>
    ));

    const { getMessage } = headerCellTemplate.mock.calls[0][0];

    expect(getMessage('sortingHint')).toBe('test');
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

    it('should pass correct props to headerCellTemplate', () => {
      isHeadingTableCell.mockImplementation(() => true);
      const headerCellTemplate = jest.fn(() => null);

      const deps = {
        plugins: ['TableColumnResizing'],
      };
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            allowResizing
            headerCellTemplate={headerCellTemplate}
          />
        </PluginHost>
      ));

      expect(headerCellTemplate)
        .toBeCalledWith(expect.objectContaining({
          allowResizing: true,
          changeColumnWidth: expect.any(Function),
          changeDraftColumnWidth: expect.any(Function),
        }));
    });

    it('should call correct action when on changeColumnWidth', () => {
      isHeadingTableCell.mockImplementation(() => true);
      const headerCellTemplate = jest.fn(() => null);

      const deps = {
        plugins: ['TableColumnResizing'],
        action: {
          changeTableColumnWidths: jest.fn(),
        },
      };
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            allowResizing
            headerCellTemplate={headerCellTemplate}
          />
        </PluginHost>
      ));

      headerCellTemplate.mock.calls[0][0].changeColumnWidth({ shift: 10 });
      expect(deps.action.changeTableColumnWidths.mock.calls[0][0])
        .toEqual({ shifts: { a: 10 } });
    });

    it('should call correct action when on changeDraftColumnWidth', () => {
      isHeadingTableCell.mockImplementation(() => true);
      const headerCellTemplate = jest.fn(() => null);

      const deps = {
        plugins: ['TableColumnResizing'],
        action: {
          changeDraftTableColumnWidths: jest.fn(),
        },
      };
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            allowResizing
            headerCellTemplate={headerCellTemplate}
          />
        </PluginHost>
      ));

      headerCellTemplate.mock.calls[0][0].changeDraftColumnWidth({ shift: 10 });
      expect(deps.action.changeDraftTableColumnWidths.mock.calls[0][0])
        .toEqual({ shifts: { a: 10 } });
    });
  });
});
