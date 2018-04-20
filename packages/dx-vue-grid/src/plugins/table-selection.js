import {
  Getter, Template, Plugin,
  TemplateConnector, TemplatePlaceholderSlot,
} from '@devexpress/dx-vue-core';
import {
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';

export const TableSelection = {
  name: 'TableSelection',
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
      <Plugin
        name="TableSelection"
        dependencies={[
          { name: 'Table' },
          { name: 'SelectionState' },
          { name: 'IntegratedSelection', optional: !showSelectAll },
        ]}
      >
        {showSelectionColumn && (
          <Getter name="tableColumns" computed={tableColumnsComputed} />
        )}

        {(showSelectionColumn && showSelectAll) && (
          <Template
            name="tableCell"
            predicate={({ tableRow, tableColumn }) => isSelectAllTableCell(tableRow, tableColumn)}
          >
            {params => (
              <TemplateConnector>
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
              </TemplateConnector>
            )}
          </Template>
        )}
        {showSelectionColumn && (
          <Template
            name="tableCell"
            predicate={({ tableRow, tableColumn }) => isSelectTableCell(tableRow, tableColumn)}
          >
            {params => (
              <TemplateConnector>
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
              </TemplateConnector>
            )}
          </Template>
        )}
        {(highlightRow || selectByRowClick) && (
          <Template
            name="tableRow"
            predicate={({ tableRow }) => isDataTableRow(tableRow)}
          >
            {params => (
              <TemplateConnector>
                {({
                  getters: { selection },
                  actions: { toggleSelection },
                }) => (
                    <Row
                      {...{ attrs: { ...params } }}
                      selectByRowClick
                      selected={highlightRow && selection.indexOf(params.tableRow.rowId) !== -1}
                      onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                    >
                      <TemplatePlaceholderSlot params={params} />
                    </Row>
                  )}
              </TemplateConnector>
            )}
          </Template>
        )}
      </Plugin>
    );
  },
};
