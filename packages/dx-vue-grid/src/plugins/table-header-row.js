import {
  Getter,
  Template,
  TemplateConnector,
  Plugin,
  TemplatePlaceholderSlot,
} from '@devexpress/dx-vue-core';
import {
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  getColumnSortingDirection,
  getMessagesFormatter,
  TABLE_DATA_TYPE,
} from '@devexpress/dx-grid-core';

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

const pluginDependencies = [
  { name: 'Table' },
];

export const TableHeaderRow = {
  name: 'TableHeaderRow',
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
    messages: {
      type: Object,
    },
  },
  render() {
    const {
      cellComponent: HeaderCell,
      rowComponent: HeaderRow,
    } = this;
    const getMessage = getMessagesFormatter(this.messages);

    return (
      <Plugin
        name="TableHeaderRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
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
                    getMessage={getMessage}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isHeadingTableRow(tableRow)}
        >
          {params => (
            <HeaderRow
              {...{ attrs: { ...params } }}
            >
              <TemplatePlaceholderSlot params={params} />
            </HeaderRow>
          )}
        </Template>
      </Plugin>
    );
  },
};
