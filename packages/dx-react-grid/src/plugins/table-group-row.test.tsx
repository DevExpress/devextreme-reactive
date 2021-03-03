import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  tableGroupCellColSpanGetter,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupIndentStubTableCell,
  isGroupTableRow,
  isGroupRowOrdinaryCell,
  isRowSummaryCell,
  getColumnSummaries,
  calculateGroupCellIndent,
  TABLE_FLEX_TYPE,
} from '@devexpress/dx-grid-core';
import { TableGroupRow, defaultMessages } from './table-group-row';
import { TableSummaryContent } from '../components/summary/table-summary-content';
import { flattenGroupInlineSummaries } from '../components/summary/group-summaries';
import { TableColumnsWithGrouping } from './internal';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...jest.requireActual('@devexpress/dx-grid-core'),
  tableColumnsWithGrouping: jest.fn(),
  tableRowsWithGrouping: jest.fn(),
  tableGroupCellColSpanGetter: jest.fn(),
  isGroupTableCell: jest.fn(),
  isGroupIndentTableCell: jest.fn(),
  isGroupIndentStubTableCell: jest.fn(),
  isGroupTableRow: jest.fn(),
  calculateGroupCellIndent: jest.fn(),
  isGroupRowOrdinaryCell: jest.fn(),
  isRowSummaryCell: jest.fn(),
  getColumnSummaries: jest.fn(),
}));

jest.mock('@devexpress/dx-core', () => ({
  ...jest.requireActual('@devexpress/dx-core'),
  getMessagesFormatter: jest.fn().mockReturnValue(() => {}),
}));

jest.mock('../components/summary/group-summaries', () => ({
  flattenGroupInlineSummaries: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }, { name: 'b' }],
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
    tableBodyRows: [{ type: 'undefined', id: 1, row: 'row' }],
    grouping: [{ columnName: 'a' }],
    draftGrouping: [{ columnName: 'a' }, { columnName: 'b' }],
    expandedGroups: [],
    isGroupRow: () => false,
    getTableCellColSpan: () => 1,
    groupSummaryItems: [],
    groupSummaryValues: { compoundKey: 5 },
  },
  action: {
    toggleGroupExpanded: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', id: 1, row: { compoundKey: 'compoundKey' } },
      tableColumn: { type: 'undefined', id: 1, column: { name: 'a' } },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', id: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['GroupingState', 'Table'],
};

const defaultProps = {
  cellComponent: () => null,
  contentComponent: () => null,
  iconComponent: () => null,
  containerComponent: ({ children }) => children,
  indentCellComponent: () => null,
  rowComponent: () => null,
  summaryCellComponent: ({ children }) => children,
  summaryItemComponent: () => null,
  inlineSummaryComponent: () => null,
  inlineSummaryItemComponent: () => null,
  stubCellComponent: () => null,
  indentColumnWidth: 100,
  messages: {},
  formatlessSummaryTypes: [],
  contentCellPadding: 'contentCellPadding',
};

describe('TableGroupRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    tableColumnsWithGrouping.mockImplementation(() => 'tableColumnsWithGrouping');
    tableRowsWithGrouping.mockImplementation(() => 'tableRowsWithGrouping');
    tableGroupCellColSpanGetter.mockImplementation(() => 'tableGroupCellColSpanGetter');
    isGroupTableCell.mockImplementation(() => false);
    isGroupIndentTableCell.mockImplementation(() => false);
    isGroupIndentStubTableCell.mockImplementation(() => false);
    isGroupTableRow.mockImplementation(() => false);
    flattenGroupInlineSummaries.mockReturnValue('flattenGroupInlineSummaries');
    calculateGroupCellIndent.mockReturnValue('groupCellIndent');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters extending', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithGrouping');
      expect(tableRowsWithGrouping)
        .toBeCalledWith(defaultDeps.getter.tableBodyRows, defaultDeps.getter.isGroupRow);
    });

    it('should render TableColumnsWithGrouping', () => {
      const columnExtensions = [];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      expect(tree.find(TableColumnsWithGrouping).props())
        .toEqual({
          columnExtensions,
          indentColumnWidth: 100,
          showColumnsWhenGrouped: false,
        });
    });

    it('should extend getTableCellColSpan without the Virtual Table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getTableCellColSpan)
        .toBe('tableGroupCellColSpanGetter');
      expect(tableGroupCellColSpanGetter)
        .toBeCalledWith(
          defaultDeps.getter.getTableCellColSpan,
          defaultDeps.getter.groupSummaryItems,
          undefined,
        );
    });

    it('should extend getTableCellColSpan with the Virtual Table', () => {
      const viewport = { columns: [[0, 1]] };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents({
            ...defaultDeps,
            getter: {
              ...defaultDeps.getter, viewport,
            },
          })}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getTableCellColSpan)
        .toBe('tableGroupCellColSpanGetter');
      expect(tableGroupCellColSpanGetter)
        .toBeCalledWith(
          defaultDeps.getter.getTableCellColSpan,
          defaultDeps.getter.groupSummaryItems,
          viewport.columns[0][0],
        );
    });
  });

  describe('hide grouping column', () => {
    it('should all columns be hidden', () => {
      const deps = {
        getter: {
          columns: [
            { name: 'A' },
            { name: 'B' },
          ],
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableGroupRow
            {...defaultProps}
            showColumnsWhenGrouped
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      const showColumnWhenGrouped = tableColumnsWithGrouping.mock.calls[0][5];
      expect(showColumnWhenGrouped('A')).toBeTruthy();
      expect(showColumnWhenGrouped('B')).toBeTruthy();
    });

    it('should keep column in table if column value specified', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
            showColumnsWhenGrouped={false}
            columnExtensions={[
              { columnName: 'A', showWhenGrouped: true },
            ]}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      const showColumnWhenGrouped = tableColumnsWithGrouping.mock.calls[0][5];
      expect(showColumnWhenGrouped('A')).toBeTruthy();
      expect(showColumnWhenGrouped('B')).toBeFalsy();
    });
  });

  // tslint:disable-next-line: max-line-length
  it('should render groupIndent cell on select group column and foreign group row intersection', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupIndentTableCell.mockImplementation(() => true);

    const indentCellComponent = () => null;

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
          indentCellComponent={indentCellComponent}
        />
      </PluginHost>
    ));

    expect(isGroupIndentTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
        defaultDeps.getter.grouping,
      );

    expect(tree.find(indentCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  // tslint:disable-next-line: max-line-length
  it('should render indent stub cell on select group column and foreign group row intersection', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupIndentStubTableCell.mockImplementation(() => true);

    const StubCell = () => null;

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Template
          name="tableCell"
        >
          {params => <StubCell {...params}/>}
        </Template>
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isGroupIndentStubTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
        defaultDeps.getter.grouping,
      );
    expect(tree.find(StubCell).exists());
  });

  // tslint:disable-next-line: max-line-length
  it('should pass correct props to indent stub cell', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupIndentStubTableCell.mockImplementation(() => true);

    const StubCell = () => null;

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Template
          name="tableCell"
        >
          {params => <StubCell {...params}/>}
        </Template>
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(StubCell).props())
      .toMatchObject({
        tableRow: defaultDeps.template.tableCell.tableRow,
        tableColumn: defaultDeps.template.tableCell.tableColumn,
        style: {},
      });
  });

  describe('cellComponent', () => {
    it('should render group cell on select group column and group row intersection', () => {
      isGroupTableRow.mockImplementation(() => true);
      isGroupTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isGroupTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
        );
      expect(tree.find(defaultProps.cellComponent).props())
        .toMatchObject({
          ...defaultDeps.template.tableCell,
          row: defaultDeps.template.tableCell.tableRow.row,
          column: defaultDeps.template.tableCell.tableColumn.column,
        });
    });

    it('should provide correct cell params', () => {
      isGroupTableRow.mockImplementation(() => true);
      isGroupTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          expandedGroups: [],
        },
        template: {
          tableCell: {
            tableRow: { row: { compoundKey: '1' } },
            tableColumn: { column: { name: 'a' } },
          },
        },
      };
      jest.spyOn(deps.getter.expandedGroups, 'indexOf').mockReturnValue(1);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(tree.find(defaultProps.cellComponent).props())
        .toMatchObject({
          expanded: true,
          onToggle: expect.any(Function),
        });
      expect(deps.getter.expandedGroups.indexOf)
        .toBeCalledWith('1');

      tree.find(defaultProps.cellComponent).props().onToggle();
      expect(defaultDeps.action.toggleGroupExpanded.mock.calls[0][0])
        .toEqual({ groupKey: '1' });
    });
  });

  it('should provide components to a cell', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        contentComponent: defaultProps.contentComponent,
        iconComponent: defaultProps.iconComponent,
        inlineSummaryComponent: defaultProps.inlineSummaryComponent,
        inlineSummaryItemComponent: defaultProps.inlineSummaryItemComponent,
      });
  });

  it('should calculate cell fixed position', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        position: 'calc(groupCellIndentpx + contentCellPadding)',
        side: 'left',
      });
  });

  it('can render custom formatted data in group row cell', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    const valueFormatterTemplatePlaceholder = tree
      .find('TemplatePlaceholderBase')
      .findWhere(node => node.prop('name') === 'valueFormatter').last();

    expect(valueFormatterTemplatePlaceholder.prop('params'))
      .toMatchObject({
        column: defaultDeps.template.tableCell.tableColumn.column,
        value: defaultDeps.template.tableCell.tableRow.row.value,
      });
  });

  it('should render row by using rowComponent', () => {
    isGroupTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isGroupTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        row: defaultDeps.template.tableRow.tableRow.row,
      });
  });

  describe('Group summary', () => {
    const columnSummaries = [];
    beforeEach(() => {
      isGroupTableRow.mockImplementation(() => true);
      isGroupRowOrdinaryCell.mockReturnValue(true);
      isRowSummaryCell.mockReturnValue(true);
      getColumnSummaries.mockReturnValue(columnSummaries);
    });

    it('should render group summary cell in an oridinary cell if column contains summary', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isGroupRowOrdinaryCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
        );
      expect(isRowSummaryCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
          defaultDeps.getter.grouping,
          defaultDeps.getter.groupSummaryItems,
        );
      expect(tree.find(defaultProps.summaryCellComponent).props())
        .toMatchObject({
          ...defaultDeps.template.tableCell,
          row: defaultDeps.template.tableCell.tableRow.row,
          column: defaultDeps.template.tableCell.tableColumn.column,
          onToggle: expect.any(Function),
        });
    });

    it('should render a summary content component', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(TableSummaryContent).props())
        .toMatchObject({
          column: defaultDeps.template.tableCell.tableColumn.column,
          columnSummaries,
          formatlessSummaryTypes: defaultProps.formatlessSummaryTypes,
          itemComponent: defaultProps.summaryItemComponent,
          messages: defaultProps.messages,
        });
    });

    it('should calculate column summaries', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      const summaryPredicate = getColumnSummaries.mock.calls[0][3];
      expect(summaryPredicate({ showInGroupFooter: false, alignByColumn: true }))
        .toBeTruthy();
      expect(summaryPredicate({ showInGroupFooter: true }))
        .toBeFalsy();
      expect(getColumnSummaries)
        .toBeCalledWith(
          defaultDeps.getter.groupSummaryItems,
          defaultDeps.template.tableCell.tableColumn.column.name,
          5,
          expect.any(Function),
        );
    });

    it('should pass a correct onToggle handler', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));
      const onToggle = tree.find(defaultProps.summaryCellComponent)
        .prop('onToggle');
      defaultDeps.action.toggleGroupExpanded.mockClear();

      onToggle();

      expect(defaultDeps.action.toggleGroupExpanded)
        .toBeCalledWith(
          { groupKey: defaultDeps.template.tableCell.tableRow.row.compoundKey },
          expect.any(Object), // getters
          expect.any(Object), // actions
        );
    });

    it('should render stub cell on group row and flex column intersection', () => {
      isRowSummaryCell.mockReturnValue(false);
      const tableColumn = { type: TABLE_FLEX_TYPE };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents({
            ...defaultDeps,
            template: {
              ...defaultDeps.template,
              tableCell: {
                tableColumn,
              },
            },
          })}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.stubCellComponent).props())
        .toEqual({
          tableColumn,
          onToggle: expect.any(Function),
        });
    });
  });

  describe('Inline summary', () => {
    beforeEach(() => {
      isGroupTableRow.mockImplementation(() => true);
      isGroupTableCell.mockImplementation(() => true);
    });

    it('should compute inline summaries', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.cellComponent).props())
        .toMatchObject({
          inlineSummaries: 'flattenGroupInlineSummaries',
        });
      expect(flattenGroupInlineSummaries)
        .toBeCalledWith(
          defaultDeps.getter.columns,
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.getter.groupSummaryItems,
          defaultDeps.getter.groupSummaryValues,
          expect.any(Array),
        );
    });

    it('should provide getMessage function', () => {
      getMessagesFormatter.mockReturnValue(key => key.toUpperCase());
      const messages = { minOf: 'min of' };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
            messages={messages}
          />
        </PluginHost>
      ));

      expect(getMessagesFormatter)
        .toBeCalledWith({ ...defaultMessages, ...messages });

      const getMessage = tree
        .find(defaultProps.cellComponent)
        .prop('getMessage');
      expect(getMessage('min'))
        .toBe('MIN');
    });
  });
});
