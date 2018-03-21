import {
  Getter,
  Template,
  TemplatePlaceholder,
  TemplatePlaceholderSlot,
  TemplateConnector,
  Plugin,
} from '@devexpress/dx-vue-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  isDataTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';

const RowPlaceholder = {
  props: {
    tableRow: {},
  },
  render() {
    return (
      <TemplatePlaceholder
        name="tableRow"
        params={{ tableRow: this.tableRow }}
      >
        {this.$slots.default}
      </TemplatePlaceholder>
    );
  },
};
const CellPlaceholder = {
  props: {
    tableRow: {},
    tableColumn: {},
  },
  render() {
    return (
      <TemplatePlaceholder
        name="tableCell"
        params={{ tableRow: this.tableRow, tableColumn: this.tableColumn }}
      />
    );
  },
};

const tableHeaderRows = [];
const tableBodyRowsComputed = ({ rows, getRowId }) =>
  tableRowsWithDataRows(rows, getRowId);

const pluginDependencies = [
  { name: 'DataTypeProvider', optional: true },
];

export const Table = {
  name: 'Table',
  props: {
    layoutComponent: {
      type: Object,
      required: true,
    },
    tableComponent: {
      type: Object,
      required: true,
    },
    headComponent: {
      type: Object,
      required: true,
    },
    bodyComponent: {
      type: Object,
      required: true,
    },
    containerComponent: {
      type: Object,
      required: true,
    },
    cellComponent: {
      type: Object,
      required: true,
    },
    rowComponent: {
      type: Object,
      required: true,
    },
    columnExtensions: {
      type: Array,
    },
  },
  render() {
    const {
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
      columnExtensions,
      containerComponent,
      tableComponent,
      headComponent,
      bodyComponent,
    } = this;

    const tableColumnsComputed = ({ columns }) =>
      tableColumnsWithDataRows(columns, columnExtensions);

    return (
      <Plugin
        name="Table"
        dependencies={pluginDependencies}
      >
        <Getter name="tableHeaderRows" value={tableHeaderRows} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />

        <Template name="body">
          <TemplatePlaceholder name="table" />
        </Template>
        <Template name="table">
          <TemplateConnector>
            {({
                getters: {
                  tableHeaderRows: headerRows, tableBodyRows: bodyRows, tableColumns: columns,
                },
              }) => (
              <Layout
                tableComponent={tableComponent}
                headComponent={headComponent}
                bodyComponent={bodyComponent}
                containerComponent={containerComponent}
                headerRows={headerRows}
                bodyRows={bodyRows}
                columns={columns}
                rowComponent={RowPlaceholder}
                cellComponent={CellPlaceholder}
              />
            )}
          </TemplateConnector>
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isDataTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ getters: { getCellValue } }) => {
                const value = getCellValue(params.tableRow.row, params.tableColumn.column.name);
                return (
                  <Cell
                    {...{ attrs: { ...params } }}
                    row={params.tableRow.row}
                    column={params.tableColumn.column}
                  >
                    {String(value)}
                  </Cell>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isDataTableRow(tableRow)}
        >
          {params => (
            <Row
              row={params.tableRow.row}
              {...{ attrs: { ...params } }}
            >
              <TemplatePlaceholderSlot params={params} />
            </Row>
          )}
        </Template>
      </Plugin>
    );
  },
};
