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
} from '@devexpress/dx-grid-core';

const getFilterTableCellTemplateArgs = (
  params,
  { filters },
  { setColumnFilter },
) => ({
  ...params,
  column: params.tableColumn.column,
  row: params.tableRow.row,
  filter: getColumnFilterConfig(filters, params.tableColumn.column.name),
  setFilter: config => setColumnFilter({ columnName: params.tableColumn.column.name, config }),
});

const getValueEditorArgs = params => ({
  column: params.column,
  row: params.row,
  value: params.filter ? params.filter.value : null,
  onValueChange: newValue => params.setFilter(newValue ? { value: newValue } : null),
});

const pluginDependencies = [
  { pluginName: 'FilteringState' },
  { pluginName: 'TableView' },
];

export class TableFilterRow extends React.PureComponent {
  render() {
    const { rowHeight, filterCellTemplate } = this.props;

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
                const templateArgs = getFilterTableCellTemplateArgs(params, getters, actions);
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
      </PluginContainer>
    );
  }
}

TableFilterRow.propTypes = {
  rowHeight: PropTypes.any,
  filterCellTemplate: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
};
