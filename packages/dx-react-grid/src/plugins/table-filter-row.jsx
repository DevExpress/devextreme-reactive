import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  TemplateRenderer,
  PluginContainer,
} from '@devexpress/dx-react-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const getFilterTableCellTemplateArgs = (
  params,
  { filters },
  { setColumnFilter },
) => ({
  ...params,
  column: params.tableColumn.column,
  filter: getColumnFilterConfig(filters, params.tableColumn.column.name),
  setFilter: config => setColumnFilter({ columnName: params.tableColumn.column.name, config }),
});

const getValueEditorArgs = params => ({
  column: params.column,
  value: params.filter ? params.filter.value : null,
  onValueChange: newValue => params.setFilter(newValue ? { value: newValue } : null),
});

const pluginDependencies = [
  { pluginName: 'FilteringState' },
  { pluginName: 'TableView' },
  { pluginName: 'DataTypeProvider', optional: true },
];

export class TableFilterRow extends React.PureComponent {
  render() {
    const {
      rowHeight,
      filterCellTemplate,
      filterRowTemplate,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    const tableHeaderRowsComputed = ({ tableHeaderRows }) =>
      tableHeaderRowsWithFilter(tableHeaderRows, rowHeight);

    return (
      <PluginContainer
        pluginName="TableFilterRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isFilterTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => {
                const templateArgs = getFilterTableCellTemplateArgs(
                  { getMessage, ...params },
                  getters,
                  actions,
                );
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={getValueEditorArgs(templateArgs)}
                  >
                    {content => (
                      <TemplateRenderer
                        template={filterCellTemplate}
                        params={templateArgs}
                      >
                        {content}
                      </TemplateRenderer>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => isFilterTableRow(tableRow)}
        >
          {params => (
            <TemplateRenderer
              template={filterRowTemplate}
              params={params}
            />
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableFilterRow.propTypes = {
  rowHeight: PropTypes.any,
  messages: PropTypes.object,
  filterCellTemplate: PropTypes.func.isRequired,
  filterRowTemplate: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
  messages: {},
};
