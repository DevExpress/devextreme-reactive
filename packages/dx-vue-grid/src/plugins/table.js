import {
  DxGetter,
  DxTemplate,
  DxTemplatePlaceholder,
  DxTemplatePlaceholderSlot,
  DxTemplateConnector,
  DxPlugin,
} from '@devexpress/dx-vue-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  tableCellColSpanGetter,
  isDataTableCell,
  isDataTableRow,
  isHeaderStubTableCell,
  isNoDataTableRow,
  isNoDataTableCell,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const RowPlaceholder = {
  functional: true,
  render(h, context) {
    return (
      <DxTemplatePlaceholder
        name="tableRow"
        params={context.props}
      >
        {context.children}
      </DxTemplatePlaceholder>
    );
  },
};
const CellPlaceholder = {
  functional: true,
  render(h, context) {
    return (
      <DxTemplatePlaceholder
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
  { name: 'DxDataTypeProvider', optional: true },
];

export const DxTable = {
  name: 'DxTable',
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
    stubRowComponent: {
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
      stubRowComponent: StubRow,
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
      <DxPlugin
        name="DxTable"
        dependencies={pluginDependencies}
      >
        <DxGetter name="tableHeaderRows" value={tableHeaderRows} />
        <DxGetter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <DxGetter name="tableColumns" computed={tableColumnsComputed} />
        <DxGetter name="getTableCellColSpan" value={tableCellColSpanGetter} />

        <DxTemplate name="body">
          <DxTemplatePlaceholder name="table" />
        </DxTemplate>
        <DxTemplate name="table">
          <DxTemplateConnector>
            {({
              getters: {
                tableHeaderRows: headerRows,
                tableBodyRows: bodyRows,
                tableColumns: columns,
                getTableCellColSpan,
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
                getCellColSpan={getTableCellColSpan}
              />
            )}
          </DxTemplateConnector>
        </DxTemplate>
        <DxTemplate name="tableCell">
          {params => (
            <DxTemplateConnector>
              {({ getters: { tableHeaderRows: headerRows } }) =>
                (isHeaderStubTableCell(params.tableRow, headerRows)
                  ? <StubHeaderCell {...{ attrs: { ...params } }} />
                  : <StubCell {...{ attrs: { ...params } }} />
                )
              }
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isDataTableCell(tableRow, tableColumn)}
        >
          {params => (
            <DxTemplateConnector>
              {({ getters: { getCellValue } }) => {
                const value = getCellValue(params.tableRow.row, params.tableColumn.column.name);
                return (
                  <DxTemplatePlaceholder
                    name="valueFormatter"
                    params={{
                      row: params.tableRow.row,
                      column: params.tableColumn.column,
                      value,
                    }}
                  >
                    {content => (
                      <Cell
                        {...{ attrs: { ...params } }}
                        row={params.tableRow.row}
                        column={params.tableColumn.column}
                        value={value}
                      >
                        {content}
                      </Cell>
                    )}
                  </DxTemplatePlaceholder>
                );
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableCell"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => (
            <DxTemplateConnector>
              {({ getters: { tableColumns } }) => {
                if (isNoDataTableCell(params.tableColumn, tableColumns)) {
                  return (
                    <NoDataCell
                      {...{ attrs: { ...params } }}
                      getMessage={getMessage}
                    />
                  );
                }
                return null;
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate name="tableRow">
          {params => (
            <StubRow {...{ attrs: { ...params } }}>
              <DxTemplatePlaceholderSlot params={params} />
            </StubRow>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ tableRow }) => isDataTableRow(tableRow)}
        >
          {params => (
            <Row
              {...{ attrs: { ...params } }}
              row={params.tableRow.row}
            >
              <DxTemplatePlaceholderSlot params={params} />
            </Row>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ tableRow }) => isNoDataTableRow(tableRow)}
        >
          {params => (
            <NoDataRow {...{ attrs: { ...params } }}>
              <DxTemplatePlaceholderSlot params={params} />
            </NoDataRow>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
