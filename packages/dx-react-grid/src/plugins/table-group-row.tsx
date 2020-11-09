import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Getter, Template, Plugin, TemplatePlaceholder, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import {
  tableRowsWithGrouping,
  tableGroupCellColSpanGetter,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
  TABLE_GROUP_TYPE,
  getColumnSummaries,
  defaultFormatlessSummaries,
  isPreviousCellContainSummary,
  isRowSummaryCell,
  isGroupRowOrdinaryCell,
  calculateGroupCellIndent,
  isGroupIndentStubTableCell,
  GroupSummaryItem,
  TABLE_FLEX_TYPE,
} from '@devexpress/dx-grid-core';
import { TableColumnsWithGrouping } from './internal';
import {
  TableGroupRowProps, TableCellProps, TableRowProps,
} from '../types';
import { TableSummaryContent } from '../components/summary/table-summary-content';
import { flattenGroupInlineSummaries } from '../components/summary/group-summaries';

const pluginDependencies = [
  { name: 'GroupingState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
  { name: 'SummaryState', optional: true },
  { name: 'CustomSummary', optional: true },
  { name: 'IntegratedSummary', optional: true },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
  { name: 'TableSelection', optional: true },
];
const side = 'left';

/** @internal */
export const defaultMessages = {
  countOf: 'Count: ',
  sumOf: 'Sum of {columnTitle} is ',
  maxOf: 'Max of {columnTitle} is ',
  minOf: 'Min of {columnTitle} is ',
  avgOf: 'Avg of {columnTitle} is ',
};

const tableBodyRowsComputed = (
  { tableBodyRows, isGroupRow }: Getters,
) => tableRowsWithGrouping(tableBodyRows, isGroupRow);
const getCellColSpanComputed = (
  { getTableCellColSpan, groupSummaryItems, viewport }: Getters,
) => {
  const firstVisibleColumn = viewport?.columns[0][0];
  return tableGroupCellColSpanGetter(getTableCellColSpan, groupSummaryItems, firstVisibleColumn);
};

class TableGroupRowBase extends React.PureComponent<TableGroupRowProps> {
  static ROW_TYPE = TABLE_GROUP_TYPE;
  static COLUMN_TYPE = TABLE_GROUP_TYPE;
  static defaultProps = {
    showColumnsWhenGrouped: false,
    formatlessSummaryTypes: [],
  };
  static components = {
    rowComponent: 'Row',
    cellComponent: 'Cell',
    contentComponent: 'Content',
    iconComponent: 'Icon',
    containerComponent: 'Container',
    indentCellComponent: 'IndentCell',
    inlineSummaryComponent: 'InlineSummary',
    inlineSummaryItemComponent: 'InlineSummaryItem',
    summaryCellComponent: 'SummaryCell',
    summaryItemComponent: 'SummaryItem',
    stubCellComponent: 'StubCell',
  };

  render() {
    const {
      cellComponent: GroupCell,
      contentComponent: Content,
      iconComponent: Icon,
      rowComponent: GroupRow,
      containerComponent: Container,
      indentCellComponent: GroupIndentCell,
      inlineSummaryComponent: InlineSummary,
      inlineSummaryItemComponent: InlineSummaryItem,
      summaryCellComponent: SummaryCell,
      summaryItemComponent: SummaryItem,
      stubCellComponent: StubCell,
      indentColumnWidth,
      contentCellPadding,
      showColumnsWhenGrouped,
      columnExtensions,
      messages,
      formatlessSummaryTypes,
    } = this.props;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    return (
      <Plugin
        name="TableGroupRow"
        dependencies={pluginDependencies}
      >
        <TableColumnsWithGrouping
          columnExtensions={columnExtensions}
          showColumnsWhenGrouped={showColumnsWhenGrouped}
          indentColumnWidth={indentColumnWidth}
        />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="getTableCellColSpan" computed={getCellColSpanComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow }: any) => isGroupTableRow(tableRow)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {(
                {
                  grouping, expandedGroups, groupSummaryItems, groupSummaryValues, columns,
                },
                { toggleGroupExpanded },
              ) => {
                if (isGroupTableCell(params.tableRow, params.tableColumn)) {
                  const formatlessSummaries = defaultFormatlessSummaries
                    .concat(formatlessSummaryTypes!);

                  const inlineSummaries = groupSummaryItems
                    ? flattenGroupInlineSummaries(
                      columns, params.tableRow, groupSummaryItems,
                      groupSummaryValues, formatlessSummaries,
                    ) : [];
                  const cellIndent = calculateGroupCellIndent(
                    params.tableColumn, grouping, indentColumnWidth,
                  );
                  const contentIndent = `calc(${cellIndent}px + ${contentCellPadding})`;

                  return (
                    <TemplatePlaceholder
                      name="valueFormatter"
                      params={{
                        column: params.tableColumn.column,
                        value: params.tableRow.row.value,
                      }}
                    >
                      {content => (
                        <GroupCell
                          {...params}
                          contentComponent={Content}
                          iconComponent={Icon}
                          containerComponent={Container}
                          row={params.tableRow.row}
                          column={params.tableColumn.column!}
                          expanded={expandedGroups.indexOf(params.tableRow.row.compoundKey) !== -1}
                          onToggle={
                            () => toggleGroupExpanded({ groupKey: params.tableRow.row.compoundKey })
                          }
                          inlineSummaries={inlineSummaries}
                          inlineSummaryComponent={InlineSummary}
                          inlineSummaryItemComponent={InlineSummaryItem}
                          getMessage={getMessage}
                          position={contentIndent}
                          side={side}
                        >
                          {content}
                        </GroupCell>
                      )}
                    </TemplatePlaceholder>
                  );
                }
                if (isGroupIndentTableCell(params.tableRow, params.tableColumn, grouping)) {
                  const fixedProps = {
                    side,
                    position: calculateGroupCellIndent(
                      params.tableColumn, grouping, indentColumnWidth,
                    ),
                  };
                  if (GroupIndentCell) {
                    return (
                      <GroupIndentCell
                        {...params}
                        {...fixedProps}
                        row={params.tableRow.row}
                        column={params.tableColumn.column!}
                      />
                    );
                  }
                  return <TemplatePlaceholder params={fixedProps} />;
                }
                if (isGroupIndentStubTableCell(params.tableRow, params.tableColumn, grouping)) {
                  return <TemplatePlaceholder params={params} />;
                }
                return null;
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({
            tableRow, tableColumn,
          }: any) => (isGroupRowOrdinaryCell(tableRow, tableColumn))}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {(
                {
                  groupSummaryItems, groupSummaryValues, grouping, tableColumns,
                },
                { toggleGroupExpanded },
              ) => {
                const { tableColumn, tableRow } = params;
                const onToggle = () => toggleGroupExpanded({ groupKey: tableRow.row.compoundKey });

                if (isRowSummaryCell(tableRow, tableColumn, grouping, groupSummaryItems)) {
                  const columnSummaries = getColumnSummaries(
                    groupSummaryItems,
                    tableColumn.column!.name,
                    groupSummaryValues[tableRow.row.compoundKey],
                    summaryItem => (
                      !(summaryItem as GroupSummaryItem).showInGroupFooter! &&
                      (summaryItem as GroupSummaryItem).alignByColumn!
                    ),
                  );

                  return (
                    <SummaryCell
                      {...params}
                      row={params.tableRow.row}
                      column={params.tableColumn.column!}
                      onToggle={onToggle}
                    >
                      <TableSummaryContent
                        column={tableColumn.column!}
                        columnSummaries={columnSummaries}
                        formatlessSummaryTypes={formatlessSummaryTypes!}
                        itemComponent={SummaryItem}
                        messages={messages!}
                      />
                    </SummaryCell>
                  );
                }

                // NOTE: ensure that right-aligned summary will fit into a column
                if (isPreviousCellContainSummary(
                  tableRow, tableColumn, tableColumns, grouping, groupSummaryItems,
                ) || TABLE_FLEX_TYPE === tableColumn.type) {
                  return <StubCell {...params} onToggle={onToggle} />;
                }

                return <TemplatePlaceholder />;
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => isGroupTableRow(tableRow)}
        >
          {(params: TableRowProps) => (
            <GroupRow
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders group rows and enables them to expand and collapse. */
export const TableGroupRow: React.ComponentType<TableGroupRowProps> & {
  /** The group column type's identifier. */
  COLUMN_TYPE: symbol;
  /** The group row type's identifier. */
  ROW_TYPE: symbol;
} = TableGroupRowBase;
