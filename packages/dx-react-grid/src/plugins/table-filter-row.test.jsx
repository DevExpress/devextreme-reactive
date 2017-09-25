import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  getColumnFilterConfig,
  isFilterTableRow,
} from '@devexpress/dx-grid-core';
import { DataTypeProvider } from './data-type-provider';
import { TableFilterRow } from './table-filter-row';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableHeaderRowsWithFilter: jest.fn(),
  isFilterTableCell: jest.fn(),
  isFilterTableRow: jest.fn(),
  getColumnFilterConfig: jest.fn(),
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
    tableViewCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
    tableViewRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['FilteringState', 'TableView'],
};

const defaultProps = {
  filterCellTemplate: () => null,
  filterRowTemplate: () => null,
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
    tableHeaderRowsWithFilter.mockImplementation(() => 'tableHeaderRowsWithFilter');
    isFilterTableCell.mockImplementation(() => false);
    isFilterTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableFilterRow
            {...defaultProps}
            rowHeight={120}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableHeaderRows)
        .toBe('tableHeaderRowsWithFilter');
      expect(tableHeaderRowsWithFilter)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows, 120);
    });
  });

  it('should render heading cell on user-defined column and filter row intersection', () => {
    isFilterTableCell.mockImplementation(() => true);
    const filterCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          filterCellTemplate={filterCellTemplate}
        />
      </PluginHost>,
    );

    expect(isFilterTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(filterCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        column: defaultDeps.template.tableViewCell.tableColumn.column,
      }));
  });

  it('can render custom editor', () => {
    isFilterTableCell.mockImplementation(() => true);
    getColumnFilterConfig.mockImplementation(() => defaultDeps.getter.filters[0]);
    const filterCellTemplate = jest.fn(() => null);
    const valueEditor = jest.fn(() => <span />);
    const deps = {
      getter: {
        filters: [{ columnName: 'a', value: 'b' }],
      },
      template: {
        tableViewCell: {
          tableRow: { type: 'undefined', rowId: 1, row: 'row' },
          tableColumn: { type: 'undefined', column: { name: 'column', dataType: 'column' } },
          style: {},
        },
      },
    };

    mount(
      <PluginHost>
        <DataTypeProvider
          type="column"
          editorTemplate={valueEditor}
        />
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableFilterRow
          {...defaultProps}
          filterCellTemplate={filterCellTemplate}
        />
      </PluginHost>,
    );

    expect(valueEditor)
      .toHaveBeenCalledWith({
        column: deps.template.tableViewCell.tableColumn.column,
        value: deps.getter.filters[0].value,
        onValueChange: expect.any(Function),
      });
    expect(filterCellTemplate.mock.calls[0][0])
      .toHaveProperty('children');
  });

  it('should render row by using filterRowTemplate', () => {
    isFilterTableRow.mockImplementation(() => true);
    const filterRowTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          filterRowTemplate={filterRowTemplate}
        />
      </PluginHost>,
    );
    expect(isFilterTableRow).toBeCalledWith(defaultDeps.template.tableViewRow.tableRow);
    expect(filterRowTemplate).toBeCalledWith(defaultDeps.template.tableViewRow);
  });
});
