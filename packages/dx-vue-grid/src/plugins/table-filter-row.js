import { DxGetter, DxTemplate, DxTemplateConnector, DxPlugin } from '@devexpress/dx-vue-core';
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
          predicate={({ attrs: { tableRow, tableColumn } }) =>
            isFilterTableCell(tableRow, tableColumn)}
        >
          {({ attrs, listerens }) => (
            <DxTemplateConnector>
              {({
                getters: { filters, isColumnFilteringEnabled },
                actions: { changeColumnFilter },
              }) => {
                const { name: columnName } = attrs.tableColumn.column;
                const filter = getColumnFilterConfig(filters, columnName);
                const onFilter = (config) => {
                  changeColumnFilter({ columnName, config });
                };
                return (
                  <FilterCell
                    {...{ attrs, on: listerens }}
                    getMessage={getMessage}
                    column={attrs.tableColumn.column}
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
          predicate={({ attrs: { tableRow } }) => isFilterTableRow(tableRow)}
        >
          {({ attrs, listerens, slots }) =>
            <FilterRow
              {...{ attrs, on: listerens }}
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
