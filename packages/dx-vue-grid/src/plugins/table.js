import {
  DxGetter,
  DxTemplate,
  DxTemplatePlaceholder,
  DxTemplateConnector,
  DxPlugin,
} from '@devexpress/dx-vue-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  tableCellColSpanGetter,
  isDataTableCell,
  isDataTableRow,
  isHeaderStubTableCell,
  isNoDataTableRow,
  isNoDataTableCell,
} from '@devexpress/dx-grid-core';

const RowPlaceholder = {
  props: {
    tableRow: {
      type: Object,
      required: true,
    },
    height: {
      type: [Number, String],
    },
  },
  render() {
    return (
      <DxTemplatePlaceholder
        name="tableRow"
        {...{ attrs: { ...this.$props } }}
      >
        {this.$slots.default}
      </DxTemplatePlaceholder>
    );
  },
};

const CellPlaceholder = {
  props: {
    tableColumn: {
      type: Object,
      required: true,
    },
    tableRow: {
      type: Object,
      required: true,
    },
    colSpan: {
      type: Number,
      required: true,
    },
    rowSpan: {
      type: Number,
    },
  },
  render() {
    return (
      <DxTemplatePlaceholder
        name="tableCell"
        {...{ attrs: { ...this.$props } }}
      />
    );
  },
};

const tableHeaderRows = [];
const tableBodyRowsComputed = (
  { rows, getRowId },
) => tableRowsWithDataRows(rows, getRowId);

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
    const tableColumnsComputed = (
      { columns },
    ) => tableColumnsWithDataRows(columns, columnExtensions);

    return (
      <DxPlugin
        name="DxTable"
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
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
              {(
                { getters: { tableHeaderRows: headerRows } },
              ) => (isHeaderStubTableCell(attrs.tableRow, headerRows)
                ? <StubHeaderCell {...{ attrs: { ...attrs }, on: { ...listeners } }} />
                : <StubCell {...{ attrs: { ...attrs }, on: { ...listeners } }} />
              )
              }
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableCell"
          predicate={(
            { attrs: { tableRow, tableColumn } },
          ) => isDataTableCell(tableRow, tableColumn)}
        >
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
              {({ getters: { getCellValue } }) => {
                const value = getCellValue(attrs.tableRow.row, attrs.tableColumn.column.name);
                return (
                  <DxTemplatePlaceholder
                    name="valueFormatter"
                    row={attrs.tableRow.row}
                    column={attrs.tableColumn.column}
                    value={value}
                  >
                    {content => (
                      <Cell
                        {...{ attrs: { ...attrs }, on: { ...listeners } }}
                        row={attrs.tableRow.row}
                        column={attrs.tableColumn.column}
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
          predicate={({ attrs: { tableRow } }) => isNoDataTableRow(tableRow)}
        >
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
              {({ getters: { tableColumns } }) => {
                if (isNoDataTableCell(attrs.tableColumn, tableColumns)) {
                  return (
                    <NoDataCell
                      {...{ attrs: { ...attrs }, on: { ...listeners } }}
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
          {({ attrs, listeners, slots }) => (
            <StubRow {...{ attrs: { ...attrs }, on: { ...listeners } }}>
              {slots.default}
            </StubRow>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ attrs: { tableRow } }) => isDataTableRow(tableRow)}
        >
          {({ attrs, listeners, slots }) => (
            <Row
              {...{ attrs: { ...attrs }, on: { ...listeners } }}
              row={attrs.tableRow.row}
            >
              {slots.default}
            </Row>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ attrs: { tableRow } }) => isNoDataTableRow(tableRow)}
        >
          {({ attrs, listeners, slots }) => (
            <NoDataRow {...{ attrs: { ...attrs }, on: { ...listeners } }}>
              {slots.default}
            </NoDataRow>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
