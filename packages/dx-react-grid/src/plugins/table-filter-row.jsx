import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Template, TemplatePlaceholder, TemplateConnector, Plugin,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getColumnFilterOperations,
  isFilterValueEmpty,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'FilteringState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
];

const defaultMessages = {
  filterPlaceholder: 'Filter...',
  contains: 'Contains',
  notContains: 'Does not contain',
  startsWith: 'Starts with',
  endsWith: 'Ends with',
  equal: 'Equals',
  notEqual: 'Does not equal',
  greaterThan: 'Greater than',
  greaterThanOrEqual: 'Greater than or equal to',
  lessThan: 'Less than',
  lessThanOrEqual: 'Less than or equal to',
};

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
      showFilterSelector,
      cellComponent: FilterCell,
      rowComponent: FilterRow,
      filterSelectorComponent: FilterSelector,
      iconComponent,
      editorComponent: EditorComponent,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    const tableHeaderRowsComputed = (
      { tableHeaderRows },
    ) => tableHeaderRowsWithFilter(tableHeaderRows, rowHeight);

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
                { filters, isColumnFilteringEnabled, getAvailableFilterOperations },
                { changeColumnFilter },
              ) => {
                const { filterOperations } = this.state;
                const { name: columnName } = params.tableColumn.column;
                const filter = getColumnFilterConfig(filters, columnName);
                const onFilter = config => changeColumnFilter({ columnName, config });
                const columnFilterOperations = getColumnFilterOperations(
                  getAvailableFilterOperations, columnName,
                );
                const selectedFilterOperation = filterOperations[columnName]
                  || columnFilterOperations[0];
                const handleFilterOperationChange = (value) => {
                  this.setState({
                    filterOperations: {
                      ...filterOperations,
                      [columnName]: value,
                    },
                  });
                  if (filter && !isFilterValueEmpty(filter.value)) {
                    onFilter({ value: filter.value, operation: value });
                  }
                };
                const handleFilterValueChange = value => onFilter(!isFilterValueEmpty(value)
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
                        {showFilterSelector
                          ? (
                            <FilterSelector
                              iconComponent={iconComponent}
                              value={selectedFilterOperation}
                              availableValues={columnFilterOperations}
                              onChange={handleFilterOperationChange}
                              disabled={!filteringEnabled}
                              getMessage={getMessage}
                            />
                          ) : null
                        }
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
  showFilterSelector: PropTypes.bool,
  messages: PropTypes.shape({
    filterPlaceholder: PropTypes.string,
    contains: PropTypes.string,
    notContains: PropTypes.string,
    startsWith: PropTypes.string,
    endsWith: PropTypes.string,
    equal: PropTypes.string,
    notEqual: PropTypes.string,
    greaterThan: PropTypes.string,
    greaterThanOrEqual: PropTypes.string,
    lessThan: PropTypes.string,
    lessThanOrEqual: PropTypes.string,
  }),
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  filterSelectorComponent: PropTypes.func.isRequired,
  iconComponent: PropTypes.func.isRequired,
  editorComponent: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
  showFilterSelector: false,
  messages: {},
};

TableFilterRow.components = {
  rowComponent: 'Row',
  cellComponent: 'Cell',
  filterSelectorComponent: 'FilterSelector',
  iconComponent: 'Icon',
  editorComponent: 'Editor',
};
