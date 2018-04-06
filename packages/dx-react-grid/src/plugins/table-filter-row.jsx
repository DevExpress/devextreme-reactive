import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, TemplatePlaceholder, TemplateConnector, Plugin } from '@devexpress/dx-react-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getMessagesFormatter,
  DEFAULT_FILTER_OPERATIONS,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'FilteringState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
];

export class TableFilterRow extends React.PureComponent {
  render() {
    const {
      rowHeight,
      cellComponent: FilterCell,
      rowComponent: FilterRow,
      iconComponent,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    const tableHeaderRowsComputed = ({ tableHeaderRows }) =>
      tableHeaderRowsWithFilter(tableHeaderRows, rowHeight);

    return (
      <Plugin
        name="TableFilterRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isFilterTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(
                { filters, isColumnFilteringEnabled, availableFilters },
                { changeColumnFilter },
              ) => {
                const { name: columnName } = params.tableColumn.column;
                const filter = getColumnFilterConfig(filters, columnName);
                const onFilter = config => changeColumnFilter({ columnName, config });
                const useColumnSpecificFilters = availableFilters
                  && availableFilters[columnName] && availableFilters[columnName].length;
                const availableCellFilters = useColumnSpecificFilters
                  ? availableFilters[columnName]
                  : DEFAULT_FILTER_OPERATIONS;
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={{
                      column: params.tableColumn.column,
                      value: filter ? filter.value : undefined,
                      onValueChange: newValue => onFilter(newValue !== undefined
                        ? { value: newValue }
                        : null),
                    }}
                  >
                    {content => (
                      <FilterCell
                        {...params}
                        getMessage={getMessage}
                        column={params.tableColumn.column}
                        filter={filter}
                        filteringEnabled={isColumnFilteringEnabled(columnName)}
                        onFilter={onFilter}
                        iconComponent={iconComponent}
                        availableFilters={availableCellFilters}
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
      </Plugin>
    );
  }
}

TableFilterRow.propTypes = {
  rowHeight: PropTypes.any,
  messages: PropTypes.object,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  iconComponent: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
  messages: {},
};
