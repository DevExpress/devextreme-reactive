import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  PluginHost,
} from '@devexpress/dx-react-core';
import {
  tableRowsWithExpandedDetail,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
} from '@devexpress/dx-grid-core';
import { TableRowDetail } from './table-row-detail';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithExpandedDetail: jest.fn(),
  isDetailRowExpanded: jest.fn(),
  tableColumnsWithDetail: jest.fn(),
  isDetailToggleTableCell: jest.fn(),
  isDetailTableRow: jest.fn(),
}));

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
      let tableBodyRows = null;
      mount(
        <PluginHost>
          <Getter name="tableBodyRows" value="tableBodyRows" />
          <Getter name="expandedRows" value="expandedRows" />
          <TableRowDetail
            {...defaultProps}
            rowHeight={120}
          />
          <Template
            name="root"
            connectGetters={getter => (tableBodyRows = getter('tableBodyRows'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableRowsWithExpandedDetail)
        .toBeCalledWith('tableBodyRows', 'expandedRows', 120);
      expect(tableBodyRows)
        .toBe('tableRowsWithExpandedDetail');
    });

    it('should extend tableColumns', () => {
      let tableColumns = null;
      mount(
        <PluginHost>
          <Getter name="tableColumns" value="tableColumns" />

          <TableRowDetail
            {...defaultProps}
            detailToggleCellWidth={120}
          />
          <Template
            name="root"
            connectGetters={getter => (tableColumns = getter('tableColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableColumnsWithDetail)
        .toBeCalledWith('tableColumns', 120);
      expect(tableColumns)
        .toBe('tableColumnsWithDetail');
    });
  });

  it('should render detailToggle cell on detail column and user-defined row intersection', () => {
    isDetailToggleTableCell.mockImplementation(() => true);

    const detailToggleCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={tableCellArgs}
          />
        </Template>
        <TableRowDetail
          {...defaultProps}
          detailToggleCellTemplate={detailToggleCellTemplate}
        />
      </PluginHost>,
    );

    expect(isDetailToggleTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(detailToggleCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
      }));
  });

  it('should render detail cell on detail row', () => {
    isDetailTableRow.mockImplementation(() => true);

    const detailCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {}, colspan: 4 };

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={tableCellArgs}
          />
        </Template>
        <TableRowDetail
          {...defaultProps}
          detailCellTemplate={detailCellTemplate}
        />
      </PluginHost>,
    );

    expect(isDetailTableRow)
      .toBeCalledWith(tableCellArgs.tableRow);
    expect(detailCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
      }));
  });
});
