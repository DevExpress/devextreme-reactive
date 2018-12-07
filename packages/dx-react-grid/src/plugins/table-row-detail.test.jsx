import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableRowsWithExpandedDetail,
  tableDetailCellColSpanGetter,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
  isDetailTableCell,
} from '@devexpress/dx-grid-core';
import { TableRowDetail } from './table-row-detail';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithExpandedDetail: jest.fn(),
  tableDetailCellColSpanGetter: jest.fn(),
  isDetailRowExpanded: jest.fn(),
  tableColumnsWithDetail: jest.fn(),
  isDetailToggleTableCell: jest.fn(),
  isDetailTableRow: jest.fn(),
  isDetailTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', column: 'column' }],
    tableBodyRows: [{ type: 'undefined', rowId: 1, row: 'row' }],
    expandedDetailRowIds: { onClick: () => {} },
    getTableCellColSpan: () => 1,
  },
  action: {
    toggleDetailRowExpanded: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['RowDetailState', 'Table'],
};

const defaultProps = {
  toggleCellComponent: () => null,
  cellComponent: ({ children }) => children,
  rowComponent: () => null,
  contentComponent: () => null,
  toggleColumnWidth: 100,
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
    tableDetailCellColSpanGetter.mockImplementation(() => 'tableDetailCellColSpanGetter');
    isDetailRowExpanded.mockImplementation(() => false);
    tableColumnsWithDetail.mockImplementation(() => 'tableColumnsWithDetail');
    isDetailToggleTableCell.mockImplementation(() => false);
    isDetailTableRow.mockImplementation(() => false);
    isDetailTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableRowDetail
            {...defaultProps}
            rowHeight={120}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithExpandedDetail');
      expect(tableRowsWithExpandedDetail)
        .toBeCalledWith(
          defaultDeps.getter.tableBodyRows,
          defaultDeps.getter.expandedDetailRowIds,
          120,
        );
    });

    it('should extend tableColumns', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableRowDetail
            {...defaultProps}
            toggleColumnWidth={120}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithDetail');
      expect(tableColumnsWithDetail)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });

    it('should extend getTableCellColSpan', () => {
      const tree = mount((

        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableRowDetail
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getTableCellColSpan)
        .toBe('tableDetailCellColSpanGetter');
      expect(tableDetailCellColSpanGetter)
        .toBeCalledWith(defaultDeps.getter.getTableCellColSpan);
    });
  });

  it('should render detailToggle cell on detail column and user-defined row intersection', () => {
    isDetailToggleTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableRowDetail
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isDetailToggleTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.toggleCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
      });
  });

  it('should render detail cell on detail row', () => {
    isDetailTableRow.mockImplementation(() => true);
    isDetailTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableRowDetail
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isDetailTableRow)
      .toBeCalledWith(defaultDeps.template.tableCell.tableRow);
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
      });
    expect(tree.find(defaultProps.contentComponent).props())
      .toMatchObject({
        row: defaultDeps.template.tableCell.tableRow.row,
      });
  });

  it('should render row by using rowComponent', () => {
    isDetailTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableRowDetail
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isDetailTableRow).toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        row: defaultDeps.template.tableRow.tableRow.row,
      });
  });
});
