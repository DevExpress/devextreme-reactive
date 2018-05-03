import { DxGetter, DxTemplate, DxTemplateConnector, DxPlugin, DxTemplatePlaceholderSlot } from '@devexpress/dx-vue-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getMessagesFormatter,
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
      <DxPlugin
        name="DxTableFilterRow"
        dependencies={pluginDependencies}
      >
        <DxGetter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <DxTemplate
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isFilterTableCell(tableRow, tableColumn)}
        >
          {params => (
            <DxTemplateConnector>
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
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ tableRow }) => isFilterTableRow(tableRow)}
        >
          {params =>
            <FilterRow
              {...{ attrs: { ...params } }}
              row={params.tableRow.row}
            >
              <DxTemplatePlaceholderSlot params={params} />
            </FilterRow>
          }
        </DxTemplate>
      </DxPlugin>
    );
  },
};
