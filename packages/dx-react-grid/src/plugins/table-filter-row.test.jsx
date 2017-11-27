import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  getColumnFilterConfig,
  isFilterTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';
import { DataTypeProvider } from './data-type-provider';
import { TableFilterRow } from './table-filter-row';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableHeaderRowsWithFilter: jest.fn(),
  isFilterTableCell: jest.fn(),
  isFilterTableRow: jest.fn(),
  getColumnFilterConfig: jest.fn(),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
    filters: [{ columnName: 'a', value: 'b' }],
  },
  action: {
    setColumnFilter: jest.fn(),
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
  plugins: ['FilteringState', 'Table'],
};

const defaultFilterCellComponent = () => null;
const defaultProps = {
  getFilterCellComponent: () => defaultFilterCellComponent,
  filterRowComponent: () => null,
};

describe('TableFilterRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableHeaderRowsWithFilter.mockImplementation(() => 'tableHeaderRowsWithFilter');
    isFilterTableCell.mockImplementation(() => false);
    isFilterTableRow.mockImplementation(() => false);
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
          <TableFilterRow
            {...defaultProps}
            rowHeight={120}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getters.tableHeaderRows)
        .toBe('tableHeaderRowsWithFilter');
      expect(tableHeaderRowsWithFilter)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows, 120);
    });
  });

  it('should render heading cell on user-defined column and filter row intersection', () => {
    isFilterTableCell.mockImplementation(() => true);
    const getFilterCellComponent = jest.fn(() => defaultFilterCellComponent);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          getFilterCellComponent={getFilterCellComponent}
        />
      </PluginHost>
    ));

    expect(isFilterTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(getFilterCellComponent)
      .toBeCalledWith(defaultDeps.template.tableCell.tableColumn.column.name);
    expect(tree.find(defaultFilterCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  it('can render custom editor', () => {
    isFilterTableCell.mockImplementation(() => true);
    getColumnFilterConfig.mockImplementation(() => defaultDeps.getter.filters[0]);
    const valueEditor = jest.fn(() => <span />);
    const deps = {
      getter: {
        filters: [{ columnName: 'a', value: 'b' }],
      },
      template: {
        tableCell: {
          tableRow: { type: 'undefined', rowId: 1, row: 'row' },
          tableColumn: { type: 'undefined', column: { name: 'column', dataType: 'column' } },
          style: {},
        },
      },
    };

    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          type="column"
          editorTemplate={valueEditor}
        />
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(valueEditor)
      .toHaveBeenCalledWith({
        column: deps.template.tableCell.tableColumn.column,
        value: deps.getter.filters[0].value,
        onValueChange: expect.any(Function),
      });
    expect(tree.find(defaultFilterCellComponent).props())
      .toHaveProperty('children');
  });

  it('should render row by using filterRowComponent', () => {
    isFilterTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(isFilterTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.filterRowComponent).props())
      .toMatchObject(defaultDeps.template.tableRow);
  });

  it('should pass getMessage function to filterTableCellTemplate', () => {
    isFilterTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          messages={{
            filterPlaceholder: 'Filter...',
          }}
        />
      </PluginHost>
    ));

    const { getMessage } = tree.find(defaultFilterCellComponent).props();
    expect(getMessage('filterPlaceholder')).toBe('Filter...');
  });
});
