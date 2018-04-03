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
} from '@devexpress/dx-grid-core';


const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

const pluginDependencies = [
  { name: 'Table' },
];

export const TableHeaderRow = {
  name: 'TableHeaderRow',
  props: {
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
              {() => (
                  <HeaderCell
                    {...{ attrs: { ...params } }}
                    column={params.tableColumn.column}
                  >
                  {params.tableColumn.column.title || params.tableColumn.column.name}
                  </HeaderCell>
                )
              }
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isHeadingTableRow(tableRow)}
        >
          {params => (
            <HeaderRow
              row={params.tableRow.row}
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
