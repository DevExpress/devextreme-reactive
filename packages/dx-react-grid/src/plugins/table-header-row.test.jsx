import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
} from '@devexpress/dx-grid-core';
import { TableHeaderRow } from './table-header-row';
import { pluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithHeading: jest.fn(),
  isHeadingTableCell: jest.fn(),
  isHeadingTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }],
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
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
  plugins: ['TableView'],
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
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
      const deps = {};
      mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>,
      );

      expect(deps.computedGetter('tableHeaderRows'))
        .toBe('tableRowsWithHeading');
      expect(tableRowsWithHeading)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows);
    });
  });

  it('should render heading cell on user-defined column and heading row intersection', () => {
    isHeadingTableCell.mockImplementation(() => true);
    const headerCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
          headerCellTemplate={headerCellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeadingTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(headerCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        column: defaultDeps.template.tableViewCell.tableColumn.column,
      }));
  });

  it('should render row by using headerRowTemplate', () => {
    isHeadingTableRow.mockImplementation(() => true);
    const headerRowTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
          headerRowTemplate={headerRowTemplate}
        />
      </PluginHost>,
    );

    expect(isHeadingTableRow)
      .toBeCalledWith(defaultDeps.template.tableViewRow.tableRow);
    expect(headerRowTemplate)
      .toBeCalledWith(defaultDeps.template.tableViewRow);
  });
});
