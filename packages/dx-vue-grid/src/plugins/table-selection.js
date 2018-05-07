import {
  DxGetter, DxTemplate, DxPlugin,
  DxTemplateConnector, DxTemplatePlaceholderSlot,
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

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithSelection(tableColumns, selectionColumnWidth);

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
            predicate={({ tableRow, tableColumn }) => isSelectAllTableCell(tableRow, tableColumn)}
          >
            {params => (
              <DxTemplateConnector>
                {({
                  getters: { selectAllAvailable, allSelected, someSelected },
                  actions: { toggleSelectAll },
                }) => (
                    <HeaderCell
                      {...{ attrs: { ...params } }}
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
            predicate={({ tableRow, tableColumn }) => isSelectTableCell(tableRow, tableColumn)}
          >
            {params => (
              <DxTemplateConnector>
                {({
                  getters: { selection },
                  actions: { toggleSelection },
                }) => (
                    <Cell
                      {...{ attrs: { ...params } }}
                      row={params.tableRow.row}
                      selected={selection.indexOf(params.tableRow.rowId) !== -1}
                      onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                    />
                  )}
              </DxTemplateConnector>
            )}
          </DxTemplate>
        )}
        {(highlightRow || selectByRowClick) && (
          <DxTemplate
            name="tableRow"
            predicate={({ tableRow }) => isDataTableRow(tableRow)}
          >
            {params => (
              <DxTemplateConnector>
                {({
                  getters: { selection },
                  actions: { toggleSelection },
                }) => (
                    <Row
                      {...{ attrs: { ...params } }}
                      selectByRowClick={selectByRowClick}
                      selected={highlightRow && selection.indexOf(params.tableRow.rowId) !== -1}
                      onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                    >
                      <DxTemplatePlaceholderSlot params={params} />
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
