import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
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

const pluginDependencies = [
  { pluginName: 'FilteringState' },
  { pluginName: 'TableView' },
];

export class TableFilterRow extends React.PureComponent {
  render() {
    const { rowHeight, filterCellTemplate, filterRowTemplate } = this.props;

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
              {(getters, actions) => (
                <TemplateRenderer
                  template={filterCellTemplate}
                  params={getFilterTableCellTemplateArgs(params, getters, actions)}
                />
              )}
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
  filterCellTemplate: PropTypes.func.isRequired,
  filterRowTemplate: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
};
