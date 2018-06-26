import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { getMessagesFormatter, tableRowsWithSummaries } from '@devexpress/dx-grid-core';

export class TableSummaryRow extends React.PureComponent {
  render() {
    const {
      cellComponent: Cell,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="TableSummaryRow"
        dependencies={[
          { name: 'Table' },
          { name: 'SummaryState' },
        ]}
      >
        <Getter name="tableBodyRows" computed={({ tableBodyRows, getRowLevelKey, isGroupRow }) => tableRowsWithSummaries(tableBodyRows, getRowLevelKey, isGroupRow)} />
        <Getter name="tableFooterRows" computed={({ tableFooterRows }) => [...tableFooterRows, { type: 'totalSummary', key: 'totalSummary' }]} />
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
                return (
                  <Cell>
                    {columnSummary.map(summary => (
                      <TemplatePlaceholder
                        key={summary.type}
                        name="valueFormatter"
                        params={{
                          column: params.tableColumn.column,
                          value: summary.value,
                        }}
                      >
                        {content => (
                          <div>
                            {getMessage(summary.type)}: {content || String(summary.value)}
                          </div>
                        )}
                      </TemplatePlaceholder>
                    ))}
                  </Cell>
                );
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
                return (
                  <Cell>
                    {columnSummary.map(summary => (
                      <TemplatePlaceholder
                        key={summary.type}
                        name="valueFormatter"
                        params={{
                          column: params.tableColumn.column,
                          value: summary.value,
                        }}
                      >
                        {content => (
                          <div>
                            {getMessage(summary.type)}: {content || String(summary.value)}
                          </div>
                        )}
                      </TemplatePlaceholder>
                    ))}
                  </Cell>
                );
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
  messages: PropTypes.object,
};

TableSummaryRow.defaultProps = {
  messages: {},
};
