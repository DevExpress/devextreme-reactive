import {
  DxGetter, DxTemplate, DxTemplateConnector, DxTemplatePlaceholder, DxPlugin,
} from '@devexpress/dx-vue-core';
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
  { name: 'DxFilteringState' },
  { name: 'DxTable' },
  { name: 'DxDataTypeProvider', optional: true },
];

export const DxTableFilterRow = {
  name: 'DxTableFilterRow',
  props: {
    rowHeight: {
      type: Number,
    },
    showFilterSelector: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Object,
    },
    cellComponent: {
      type: Object,
      required: true,
    },
    rowComponent: {
      type: Object,
      required: true,
    },
    filterSelectorComponent: {
      type: Object,
      required: true,
    },
    iconComponent: {
      type: Object,
      required: true,
    },
    editorComponent: {
      type: Object,
      required: true,
    },
  },
  data() {
    return ({
      filterOperations: {},
    });
  },
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
      filterOperations,
    } = this;

    const getMessage = getMessagesFormatter(messages);

    const tableHeaderRowsComputed = (
      { tableHeaderRows },
    ) => tableHeaderRowsWithFilter(tableHeaderRows, rowHeight);

    return (
      <DxPlugin
        name="DxTableFilterRow"
        dependencies={pluginDependencies}
      >
        <DxGetter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <DxTemplate
          name="tableCell"
          predicate={(
            { attrs: { tableRow, tableColumn } },
          ) => isFilterTableCell(tableRow, tableColumn)}
        >
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
              {({
                getters: { filters, isColumnFilteringEnabled, getAvailableFilterOperations },
                actions: { changeColumnFilter },
              }) => {
                const { name: columnName } = attrs.tableColumn.column;
                const filter = getColumnFilterConfig(filters, columnName);
                const onFilter = config => changeColumnFilter({ columnName, config });
                const columnFilterOperations = getColumnFilterOperations(
                  getAvailableFilterOperations, columnName,
                );
                const selectedFilterOperation = filterOperations[columnName]
                  || columnFilterOperations[0];
                const handleFilterOperationChange = (value) => {
                  this.filterOperations = {
                    ...filterOperations,
                    [columnName]: value,
                  };
                  if (filter && !isFilterValueEmpty(filter.value)) {
                    onFilter({ value: filter.value, operation: value });
                  }
                };
                const handleFilterValueChange = (value) => {
                  onFilter(!isFilterValueEmpty(value)
                    ? { value, operation: selectedFilterOperation }
                    : null);
                };
                const filteringEnabled = isColumnFilteringEnabled(columnName);
                return (
                  <DxTemplatePlaceholder
                    name="valueEditor"
                    column={attrs.tableColumn.column}
                    value={filter ? filter.value : undefined}
                    onValueChange={handleFilterValueChange}
                  >
                    {content => (
                      <FilterCell
                        {...{ attrs: { ...attrs }, on: { ...listeners } }}
                        getMessage={getMessage}
                        column={attrs.tableColumn.column}
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
                              onChangeValue={handleFilterOperationChange}
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
                            onChangeValue={handleFilterValueChange}
                          />
                        )}
                      </FilterCell>
                    )}
                  </DxTemplatePlaceholder>
                );
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ attrs: { tableRow } }) => isFilterTableRow(tableRow)}
        >
          {({ attrs, listeners, slots }) => <FilterRow
              {...{ attrs: { ...attrs }, on: { ...listeners } }}
              row={attrs.tableRow.row}
            >
              {slots.default}
            </FilterRow>
          }
        </DxTemplate>
      </DxPlugin>
    );
  },
};
