import {
  Getter,
  Template,
  Plugin,
  TemplateConnector,
  TemplatePlaceholderSlot,
} from '@devexpress/dx-vue-core';
import {
  tableRowsWithExpandedDetail,
  tableDetailCellColSpanGetter,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
  isDetailTableCell,
} from '@devexpress/dx-grid-core';

const getCellColSpanComputed = ({ getTableCellColSpan }) =>
  tableDetailCellColSpanGetter(getTableCellColSpan);

const pluginDependencies = [
  { name: 'RowDetailState' },
  { name: 'Table' },
];

export const TableRowDetail = {
  name: 'TableRowDetail',
  props: {
    contentComponent: {
      type: Object,
    },
    toggleCellComponent: {
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
    toggleColumnWidth: {
      type: Number,
      required: true,
    },
    rowHeight: {
      type: Number,
    },
  },
  render() {
    const {
      rowHeight,
      contentComponent: Content,
      toggleCellComponent: ToggleCell,
      cellComponent: Cell,
      rowComponent: Row,
      toggleColumnWidth,
    } = this;

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithDetail(tableColumns, toggleColumnWidth);
    const tableBodyRowsComputed = ({ tableBodyRows, expandedDetailRowIds }) =>
      tableRowsWithExpandedDetail(tableBodyRows, expandedDetailRowIds, rowHeight);

    return (
      <Plugin
        name="TableRowDetail"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="getTableCellColSpan" computed={getCellColSpanComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isDetailToggleTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({
                getters: { expandedDetailRowIds },
                actions: { toggleDetailRowExpanded },
              }) => (
                <ToggleCell
                  {...{ attrs: { ...params } }}
                  row={params.tableRow.row}
                  expanded={isDetailRowExpanded(expandedDetailRowIds, params.tableRow.rowId)}
                  onToggle={() => toggleDetailRowExpanded({ rowId: params.tableRow.rowId })}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
              {({
                getters: { tableColumns },
              }) => {
                if (isDetailTableCell(params.tableColumn, tableColumns)) {
                  return (
                    <Cell
                      {...{ attrs: { ...params } }}
                      row={params.tableRow.row}
                    >
                      <Content row={params.tableRow.row} />
                    </Cell>
                  );
                }
                return null;
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
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
      </Plugin>
    );
  },
};
