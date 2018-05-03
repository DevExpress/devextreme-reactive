import {
  DxGetter,
  DxTemplate,
  DxPlugin,
  DxTemplateConnector,
  DxTemplatePlaceholderSlot,
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
  { name: 'DxRowDetailState' },
  { name: 'DxTable' },
];

export const DxTableRowDetail = {
  name: 'DxTableRowDetail',
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
      <DxPlugin
        name="DxTableRowDetail"
        dependencies={pluginDependencies}
      >
        <DxGetter name="tableColumns" computed={tableColumnsComputed} />
        <DxGetter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <DxGetter name="getTableCellColSpan" computed={getCellColSpanComputed} />

        <DxTemplate
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isDetailToggleTableCell(tableRow, tableColumn)}
        >
          {params => (
            <DxTemplateConnector>
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
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableCell"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => (
            <DxTemplateConnector>
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
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
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
      </DxPlugin>
    );
  },
};
