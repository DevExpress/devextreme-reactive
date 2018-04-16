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
  isHeaderStubTableCell,
  isNoDataTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const RowPlaceholder = {
  functional: true,
  render(h, context) {
    return (
      <TemplatePlaceholder
        name="tableRow"
        params={context.props}
      >
        {context.children}
      </TemplatePlaceholder>
    );
  },
};
const CellPlaceholder = {
  functional: true,
  render(h, context) {
    return (
      <TemplatePlaceholder
        name="tableCell"
        params={context.props}
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
    stubCellComponent: {
      type: Object,
      required: true,
    },
    stubHeaderCellComponent: {
      type: Object,
      required: true,
    },
    noDataRowComponent: {
      type: Object,
      required: true,
    },
    noDataCellComponent: {
      type: Object,
      required: true,
    },
    columnExtensions: {
      type: Array,
    },
    messages: {
      type: Object,
    },
  },
  render() {
    const {
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
      noDataRowComponent: NoDataRow,
      noDataCellComponent: NoDataCell,
      stubCellComponent: StubCell,
      stubHeaderCellComponent: StubHeaderCell,
      columnExtensions,
      containerComponent,
      tableComponent,
      headComponent,
      bodyComponent,
      messages,
    } = this;

    const getMessage = getMessagesFormatter(messages);
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
                  tableHeaderRows: headerRows,
                  tableBodyRows: bodyRows,
                  tableColumns: columns,
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
        <Template name="tableCell">
          {params => (
            <TemplateConnector>
              {({ getters: { tableHeaderRows: headerRows } }) =>
                (isHeaderStubTableCell(params.tableRow, headerRows)
                  ? <StubHeaderCell {...{ attrs: { ...params } }} />
                  : <StubCell {...{ attrs: { ...params } }} />
                )
              }
            </TemplateConnector>
          )}
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
              {...{ attrs: { ...params } }}
              row={params.tableRow.row}
            >
              <TemplatePlaceholderSlot params={params} />
            </Row>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => (
            <NoDataCell
              {...{ attrs: { ...params } }}
              getMessage={getMessage}
            />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => (
            <NoDataRow {...{ attrs: { ...params } }}>
              <TemplatePlaceholderSlot params={params} />
            </NoDataRow>
          )}
        </Template>
      </Plugin>
    );
  },
};
