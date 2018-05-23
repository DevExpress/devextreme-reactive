import {
  DxGetter,
  DxTemplate,
  DxTemplateConnector,
  DxPlugin,
  DxTemplatePlaceholder,
  DxTemplatePlaceholderSlot,
} from '@devexpress/dx-vue-core';
import {
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  getColumnSortingDirection,
  TABLE_DATA_TYPE,
} from '@devexpress/dx-grid-core';

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

const pluginDependencies = [
  { name: 'DxTable' },
];

export const DxTableHeaderRow = {
  name: 'DxTableHeaderRow',
  props: {
    showSortingControls: {
      type: Boolean,
    },
    showGroupingControls: {
      type: Boolean,
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
      cellComponent: HeaderCell,
      rowComponent: HeaderRow,
    } = this;

    return (
      <DxPlugin
        name="DxTableHeaderRow"
        dependencies={pluginDependencies}
      >
        <DxGetter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <DxTemplate
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {params => (
            <DxTemplateConnector>
              {({
                getters: {
                  sorting,
                  tableColumns,
                  isColumnSortingEnabled,
                  isColumnGroupingEnabled,
                },
                actions: {
                  changeColumnSorting,
                  changeColumnGrouping,
                },
              }) => {
                const { name: columnName } = params.tableColumn.column;
                const atLeastOneDataColumn = tableColumns
                  .filter(({ type }) => type === TABLE_DATA_TYPE).length > 1;
                const sortingEnabled = isColumnSortingEnabled && isColumnSortingEnabled(columnName);
                const groupingEnabled = isColumnGroupingEnabled &&
                  isColumnGroupingEnabled(columnName) && atLeastOneDataColumn;

                return (
                  <HeaderCell
                    {...{ attrs: { ...params } }}
                    column={params.tableColumn.column}
                    showSortingControls={this.showSortingControls}
                    showGroupingControls={this.showGroupingControls}
                    sortingEnabled={sortingEnabled}
                    groupingEnabled={groupingEnabled}
                    sortingDirection={this.showSortingControls
                      ? getColumnSortingDirection(sorting, columnName)
                      : undefined}
                    onSort={({ direction, keepOther }) =>
                      changeColumnSorting({ columnName, direction, keepOther })}
                    onGroup={() => changeColumnGrouping({ columnName })}
                  >
                    <DxTemplatePlaceholder
                      slot="before"
                      name="tableHeaderCellBefore"
                      params={{
                        column: params.tableColumn.column,
                      }}
                    />
                  </HeaderCell>
                );
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ tableRow }) => isHeadingTableRow(tableRow)}
        >
          {params => (
            <HeaderRow
              {...{ attrs: { ...params } }}
            >
              <DxTemplatePlaceholderSlot params={params} />
            </HeaderRow>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
