import {
  DxGetter,
  DxTemplate,
  DxPlugin,
  DxTemplatePlaceholder,
  DxTemplateConnector,
} from '@devexpress/dx-vue-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  tableGroupCellColSpanGetter,
  isGroupIndentTableCell,
  isGroupTableCell,
  isGroupTableRow,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxGroupingState' },
  { name: 'DxTable' },
  { name: 'DxDataTypeProvider', optional: true },
];

const tableBodyRowsComputed = (
  { tableBodyRows, isGroupRow },
) => tableRowsWithGrouping(tableBodyRows, isGroupRow);
const getCellColSpanComputed = (
  { getTableCellColSpan },
) => tableGroupCellColSpanGetter(getTableCellColSpan);

const showColumnWhenGroupedGetter = (showColumnsWhenGrouped, columnExtensions = []) => {
  const map = columnExtensions.reduce((acc, columnExtension) => {
    acc[columnExtension.columnName] = columnExtension.showWhenGrouped;
    return acc;
  }, {});

  return columnName => map[columnName] || showColumnsWhenGrouped;
};

export const DxTableGroupRow = {
  name: 'DxTableGroupRow',
  props: {
    cellComponent: {
      type: Object,
      required: true,
    },
    rowComponent: {
      type: Object,
      required: true,
    },
    indentCellComponent: {
      type: Object,
    },
    indentColumnWidth: {
      type: Number,
      required: true,
    },
    showColumnsWhenGrouped: {
      type: Boolean,
    },
    columnExtensions: {
      type: Array,
    },
  },
  render() {
    const {
      cellComponent: GroupCell,
      rowComponent: GroupRow,
      indentCellComponent: GroupIndentCell,
      indentColumnWidth,
      showColumnsWhenGrouped,
      columnExtensions,
    } = this;

    const tableColumnsComputed = ({
      columns, tableColumns, grouping,
    }) => tableColumnsWithGrouping(
      columns,
      tableColumns,
      grouping,
      grouping,
      indentColumnWidth,
      showColumnWhenGroupedGetter(showColumnsWhenGrouped, columnExtensions),
    );
    return (
      <DxPlugin
        name="DxTableGroupRow"
        dependencies={pluginDependencies}
      >
        <DxGetter name="tableColumns" computed={tableColumnsComputed} />
        <DxGetter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <DxGetter name="getTableCellColSpan" computed={getCellColSpanComputed} />

        <DxTemplate
          name="tableCell"
          predicate={({ attrs: { tableRow } }) => isGroupTableRow(tableRow)}
        >
          {({ attrs, listeners }) => (
            <DxTemplateConnector>
              {({
                getters: {
                  grouping,
                  expandedGroups,
                },
                actions: {
                  toggleGroupExpanded,
                },
              }) => {
                if (isGroupTableCell(attrs.tableRow, attrs.tableColumn)) {
                  return (
                    <DxTemplatePlaceholder
                      name="valueFormatter"
                      column={attrs.tableColumn.column}
                      value={attrs.tableRow.row.value}
                    >
                      {content => (
                        <GroupCell
                          {...{ attrs: { ...attrs }, on: { ...listeners } }}
                          row={attrs.tableRow.row}
                          column={attrs.tableColumn.column}
                          expanded={expandedGroups.indexOf(attrs.tableRow.row.compoundKey) !== -1}
                          onToggle={
                            () => toggleGroupExpanded({ groupKey: attrs.tableRow.row.compoundKey })}
                        >
                          {content}
                        </GroupCell>
                      )}
                    </DxTemplatePlaceholder>
                  );
                }
                if (isGroupIndentTableCell(attrs.tableRow, attrs.tableColumn, grouping)) {
                  if (GroupIndentCell) {
                    return (
                      <GroupIndentCell
                        {...{ attrs: { ...attrs }, on: { ...listeners } }}
                        row={attrs.tableRow.row}
                        column={attrs.tableColumn.column}
                      />
                    );
                  }
                  return <DxTemplatePlaceholder />;
                }
                return null;
              }}
            </DxTemplateConnector>
          )}
        </DxTemplate>
        <DxTemplate
          name="tableRow"
          predicate={({ attrs: { tableRow } }) => isGroupTableRow(tableRow)}
        >
          {({ attrs, listeners, slots }) => (
            <GroupRow
              {...{ attrs: { ...attrs }, on: { ...listeners } }}
              row={attrs.tableRow.row}
            >
              {slots.default}
            </GroupRow>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
