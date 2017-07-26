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

const defaultPluginProps = {
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
          <Getter name="getRowId" value="getRowId" />
          <TableRowDetail
            {...defaultPluginProps}
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
        .toBeCalledWith('tableBodyRows', 'expandedRows', 'getRowId', 120);
      expect(tableBodyRows)
        .toBe('tableRowsWithExpandedDetail');
    });

    it('should extend tableColumns', () => {
      let tableColumns = null;
      mount(
        <PluginHost>
          <Getter name="tableColumns" value="tableColumns" />

          <TableRowDetail
            {...defaultPluginProps}
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

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: { id: 0 } }, column: 'column', style: {} }}
          />
        </Template>
        <TableRowDetail
          {...defaultPluginProps}
          detailToggleCellTemplate={detailToggleCellTemplate}
        />
      </PluginHost>,
    );

    expect(isDetailToggleTableCell)
      .toBeCalledWith({ original: { id: 0 } }, 'column');
    expect(detailToggleCellTemplate)
      .not.toBeCalledWith(expect.objectContaining({ column: 'column' }));
    expect(detailToggleCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        row: { id: 0 },
        style: {},
      }));
  });

  it('should render detail cell on detail row', () => {
    isDetailTableRow.mockImplementation(() => true);

    const detailCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: { id: 0 } }, column: 'column', style: {}, colspan: 3 }}
          />
        </Template>
        <TableRowDetail
          {...defaultPluginProps}
          detailCellTemplate={detailCellTemplate}
        />
      </PluginHost>,
    );

    expect(isDetailTableRow)
      .toBeCalledWith({ original: { id: 0 } });
    expect(detailCellTemplate)
      .not.toBeCalledWith(expect.objectContaining({ column: 'column' }));
    expect(detailCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        row: { id: 0 },
        style: {},
        colspan: 3,
      }));
  });
});
