import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableRowsWithExpandedDetail,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
} from '@devexpress/dx-grid-core';
import { TableRowDetail } from './table-row-detail';
import { pluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithExpandedDetail: jest.fn(),
  isDetailRowExpanded: jest.fn(),
  tableColumnsWithDetail: jest.fn(),
  isDetailToggleTableCell: jest.fn(),
  isDetailTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', column: 'column' }],
    tableBodyRows: [{ type: 'undefined', rowId: 1, row: 'row' }],
    expandedRows: { onClick: () => {} },
  },
  action: {
    setDetailRowExpanded: jest.fn(),
  },
  template: {
    tableViewCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
  },
};

const defaultProps = {
  detailToggleCellTemplate: () => null,
  detailCellTemplate: () => null,
  detailToggleCellWidth: 100,
};

describe('TableRowDetail', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableRowsWithExpandedDetail.mockImplementation(() => 'tableRowsWithExpandedDetail');
    isDetailRowExpanded.mockImplementation(() => false);
    tableColumnsWithDetail.mockImplementation(() => 'tableColumnsWithDetail');
    isDetailToggleTableCell.mockImplementation(() => false);
    isDetailTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      const deps = {};
      mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableRowDetail
            {...defaultProps}
            rowHeight={120}
          />
        </PluginHost>,
      );

      expect(deps.computedGetter('tableBodyRows'))
        .toBe('tableRowsWithExpandedDetail');
      expect(tableRowsWithExpandedDetail)
        .toBeCalledWith(defaultDeps.getter.tableBodyRows, defaultDeps.getter.expandedRows, 120);
    });

    it('should extend tableColumns', () => {
      const deps = {};
      mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableRowDetail
            {...defaultProps}
            detailToggleCellWidth={120}
          />
        </PluginHost>,
      );

      expect(deps.computedGetter('tableColumns'))
        .toBe('tableColumnsWithDetail');
      expect(tableColumnsWithDetail)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });
  });

  it('should render detailToggle cell on detail column and user-defined row intersection', () => {
    isDetailToggleTableCell.mockImplementation(() => true);
    const detailToggleCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableRowDetail
          {...defaultProps}
          detailToggleCellTemplate={detailToggleCellTemplate}
        />
      </PluginHost>,
    );

    expect(isDetailToggleTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(detailToggleCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
      }));
  });

  it('should render detail cell on detail row', () => {
    isDetailTableRow.mockImplementation(() => true);
    const detailCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableRowDetail
          {...defaultProps}
          detailCellTemplate={detailCellTemplate}
        />
      </PluginHost>,
    );

    expect(isDetailTableRow)
      .toBeCalledWith(defaultDeps.template.tableViewCell.tableRow);
    expect(detailCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
      }));
  });
});
