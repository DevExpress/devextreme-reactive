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
                  isColumnSortingEnabled,
                },
                actions: {
                  changeColumnSorting,
                },
              }) => {
                const { name: columnName } = params.tableColumn.column;
                const sortingEnabled = isColumnSortingEnabled && isColumnSortingEnabled(columnName);
                return (
                  <HeaderCell
                    {...{ attrs: { ...params } }}
                    column={params.tableColumn.column}
                    showSortingControls={this.showSortingControls}
                    sortingEnabled={sortingEnabled}
                    sortingDirection={this.showSortingControls
                      ? getColumnSortingDirection(sorting, columnName)
                      : undefined}
                    onSort={({ direction, keepOther }) =>
                      changeColumnSorting({ columnName, direction, keepOther })}
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
