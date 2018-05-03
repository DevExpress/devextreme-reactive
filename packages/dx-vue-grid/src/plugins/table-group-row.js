import {
  DxGetter,
  DxTemplate,
  DxPlugin,
  DxTemplatePlaceholder,
  DxTemplateConnector,
  DxTemplatePlaceholderSlot,
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

const tableBodyRowsComputed = ({ tableBodyRows, isGroupRow }) =>
  tableRowsWithGrouping(tableBodyRows, isGroupRow);
const getCellColSpanComputed = ({ getTableCellColSpan }) =>
  tableGroupCellColSpanGetter(getTableCellColSpan);

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
    }) =>
      tableColumnsWithGrouping(
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
          predicate={({ tableRow }) => isGroupTableRow(tableRow)}
        >
          {params => (
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
                if (isGroupTableCell(params.tableRow, params.tableColumn)) {
                  return (
                    <DxTemplatePlaceholder
                      name="valueFormatter"
                      params={{
                        column: params.tableColumn.column,
                        value: params.tableRow.row.value,
                      }}
                    >
                      {content => (
                        <GroupCell
                          {...{ attrs: { ...params } }}
                          row={params.tableRow.row}
                          column={params.tableColumn.column}
                          expanded={expandedGroups.indexOf(params.tableRow.row.compoundKey) !== -1}
                          onToggle={() =>
                            toggleGroupExpanded({ groupKey: params.tableRow.row.compoundKey })}
                        >
                          {content}
                        </GroupCell>
                      )}
                    </DxTemplatePlaceholder>
                  );
                }
                if (isGroupIndentTableCell(params.tableRow, params.tableColumn, grouping)) {
                  if (GroupIndentCell) {
                    return (
                      <GroupIndentCell
                        {...{ attrs: { ...params } }}
                        row={params.tableRow.row}
                        column={params.tableColumn.column}
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
          predicate={({ tableRow }) => isGroupTableRow(tableRow)}
        >
          {params => (
            <GroupRow
              {...{ attrs: { ...params } }}
              row={params.tableRow.row}
            >
              <DxTemplatePlaceholderSlot params={params} />
            </GroupRow>
          )}
        </DxTemplate>
      </DxPlugin>
    );
  },
};
