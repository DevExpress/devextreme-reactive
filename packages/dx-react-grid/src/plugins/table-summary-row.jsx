import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  getMessagesFormatter,
  tableRowsWithSummaries,
  tableRowsWithTotalSummaries,
  isTotalSummaryTableCell,
  isGroupSummaryTableCell,
  isTreeSummaryTableCell,
  getColumnSummaries,
} from '@devexpress/dx-grid-core';

const tableBodyRowsComputed = ({
  tableBodyRows,
  getRowLevelKey,
  isGroupRow,
  getRowId,
}) =>
  tableRowsWithSummaries(tableBodyRows, getRowLevelKey, isGroupRow, getRowId);
const tableFooterRowsComputed = ({ tableFooterRows }) =>
  tableRowsWithTotalSummaries(tableFooterRows);

const defaultTypelessSummaries = ['count'];

export class TableSummaryRow extends React.PureComponent {
  renderCell(params, columnSummaries) {
    const {
      cellComponent: Cell,
      itemComponent: Item,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    return (
      <Cell
        {...params}
      >
        {columnSummaries.map((summary) => {
          if (summary.value === null || defaultTypelessSummaries.includes(summary.type)) {
            return (
              <Item
                key={summary.type}
              >
                {getMessage(summary.type)}:&nbsp;&nbsp;{String(summary.value)}
              </Item>
            );
          }
          return (
            <TemplatePlaceholder
              key={summary.type}
              name="valueFormatter"
              params={{
                column: params.tableColumn.column,
                value: summary.value,
              }}
            >
              {content => (
                <Item>
                  {getMessage(summary.type)}:&nbsp;&nbsp;{content || String(summary.value)}
                </Item>
              )}
            </TemplatePlaceholder>
          );
        })}
      </Cell>
    );
  }
  render() {
    return (
      <Plugin
        name="TableSummaryRow"
        dependencies={[
          { name: 'Table' },
          { name: 'SummaryState' },
        ]}
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
                return this.renderCell(params, columnSummaries);
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
                  groupSummaryValues[params.tableRow.compoundKey],
                );
                return this.renderCell(params, columnSummaries);
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
              {({ treeSummaryItems, treeSummaryValues }) => {
                const columnSummaries = getColumnSummaries(
                  treeSummaryItems,
                  params.tableColumn.column.name,
                  treeSummaryValues[params.tableRow.rowId],
                );
                return this.renderCell(params, columnSummaries);
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

TableSummaryRow.propTypes = {
  // rowComponent: PropTypes.func.isRequired,

  totalRowComponent: PropTypes.func.isRequired,
  groupRowComponent: PropTypes.func.isRequired,
  treeRowConponent: PropTypes.func.isRequired,

  // cellComponent: PropTypes.func.isRequired,

  totalCellComponent: PropTypes.func.isRequired,
  groupCellComponent: PropTypes.func.isRequired,
  treeCellConponent: PropTypes.func.isRequired,

  treeColumnCellComponent: PropTypes.func.isRequired,
  treeColumnContentComponent: PropTypes.func.isRequired,
  treeColumnIndentComponent: PropTypes.func.isRequired,

  itemComponent: PropTypes.func.isRequired,

  messages: PropTypes.object,
};

TableSummaryRow.defaultProps = {
  messages: {},
};
