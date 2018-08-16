import {
  DxTemplate, DxPlugin, DxTemplateConnector, DxTemplatePlaceholder,
} from '@devexpress/dx-vue-core';
import { isTreeTableCell } from '@devexpress/dx-grid-core';

export const DxTableTreeColumn = {
  name: 'DxTableTreeColumn',
  props: {
    for: {
      type: String,
      required: true,
    },
    showSelectionControls: {
      type: Boolean,
      default: false,
    },
    showSelectAll: {
      type: Boolean,
      default: false,
    },
    cellComponent: {
      type: Object,
      required: true,
    },
    indentComponent: {
      type: Object,
      required: true,
    },
    expandButtonComponent: {
      type: Object,
      required: true,
    },
    checkboxComponent: {
      type: Object,
      required: true,
    },
    contentComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      for: forColumnName,
      showSelectionControls,
      showSelectAll,
      indentComponent: Indent,
      expandButtonComponent: ExpandButton,
      checkboxComponent: Checkbox,
      contentComponent: Content,
      cellComponent: Cell,
    } = this;

    return (
      <DxPlugin
        name="DxTableTreeColumn"
        dependencies={[
          { name: 'DxDataTypeProvider', optional: true },
          { name: 'DxTreeDataState' },
          { name: 'DxSelectionState', optional: !showSelectionControls },
          { name: 'DxIntegratedSelection', optional: !showSelectAll },
          { name: 'DxTable' },
          { name: 'DxTableHeaderRow', optional: true },
        ]}
      >
        <DxTemplate
          name="tableHeaderCellBefore"
          predicate={({ attrs: { column } }) => column.name === forColumnName}
        >
          <div style="display: flex">
            <ExpandButton
              visible={false}
            />
            {showSelectionControls && showSelectAll && (
              <DxTemplateConnector>
                {({
                  getters: { selectAllAvailable, allSelected, someSelected },
                  actions: { toggleSelectAll },
                }) => (
                  <Checkbox
                    disabled={!selectAllAvailable}
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleSelectAll}
                  />
                )}
              </DxTemplateConnector>
            )}
          </div>
        </DxTemplate>
        <DxTemplate
          name="tableCell"
          predicate={(
            { attrs: { tableRow, tableColumn } },
          ) => isTreeTableCell(tableRow, tableColumn, forColumnName)}
        >
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
              {({
                getters: {
                  getCollapsedRows, expandedRowIds, selection,
                  isTreeRowLeaf, getTreeRowLevel, getCellValue,
                },
                actions: { toggleRowExpanded, toggleSelection },
              }) => {
                const { row, rowId } = attrs.tableRow;
                const columnName = attrs.tableColumn.column.name;
                const value = getCellValue(row, columnName);
                const collapsedRows = getCollapsedRows(row);
                return (
                  <DxTemplatePlaceholder
                    name="valueFormatter"
                    row={row}
                    column={attrs.tableColumn.column}
                    value={value}
                  >
                    {content => (
                      <Cell
                        {...{ attrs: { ...attrs }, on: { ...listeners } }}
                        row={row}
                        column={attrs.tableColumn.column}
                        value={value}
                      >
                        <Indent
                          level={getTreeRowLevel(row)}
                        />
                        <ExpandButton
                          visible={collapsedRows ? !!collapsedRows.length : !isTreeRowLeaf(row)}
                          expanded={expandedRowIds.indexOf(rowId) > -1}
                          onToggle={() => toggleRowExpanded({ rowId })}
                        />
                        {showSelectionControls && (
                          <Checkbox
                            disabled={false}
                            checked={selection.indexOf(rowId) > -1}
                            indeterminate={false}
                            onChange={() => toggleSelection({ rowIds: [rowId] })}
                          />
                        )}
                        <Content>
                          {content || value}
                        </Content>
                      </Cell>
                    )}
                  </DxTemplatePlaceholder>
                );
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
