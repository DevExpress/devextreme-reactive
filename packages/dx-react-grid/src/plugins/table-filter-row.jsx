import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, TemplatePlaceholder, TemplateConnector, Plugin } from '@devexpress/dx-react-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getColumnFilterOperations,
  getMessagesFormatter,
  isFilterValueEmpty,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'FilteringState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
];

export class TableFilterRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filterOperations: {},
    };
  }
  render() {
    const {
      rowHeight,
      cellComponent: FilterCell,
      rowComponent: FilterRow,
      filterSelectorComponent: FilterSelector,
      iconComponent,
      editorComponent: EditorComponent,
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
                { filters, isColumnFilteringEnabled, availableFilterOperations },
                { changeColumnFilter },
              ) => {
                const { name: columnName } = params.tableColumn.column;
                const filter = getColumnFilterConfig(filters, columnName);
                const onFilter = config => changeColumnFilter({ columnName, config });
                const columnFilterOperations =
                  getColumnFilterOperations(availableFilterOperations, columnName);
                const selectedFilterOperation = this.state.filterOperations[columnName]
                  || columnFilterOperations[0];
                const handleFilterOperationChange = (value) => {
                  this.setState({
                    filterOperations: {
                      ...this.state.filterOperations,
                      [columnName]: value,
                    },
                  });
                  if (filter && !isFilterValueEmpty(filter.value)) {
                    onFilter({ value: filter.value, operation: value });
                  }
                };
                const handleFilterValueChange = value =>
                  onFilter(!isFilterValueEmpty(value)
                    ? { value, operation: selectedFilterOperation }
                    : null);
                const filteringEnabled = isColumnFilteringEnabled(columnName);
                return (
                  <TemplatePlaceholder
                    name="valueEditor"
                    params={{
                      column: params.tableColumn.column,
                      value: filter ? filter.value : undefined,
                      onValueChange: handleFilterValueChange,
                    }}
                  >
                    {content => (
                      <FilterCell
                        {...params}
                        getMessage={getMessage}
                        column={params.tableColumn.column}
                        filter={filter}
                        filteringEnabled={filteringEnabled}
                        onFilter={onFilter}
                      >
                        <FilterSelector
                          iconComponent={iconComponent}
                          value={selectedFilterOperation}
                          availableValues={columnFilterOperations}
                          onChange={handleFilterOperationChange}
                          getMessage={getMessage}
                        />
                        {content || (
                          <EditorComponent
                            value={filter ? filter.value : ''}
                            disabled={!filteringEnabled}
                            getMessage={getMessage}
                            onChange={handleFilterValueChange}
                          />
                        )}
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
  filterSelectorComponent: PropTypes.func.isRequired,
  iconComponent: PropTypes.func.isRequired,
  editorComponent: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
  messages: {},
};
