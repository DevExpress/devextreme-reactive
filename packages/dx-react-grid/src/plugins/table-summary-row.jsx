import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Getter,
  Template,
  Plugin,
  TemplateConnector,
  TemplatePlaceholder,
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
} from '@devexpress/dx-grid-core';

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
}) => tableRowsWithSummaries(tableBodyRows, getRowLevelKey, isGroupRow, getRowId);
const tableFooterRowsComputed = ({
  tableFooterRows,
}) => tableRowsWithTotalSummaries(tableFooterRows);

const defaultTypelessSummaries = ['count'];

export class TableSummaryRow extends React.PureComponent {
  renderContent(column, columnSummaries) {
    const {
      formatlessSummaryTypes,
      itemComponent: Item,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    const SummaryItem = ({ summary, children }) => (
      <Item
        getMessage={getMessage}
        type={summary.type}
        value={summary.value}
      >
        {children || String(summary.value)}
      </Item>
    );

    return (
      <React.Fragment>
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
      </React.Fragment>
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
          predicate={({ tableRow, tableColumn }) => isTotalSummaryTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ totalSummaryItems, totalSummaryValues }) => {
                const columnSummaries = getColumnSummaries(
                  totalSummaryItems,
                  params.tableColumn.column.name,
                  totalSummaryValues,
                );
                return (
                  <TotalCell
                    {...params}
                    column={params.tableColumn.column}
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
          predicate={({ tableRow, tableColumn }) => isGroupSummaryTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ groupSummaryItems, groupSummaryValues }) => {
                const columnSummaries = getColumnSummaries(
                  groupSummaryItems,
                  params.tableColumn.column.name,
                  groupSummaryValues[params.tableRow.row.compoundKey],
                );
                return (
                  <GroupCell
                    {...params}
                    column={params.tableColumn.column}
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
          predicate={({ tableRow, tableColumn }) => isTreeSummaryTableCell(tableRow, tableColumn)}
        >
          {params => (
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
                  params.tableColumn.column.name,
                  treeSummaryValues[getRowId(params.tableRow.row)],
                );
                if (tableTreeColumnName === params.tableColumn.column.name) {
                  return (
                    <TreeColumnCell
                      {...params}
                      column={params.tableColumn.column}
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
                    column={params.tableColumn.column}
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
          predicate={({ tableRow }) => isTotalSummaryTableRow(tableRow)}
        >
          {params => (
            <TotalRow
              {...params}
            />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isGroupSummaryTableRow(tableRow)}
        >
          {params => (
            <GroupRow
              {...params}
            />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isTreeSummaryTableRow(tableRow)}
        >
          {params => (
            <TreeRow
              {...params}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

TableSummaryRow.TREE_ROW_TYPE = TABLE_TREE_SUMMARY_TYPE;
TableSummaryRow.GROUP_ROW_TYPE = TABLE_GROUP_SUMMARY_TYPE;
TableSummaryRow.TOTAL_ROW_TYPE = TABLE_TOTAL_SUMMARY_TYPE;

TableSummaryRow.propTypes = {
  formatlessSummaryTypes: PropTypes.array,

  totalRowComponent: PropTypes.func.isRequired,
  groupRowComponent: PropTypes.func.isRequired,
  treeRowComponent: PropTypes.func.isRequired,

  totalCellComponent: PropTypes.func.isRequired,
  groupCellComponent: PropTypes.func.isRequired,
  treeCellComponent: PropTypes.func.isRequired,

  treeColumnCellComponent: PropTypes.func.isRequired,
  treeColumnContentComponent: PropTypes.func.isRequired,
  treeColumnIndentComponent: PropTypes.func.isRequired,

  itemComponent: PropTypes.func.isRequired,

  messages: PropTypes.shape({
    sum: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    avg: PropTypes.string,
    count: PropTypes.string,
  }),
};

TableSummaryRow.defaultProps = {
  formatlessSummaryTypes: [],
  messages: {},
};

TableSummaryRow.components = {
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
