import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Getter,
  Template,
  Plugin,
  TemplateConnector,
  TemplatePlaceholder,
  Getters,
} from '@devexpress/dx-react-core';
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
  TABLE_TREE_SUMMARY_TYPE,
  TABLE_GROUP_SUMMARY_TYPE,
  TABLE_TOTAL_SUMMARY_TYPE,
  ColumnSummary,
} from '@devexpress/dx-grid-core';
import { TableCellProps, TableRowProps, SummaryItemProps, TableSummaryRowProps } from '../types';

const dependencies = [
  { name: 'DataTypeProvider', optional: true },
  { name: 'SummaryState' },
  { name: 'CustomSummary', optional: true },
  { name: 'IntegratedSummary', optional: true },
  { name: 'Table' },
  { name: 'TableTreeColumn', optional: true },
];

const defaultMessages = {
  sum: 'Sum',
  min: 'Min',
  max: 'Max',
  avg: 'Avg',
  count: 'Count',
};

const tableBodyRowsComputed = ({
  tableBodyRows,
  getRowLevelKey,
  isGroupRow,
  getRowId,
  groupSummaryItems,
  treeSummaryItems,
}: Getters) => tableRowsWithSummaries(
  tableBodyRows, groupSummaryItems, treeSummaryItems, getRowLevelKey, isGroupRow, getRowId,
);
const tableFooterRowsComputed = ({
  tableFooterRows,
}: Getters) => tableRowsWithTotalSummaries(tableFooterRows);

const defaultTypelessSummaries = ['count'];

class TableSummaryRowBase extends React.PureComponent<TableSummaryRowProps> {
  static TREE_ROW_TYPE = TABLE_TREE_SUMMARY_TYPE;
  static GROUP_ROW_TYPE = TABLE_GROUP_SUMMARY_TYPE;
  static TOTAL_ROW_TYPE = TABLE_TOTAL_SUMMARY_TYPE;
  static defaultProps = {
    formatlessSummaryTypes: [],
    messages: {},
  };
  static components = {
    totalRowComponent: 'TotalRow',
    groupRowComponent: 'GroupRow',
    treeRowComponent: 'TreeRow',
    totalCellComponent: 'TotalCell',
    groupCellComponent: 'GroupCell',
    treeCellComponent: 'TreeCell',
    treeColumnCellComponent: 'TableTreeCell',
    treeColumnContentComponent: 'TableTreeContent',
    treeColumnIndentComponent: 'TableTreeIndent',
    itemComponent: 'Item',
  };

  renderContent(column, columnSummaries: ReadonlyArray<ColumnSummary>) {
    const {
      formatlessSummaryTypes,
      itemComponent: Item,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    const SummaryItem: React.SFC<SummaryItemProps> = ({ summary, children }) => (
      <Item
        getMessage={getMessage}
        type={summary.type}
        value={summary.value}
      >
        {children || String(summary.value)}
      </Item>
    );

    return (
      <>
        {columnSummaries.map((summary) => {
          if (summary.value === null
            || formatlessSummaryTypes.includes(summary.type)
            || defaultTypelessSummaries.includes(summary.type)) {
            return <SummaryItem key={summary.type} summary={summary} />;
          }
          return (
            <TemplatePlaceholder
              key={summary.type}
              name="valueFormatter"
              params={{
                column,
                value: summary.value,
              }}
            >
              {content => (
                <SummaryItem summary={summary}>
                  {content}
                </SummaryItem>
              )}
            </TemplatePlaceholder>
          );
        })}
      </>
    );
  }

  render() {
    const {
      totalRowComponent: TotalRow,
      groupRowComponent: GroupRow,
      treeRowComponent: TreeRow,
      totalCellComponent: TotalCell,
      groupCellComponent: GroupCell,
      treeCellComponent: TreeCell,
      treeColumnCellComponent: TreeColumnCell,
      treeColumnContentComponent: TreeColumnContent,
      treeColumnIndentComponent: TreeColumnIndent,
    } = this.props;

    return (
      <Plugin
        name="TableSummaryRow"
        dependencies={dependencies}
      >
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="tableFooterRows" computed={tableFooterRowsComputed} />
        <Template
          name="tableCell"
          predicate={(
            { tableRow, tableColumn }: any,
          ) => isTotalSummaryTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({ totalSummaryItems, totalSummaryValues }) => {
                const columnSummaries = getColumnSummaries(
                  totalSummaryItems,
                  params.tableColumn.column!.name,
                  totalSummaryValues,
                );
                return (
                  <TotalCell
                    {...params}
                    column={params.tableColumn.column!}
                  >
                    {this.renderContent(params.tableColumn.column, columnSummaries)}
                  </TotalCell>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={(
            { tableRow, tableColumn }: any,
          ) => isGroupSummaryTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({ groupSummaryItems, groupSummaryValues }) => {
                const columnSummaries = getColumnSummaries(
                  groupSummaryItems,
                  params.tableColumn.column!.name,
                  groupSummaryValues[params.tableRow.row.compoundKey],
                );
                return (
                  <GroupCell
                    {...params}
                    column={params.tableColumn.column!}
                  >
                    {this.renderContent(params.tableColumn.column, columnSummaries)}
                  </GroupCell>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={(
            { tableRow, tableColumn }: any,
          ) => isTreeSummaryTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({
                treeSummaryItems,
                treeSummaryValues,
                tableTreeColumnName,
                getRowId,
                getTreeRowLevel,
              }) => {
                const columnSummaries = getColumnSummaries(
                  treeSummaryItems,
                  params.tableColumn.column!.name,
                  treeSummaryValues[getRowId(params.tableRow.row)],
                );
                if (tableTreeColumnName === params.tableColumn.column!.name) {
                  return (
                    <TreeColumnCell
                      {...params}
                      column={params.tableColumn.column!}
                    >
                      <TreeColumnIndent
                        level={getTreeRowLevel(params.tableRow.row)}
                      />
                      <TreeColumnContent>
                        {this.renderContent(params.tableColumn.column, columnSummaries)}
                      </TreeColumnContent>
                    </TreeColumnCell>
                  );
                }
                return (
                  <TreeCell
                    {...params}
                    column={params.tableColumn.column!}
                  >
                    {this.renderContent(params.tableColumn.column, columnSummaries)}
                  </TreeCell>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isTotalSummaryTableRow(tableRow)}
        >
          {(params: TableRowProps) => (
            <TotalRow
              {...params}
            />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isGroupSummaryTableRow(tableRow)}
        >
          {(params: TableRowProps) => (
            <GroupRow
              {...params}
            />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isTreeSummaryTableRow(tableRow)}
        >
          {(params: TableRowProps) => (
            <TreeRow
              {...params}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders table rows that display a total, group, and tree summary. */
export const TableSummaryRow: React.ComponentType<TableSummaryRowProps> & {
  /** The tree summary row type's indentifier. */
  TREE_ROW_TYPE: symbol;
  /** The group summary row type's indentifier. */
  GROUP_ROW_TYPE: symbol;
  /** The total row type's indentifier. */
  TOTAL_ROW_TYPE: symbol;
} = TableSummaryRowBase;
