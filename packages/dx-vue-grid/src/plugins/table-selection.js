import {
  DxGetter,
  DxTemplate,
  DxPlugin,
  DxTemplateConnector,
} from '@devexpress/dx-vue-core';
import {
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';

export const DxTableSelection = {
  name: 'DxTableSelection',
  props: {
    highlightRow: {
      type: Boolean,
    },
    selectByRowClick: {
      type: Boolean,
    },
    showSelectionColumn: {
      type: Boolean,
      default: true,
    },
    showSelectAll: {
      type: Boolean,
    },
    selectionColumnWidth: {
      type: Number,
      required: true,
    },
    rowComponent: {
      type: Object,
      required: true,
    },
    cellComponent: {
      type: Object,
      required: true,
    },
    headerCellComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      highlightRow,
      selectByRowClick,
      showSelectionColumn,
      showSelectAll,
      headerCellComponent: HeaderCell,
      cellComponent: Cell,
      rowComponent: Row,
      selectionColumnWidth,
    } = this;

    const tableColumnsComputed = (
      { tableColumns },
    ) => tableColumnsWithSelection(tableColumns, selectionColumnWidth);

    return (
      <DxPlugin
        name="DxTableSelection"
        dependencies={[
          { name: 'DxTable' },
          { name: 'DxSelectionState' },
          { name: 'DxIntegratedSelection', optional: !showSelectAll },
        ]}
      >
        {showSelectionColumn && (
          <DxGetter name="tableColumns" computed={tableColumnsComputed} />
        )}

        {(showSelectionColumn && showSelectAll) && (
          <DxTemplate
            name="tableCell"
            predicate={(
              { attrs: { tableRow, tableColumn } },
            ) => isSelectAllTableCell(tableRow, tableColumn)}
          >
            {({ attrs, listeners }) => (
              <DxTemplateConnector>
                {({
                  getters: { selectAllAvailable, allSelected, someSelected },
                  actions: { toggleSelectAll },
                }) => (
                    <HeaderCell
                      {...{ attrs: { ...attrs }, on: { ...listeners } }}
                      disabled={!selectAllAvailable}
                      allSelected={allSelected}
                      someSelected={someSelected}
                      onToggle={select => toggleSelectAll(select)}
                    />
                )}
              </DxTemplateConnector>
            )}
          </DxTemplate>
        )}
        {showSelectionColumn && (
          <DxTemplate
            name="tableCell"
            predicate={(
              { attrs: { tableRow, tableColumn } },
            ) => isSelectTableCell(tableRow, tableColumn)}
          >
            {({ attrs, listeners }) => (
              <DxTemplateConnector>
                {({
                  getters: { selection },
                  actions: { toggleSelection },
                }) => (
                    <Cell
                      {...{ attrs: { ...attrs }, on: { ...listeners } }}
                      row={attrs.tableRow.row}
                      selected={selection.indexOf(attrs.tableRow.rowId) !== -1}
                      onToggle={() => toggleSelection({ rowIds: [attrs.tableRow.rowId] })}
                    />
                )}
              </DxTemplateConnector>
            )}
          </DxTemplate>
        )}
        {(highlightRow || selectByRowClick) && (
          <DxTemplate
            name="tableRow"
            predicate={({ attrs: { tableRow } }) => isDataTableRow(tableRow)}
          >
            {({ attrs, listeners, slots }) => (
              <DxTemplateConnector>
                {({
                  getters: { selection },
                  actions: { toggleSelection },
                }) => (
                    <Row
                      {...{ attrs: { ...attrs }, on: { ...listeners } }}
                      selectByRowClick={selectByRowClick}
                      selected={highlightRow && selection.indexOf(attrs.tableRow.rowId) !== -1}
                      onToggle={() => toggleSelection({ rowIds: [attrs.tableRow.rowId] })}
                    >
                      {slots.default}
                    </Row>
                )}
              </DxTemplateConnector>
            )}
          </DxTemplate>
        )}
      </DxPlugin>
    );
  },
};
