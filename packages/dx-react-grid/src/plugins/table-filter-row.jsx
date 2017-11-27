import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, TemplatePlaceholder, TemplateConnector, PluginContainer,
} from '@devexpress/dx-react-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const getFilterTableCellProps = (
  params,
  { filters },
  { setColumnFilter },
) => ({
  ...params,
  column: params.tableColumn.column,
  filter: getColumnFilterConfig(filters, params.tableColumn.column.name),
  setFilter: config => setColumnFilter({ columnName: params.tableColumn.column.name, config }),
});

const getValueEditorProps = params => ({
  column: params.column,
  value: params.filter ? params.filter.value : null,
  onValueChange: newValue => params.setFilter(newValue ? { value: newValue } : null),
});

const pluginDependencies = [
  { pluginName: 'FilteringState' },
  { pluginName: 'Table' },
  { pluginName: 'DataTypeProvider', optional: true },
];

export class TableFilterRow extends React.PureComponent {
  render() {
    const {
      rowHeight,
      getFilterCellComponent,
      filterRowComponent: FilterRow,
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
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isFilterTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => {
                const FilterCell = getFilterCellComponent(params.tableColumn.column.name);
                const templateArgs = getFilterTableCellProps(
                  { getMessage, ...params },
                  getters,
                  actions,
                );
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={getValueEditorProps(templateArgs)}
                  >
                    {content => (
                      <FilterCell {...templateArgs}>
                        {content}
                      </FilterCell>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isFilterTableRow(tableRow)}
        >
          {params => <FilterRow {...params} />}
        </Template>
      </PluginContainer>
    );
  }
}

TableFilterRow.propTypes = {
  rowHeight: PropTypes.any,
  messages: PropTypes.object,
  getFilterCellComponent: PropTypes.func.isRequired,
  filterRowComponent: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
  messages: {},
};
