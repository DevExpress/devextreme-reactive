import { Getter, Template, TemplateConnector, Plugin, TemplatePlaceholderSlot } from '@devexpress/dx-vue-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'FilteringState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
];

export const TableFilterRow = {
  name: 'TableFilterRow',
  props: {
    rowHeight: {
      type: Number,
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
  },
  render() {
    const {
      rowHeight,
      cellComponent: FilterCell,
      rowComponent: FilterRow,
      messages,
    } = this;

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
              {({
                getters: { filters, isColumnFilteringEnabled },
                actions: { changeColumnFilter },
              }) => {
                const { name: columnName } = params.tableColumn.column;
                const filter = getColumnFilterConfig(filters, columnName);
                const onFilter = (config) => {
                  changeColumnFilter({ columnName, config });
                };
                return (
                  <FilterCell
                    {...{ attrs: { ...params } }}
                    getMessage={getMessage}
                    column={params.tableColumn.column}
                    filter={filter}
                    filteringEnabled={isColumnFilteringEnabled(columnName)}
                    onFilter={onFilter}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isFilterTableRow(tableRow)}
        >
          {params =>
            <FilterRow
              {...{ attrs: { ...params } }}
              row={params.tableRow.row}
            >
              <TemplatePlaceholderSlot params={params} />
            </FilterRow>
          }
        </Template>
      </Plugin>
    );
  },
};
