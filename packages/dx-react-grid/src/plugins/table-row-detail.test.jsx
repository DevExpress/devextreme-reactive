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
import { pluginDepsToComponents, getComputedState } from './test-utils';

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
    tableViewRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['TableView'],
};

const defaultProps = {
  detailToggleCellTemplate: () => null,
  detailCellTemplate: () => null,
  detailRowTemplate: () => null,
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
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableRowDetail
            {...defaultProps}
            rowHeight={120}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableBodyRows)
        .toBe('tableRowsWithExpandedDetail');
      expect(tableRowsWithExpandedDetail)
        .toBeCalledWith(defaultDeps.getter.tableBodyRows, defaultDeps.getter.expandedRows, 120);
    });

    it('should extend tableColumns', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableRowDetail
            {...defaultProps}
            detailToggleCellWidth={120}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableColumns)
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
  it('should render row by using detailRowTemplate', () => {
    isDetailTableRow.mockImplementation(() => true);
    const detailRowTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableRowDetail
          {...defaultProps}
          detailRowTemplate={detailRowTemplate}
        />
      </PluginHost>,
    );

    expect(isDetailTableRow).toBeCalledWith(defaultDeps.template.tableViewRow.tableRow);
    expect(detailRowTemplate).toBeCalledWith(expect.objectContaining({
      ...defaultDeps.template.tableViewRow,
      row: defaultDeps.template.tableViewRow.tableRow.row,
    }));
  });
});
