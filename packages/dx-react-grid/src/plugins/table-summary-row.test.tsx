import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  tableRowsWithSummaries,
  tableRowsWithTotalSummaries,
  isTotalSummaryTableCell,
  isGroupSummaryTableCell,
  isTreeSummaryTableCell,
  isTotalSummaryTableRow,
  isGroupSummaryTableRow,
  isTreeSummaryTableRow,
  getColumnSummaries,
} from '@devexpress/dx-grid-core';
import { TableSummaryRow } from './table-summary-row';

jest.mock('@devexpress/dx-core', () => ({
  ...jest.requireActual('@devexpress/dx-core'),
  getMessagesFormatter: jest.fn(),
}));

jest.mock('@devexpress/dx-grid-core', () => ({
  ...jest.requireActual('@devexpress/dx-grid-core'),
  tableRowsWithSummaries: jest.fn(),
  tableRowsWithTotalSummaries: jest.fn(),
  isTotalSummaryTableCell: jest.fn(),
  isGroupSummaryTableCell: jest.fn(),
  isTreeSummaryTableCell: jest.fn(),
  isTotalSummaryTableRow: jest.fn(),
  isGroupSummaryTableRow: jest.fn(),
  isTreeSummaryTableRow: jest.fn(),
  getColumnSummaries: jest.fn(),
}));

const defaultDeps = {
  getter: {
    totalSummaryItems: [{ columnName: 'a', type: 'count' }],
    groupSummaryItems: [{ columnName: 'a', type: 'sum' }],
    treeSummaryItems: [{ columnName: 'a', type: 'max' }],
    totalSummaryValues: [10],
    groupSummaryValues: { g: [20] },
    treeSummaryValues: { 1: [30] },
    tableBodyRows: [{ a: 1 }],
    tableFooterRows: [{ a: 2 }],
    getRowLevelKey: () => '1',
    isGroupRow: () => false,
    getRowId: () => 1,
    getTreeRowLevel: () => 3,
  },
  action: {
    toggleRowExpanded: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: { value: 'value', compoundKey: 'g' } },
      tableColumn: { type: 'undefined', rowId: 1, column: { name: 'a' } },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['SummaryState', 'Table'],
};

const defaultProps = {
  totalRowComponent: () => null,
  groupRowComponent: () => null,
  treeRowComponent: () => null,
  totalCellComponent: ({ children }) => children,
  groupCellComponent: ({ children }) => children,
  treeCellComponent: ({ children }) => children,
  treeColumnCellComponent: ({ children }) => children,
  treeColumnContentComponent: ({ children }) => children,
  treeColumnIndentComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  itemComponent: ({ children, type, getMessage }) => (
    <div>
      {getMessage(type)}
      =
      {children}
    </div>
  ),
};

describe('TableSummaryRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
    tableRowsWithSummaries.mockImplementation(() => 'tableRowsWithSummaries');
    tableRowsWithTotalSummaries.mockImplementation(() => 'tableRowsWithTotalSummaries');
    isTotalSummaryTableCell.mockImplementation(() => false);
    isGroupSummaryTableCell.mockImplementation(() => false);
    isTreeSummaryTableCell.mockImplementation(() => false);
    isTotalSummaryTableRow.mockImplementation(() => false);
    isGroupSummaryTableRow.mockImplementation(() => false);
    isTreeSummaryTableRow.mockImplementation(() => false);
    getColumnSummaries.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableSummaryRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithSummaries');
      expect(tableRowsWithSummaries)
        .toBeCalledWith(
          defaultDeps.getter.tableBodyRows,
          defaultDeps.getter.groupSummaryItems,
          defaultDeps.getter.treeSummaryItems,
          defaultDeps.getter.getRowLevelKey,
          defaultDeps.getter.isGroupRow,
          defaultDeps.getter.getRowId,
        );
    });

    it('should extend tableFooterRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableSummaryRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableFooterRows)
        .toBe('tableRowsWithTotalSummaries');
      expect(tableRowsWithTotalSummaries)
        .toBeCalledWith(
          defaultDeps.getter.tableFooterRows,
        );
    });

    it('should not extend tableFooterRows if "totalSummaryItems" is empty array', () => {
      const deps = { ...defaultDeps, getter: { ...defaultDeps.getter, totalSummaryItems: [] } };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(deps)}
          <TableSummaryRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tableRowsWithTotalSummaries).not.toHaveBeenCalled();
    });
  });

  it('should render total summary row', () => {
    isTotalSummaryTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSummaryRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isTotalSummaryTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.totalRowComponent).props())
      .toMatchObject(defaultDeps.template.tableRow);
  });

  it('should render group summary row', () => {
    isGroupSummaryTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSummaryRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isGroupSummaryTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.groupRowComponent).props())
      .toMatchObject(defaultDeps.template.tableRow);
  });

  it('should render tree summary row', () => {
    isTreeSummaryTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSummaryRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isTreeSummaryTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.treeRowComponent).props())
      .toMatchObject(defaultDeps.template.tableRow);
  });

  // tslint:disable-next-line: max-line-length
  it('should render total summary cell on user-defined column and total summary row intersection', () => {
    isTotalSummaryTableCell.mockImplementation(() => true);
    getColumnSummaries.mockImplementation(() => [{ type: 'count', value: 10 }]);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSummaryRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isTotalSummaryTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.totalCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
    expect(getColumnSummaries)
      .toBeCalledWith(
        defaultDeps.getter.totalSummaryItems,
        defaultDeps.template.tableCell.tableColumn.column.name,
        defaultDeps.getter.totalSummaryValues,
      );
    expect(tree.find(defaultProps.itemComponent).text())
      .toBe('Count=10');
  });

  // tslint:disable-next-line: max-line-length
  it('should render group summary cell on user-defined column and group summary row intersection', () => {
    isGroupSummaryTableCell.mockImplementation(() => true);
    getColumnSummaries.mockImplementation(() => [{ type: 'sum', value: 20 }]);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSummaryRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isGroupSummaryTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.groupCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
    expect(getColumnSummaries)
      .toBeCalledWith(
        defaultDeps.getter.groupSummaryItems,
        defaultDeps.template.tableCell.tableColumn.column.name,
        defaultDeps.getter.groupSummaryValues.g,
        expect.any(Function),
      );
    expect(tree.find(defaultProps.itemComponent).text())
      .toBe('Sum=20');
  });

  // tslint:disable-next-line: max-line-length
  it('should render tree summary cell on user-defined column and tree summary row intersection', () => {
    isTreeSummaryTableCell.mockImplementation(() => true);
    getColumnSummaries.mockImplementation(() => [{ type: 'max', value: 30 }]);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSummaryRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isTreeSummaryTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.treeCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
    expect(getColumnSummaries)
      .toBeCalledWith(
        defaultDeps.getter.treeSummaryItems,
        defaultDeps.template.tableCell.tableColumn.column.name,
        defaultDeps.getter.treeSummaryValues[1],
      );
    expect(tree.find(defaultProps.itemComponent).text())
      .toBe('Max=30');
  });

  it('should render tree summary cell on tree column and tree summary row intersection', () => {
    isTreeSummaryTableCell.mockImplementation(() => true);
    getColumnSummaries.mockImplementation(() => [{ type: 'max', value: 30 }]);

    const deps = {
      getter: {
        tableTreeColumnName: 'a',
      },
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableSummaryRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isTreeSummaryTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.treeColumnCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
    expect(tree.find(defaultProps.treeColumnIndentComponent).props())
      .toMatchObject({
        level: 3,
      });
    expect(tree.find(defaultProps.treeColumnContentComponent).exists())
      .toBeTruthy();
    expect(getColumnSummaries)
      .toBeCalledWith(
        defaultDeps.getter.treeSummaryItems,
        defaultDeps.template.tableCell.tableColumn.column.name,
        defaultDeps.getter.treeSummaryValues[1],
      );
    expect(tree.find(defaultProps.itemComponent).text())
      .toBe('Max=30');
  });

  describe('format value', () => {
    it('should render formatted value if valueFormatter is used', () => {
      getColumnSummaries.mockImplementation(() => [{ type: 'max', value: 30 }]);
      isTotalSummaryTableCell.mockImplementation(() => true);
      const { itemComponent, ...restProps } = defaultProps;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableSummaryRow
            {...restProps}
            itemComponent={() => null}
          />
        </PluginHost>
      ));

      const valueFormatterTemplatePlaceholder = tree
        .find('TemplatePlaceholderBase')
        .findWhere(node => node.prop('name') === 'valueFormatter').last();

      expect(valueFormatterTemplatePlaceholder.prop('params'))
        .toMatchObject({
          column: defaultDeps.template.tableCell.tableColumn.column,
          value: 30,
        });
    });

    const assertSummaryValueIsUnformatted = (props) => {
      isTotalSummaryTableCell.mockImplementation(() => true);
      const { itemComponent, ...restProps } = props;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableSummaryRow
            {...restProps}
            itemComponent={() => null}
          />
        </PluginHost>
      ));

      expect(tree
        .find('TemplatePlaceholder')
        .findWhere(node => node.prop('name') === 'valueFormatter').exists())
        .toBeFalsy();
    };

    // tslint:disable-next-line: max-line-length
    it('should render unformatted value if formatlessSummaryTypes contains the summary type', () => {
      getColumnSummaries.mockImplementation(() => [{ type: 'max', value: 30 }]);

      assertSummaryValueIsUnformatted({
        formatlessSummaryTypes: ['max'],
        ...defaultProps,
      });
    });

    it('should render unformatted value for "count" summary type', () => {
      getColumnSummaries.mockImplementation(() => [{ type: 'count', value: 30 }]);

      assertSummaryValueIsUnformatted({
        ...defaultProps,
      });
    });
  });
});
