import * as React from 'react';
import {
  Getter, Template, TemplatePlaceholder, TemplateConnector, Plugin, Getters, Actions,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getColumnFilterOperations,
  isFilterValueEmpty,
  getSelectedFilterOperation,
  TABLE_FILTER_TYPE,
  FilterConfig,
  TOP_POSITION,
} from '@devexpress/dx-grid-core';
import { TableFilterRowProps, TableFilterRowState, TableCellProps, TableRowProps } from '../types';

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

class TableFilterRowBase extends React.PureComponent<TableFilterRowProps, TableFilterRowState> {
  static ROW_TYPE = TABLE_FILTER_TYPE;
  static defaultProps = {
    showFilterSelector: false,
    messages: {},
  };
  static components = {
    rowComponent: 'Row',
    cellComponent: 'Cell',
    filterSelectorComponent: 'FilterSelector',
    iconComponent: 'Icon',
    editorComponent: 'Editor',
    toggleButtonComponent: 'ToggleButton',
  };

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
      toggleButtonComponent,
      editorComponent: EditorComponent,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    const tableHeaderRowsComputed = (
      { tableHeaderRows }: Getters,
    ) => tableHeaderRowsWithFilter(tableHeaderRows, rowHeight!);

    return (
      <Plugin
        name="TableFilterRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }: any) => isFilterTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {(
                { filters, isColumnFilteringEnabled, getAvailableFilterOperations, isDataRemote, setRefKeyboardNavigation },
                { changeColumnFilter, scrollToRow }: Actions,
              ) => {
                const { filterOperations } = this.state;
                const { name: columnName } = params.tableColumn.column!;
                const filter = getColumnFilterConfig(filters, columnName)!;
                const onFilter = (
                  config: FilterConfig | null,
                ) => {
                  if (isDataRemote) {
                    scrollToRow(TOP_POSITION);
                  }
                  changeColumnFilter({ columnName, config });
                };
                const columnFilterOperations = getColumnFilterOperations(
                  getAvailableFilterOperations, columnName,
                );
                const selectedFilterOperation = getSelectedFilterOperation(
                  filterOperations, columnName, filter, columnFilterOperations,
                );
                const handleFilterOperationChange = (value: string) => {
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
                const handleFilterValueChange = (value: any) => onFilter(!isFilterValueEmpty(value)
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
                      disabled: !filteringEnabled,
                    }}
                  >
                    {content => (
                      <FilterCell
                        {...params}
                        tabIndex={-1}
                        setRefKeyboardNavigation={setRefKeyboardNavigation}
                        getMessage={getMessage}
                        column={params.tableColumn.column!}
                        filter={filter}
                        filteringEnabled={filteringEnabled}
                        onFilter={onFilter}
                      >
                        {showFilterSelector
                          ? (
                            <FilterSelector
                              toggleButtonComponent={toggleButtonComponent}
                              iconComponent={iconComponent}
                              value={selectedFilterOperation}
                              availableValues={columnFilterOperations as string[]}
                              onChange={handleFilterOperationChange}
                              disabled={!filteringEnabled}
                              getMessage={getMessage}
                            />
                          ) : null
                        }
                        {content || (
                          <EditorComponent
                            value={filter ? filter.value : undefined}
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
          predicate={({ tableRow }: any) => !!isFilterTableRow(tableRow)}
        >
          {(params: TableRowProps) => <FilterRow {...params} />}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders a filter row. */
export const TableFilterRow: React.ComponentType<TableFilterRowProps> & {
  /** The filter row type's identifier. */
  ROW_TYPE: symbol;
} = TableFilterRowBase;
