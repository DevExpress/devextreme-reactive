import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  getMessagesFormatter,
  tableRowsWithSummaries,
  tableRowsWithTotalSummary,
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
  tableRowsWithTotalSummary(tableFooterRows);

const defaultTypelessSummaries = ['count'];

export class TableSummaryRow extends React.PureComponent {
  renderCell(params, columnSummary) {
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
        {columnSummary.map((summary) => {
          if (summary.value === null || defaultTypelessSummaries.includes(summary.type)) {
            return (
              <Item
                key={summary.type}
              >
                {getMessage(summary.type)}:  {String(summary.value)}
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
              {({ totalSummaryItems, totalSummary }) => {
                const columnSummary = getColumnSummaries(
                  totalSummaryItems,
                  params.tableColumn.column.name,
                  totalSummary,
                );
                return this.renderCell(params, columnSummary);
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
              {({ groupSummaryItems, groupSummaries }) => {
                const columnSummary = getColumnSummaries(
                  groupSummaryItems,
                  params.tableColumn.column.name,
                  groupSummaries[params.tableRow.compoundKey],
                );
                return this.renderCell(params, columnSummary);
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
              {({ treeSummaryItems, treeSummaries }) => {
                const columnSummary = getColumnSummaries(
                  treeSummaryItems,
                  params.tableColumn.column.name,
                  treeSummaries[params.tableRow.rowId],
                );
                return this.renderCell(params, columnSummary);
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

TableSummaryRow.propTypes = {
  cellComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

TableSummaryRow.defaultProps = {
  messages: {},
};
