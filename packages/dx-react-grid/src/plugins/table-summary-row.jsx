import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { getMessagesFormatter, tableRowsWithSummaries, tableRowsWithTotalSummary } from '@devexpress/dx-grid-core';

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
          if (defaultTypelessSummaries.includes(summary.type)) {
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
                  {getMessage(summary.type)}:  {content || String(summary.value)}
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
          predicate={({ tableRow, tableColumn }) => tableColumn.type === 'data' && tableRow.type === 'totalSummary'}
        >
          {params => (
            <TemplateConnector>
              {({ totalSummaryItems, totalSummary }) => {
                const columnSummaryItems = totalSummaryItems
                  .map((item, index) => [item, index])
                  .filter(([item]) => item.columnName === params.tableColumn.column.name);
                const columnSummary = columnSummaryItems
                  .map(([item, index]) => ({ type: item.type, value: totalSummary[index] }));
                return this.renderCell(params, columnSummary);
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => tableColumn.type === 'data' && tableRow.type === 'groupSummary'}
        >
          {params => (
            <TemplateConnector>
              {({ groupSummaryItems, groupSummaries }) => {
                const columnSummaryItems = groupSummaryItems
                  .map((item, index) => [item, index])
                  .filter(([item]) => item.columnName === params.tableColumn.column.name);
                const columnSummary = columnSummaryItems
                  .map(([item, index]) => ({ type: item.type, value: groupSummaries[params.tableRow.compoundKey][index] }));
                return this.renderCell(params, columnSummary);
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => tableColumn.type === 'data' && tableRow.type === 'treeSummary'}
        >
          {params => (
            <TemplateConnector>
              {({ treeSummaryItems, treeSummaries }) => {
                const columnSummaryItems = treeSummaryItems
                  .map((item, index) => [item, index])
                  .filter(([item]) => item.columnName === params.tableColumn.column.name);
                const columnSummary = columnSummaryItems
                  .map(([item, index]) => ({ type: item.type, value: treeSummaries[params.tableRow.rowId][index] }));
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
