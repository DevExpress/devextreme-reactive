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

const pluginDependencies = [
  { pluginName: 'FilteringState' },
  { pluginName: 'Table' },
  { pluginName: 'DataTypeProvider', optional: true },
];

export class TableFilterRow extends React.PureComponent {
  render() {
    const {
      rowHeight,
      getCellComponent,
      rowComponent: FilterRow,
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
              {({ filters }, { setColumnFilter }) => {
                const { name: columnName } = params.tableColumn.column;
                const FilterCell = getCellComponent(columnName);
                const filter = getColumnFilterConfig(filters, columnName);
                const onFilter = config => setColumnFilter({ columnName, config });
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={{
                      column: params.tableColumn.column,
                      value: filter ? filter.value : null,
                      onValueChange: newValue => onFilter(newValue ? { value: newValue } : null),
                    }}
                  >
                    {content => (
                      <FilterCell
                        {...params}
                        getMessage={getMessage}
                        column={params.tableColumn.column}
                        filter={filter}
                        onFilter={onFilter}
                      >
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
  getCellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
  messages: {},
};
