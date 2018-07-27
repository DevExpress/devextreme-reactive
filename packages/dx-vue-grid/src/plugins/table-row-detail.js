import {
  DxGetter,
  DxTemplate,
  DxPlugin,
  DxTemplateConnector,
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

const getCellColSpanComputed = (
  { getTableCellColSpan },
) => tableDetailCellColSpanGetter(getTableCellColSpan);

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

    const tableColumnsComputed = (
      { tableColumns },
    ) => tableColumnsWithDetail(tableColumns, toggleColumnWidth);
    const tableBodyRowsComputed = (
      { tableBodyRows, expandedDetailRowIds },
    ) => tableRowsWithExpandedDetail(tableBodyRows, expandedDetailRowIds, rowHeight);

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
          predicate={(
            { attrs: { tableRow, tableColumn } },
          ) => isDetailToggleTableCell(tableRow, tableColumn)}
        >
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
              {({
                getters: { expandedDetailRowIds },
                actions: { toggleDetailRowExpanded },
              }) => (
                <ToggleCell
                  {...{ attrs: { ...attrs }, on: { ...listeners } }}
                  row={attrs.tableRow.row}
                  expanded={isDetailRowExpanded(expandedDetailRowIds, attrs.tableRow.rowId)}
                  onToggle={() => toggleDetailRowExpanded({ rowId: attrs.tableRow.rowId })}
                />
              )}
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableCell"
          predicate={({ attrs: { tableRow } }) => isDetailTableRow(tableRow)}
        >
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
              {({
                getters: { tableColumns },
              }) => {
                if (isDetailTableCell(attrs.tableColumn, tableColumns)) {
                  return (
                    <Cell
                      {...{ attrs: { ...attrs }, on: { ...listeners } }}
                      row={attrs.tableRow.row}
                    >
                      <Content row={attrs.tableRow.row} />
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
          predicate={({ attrs: { tableRow } }) => isDetailTableRow(tableRow)}
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
      </DxPlugin>
    );
  },
};
