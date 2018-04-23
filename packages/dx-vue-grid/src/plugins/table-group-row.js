import {
  Getter,
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
  TemplatePlaceholderSlot,
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
  { name: 'GroupingState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
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

export const TableGroupRow = {
  name: 'TableGroupRow',
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
      <Plugin
        name="TableGroupRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="getTableCellColSpan" computed={getCellColSpanComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow }) => isGroupTableRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
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
                    <TemplatePlaceholder
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
                    </TemplatePlaceholder>
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
                  return <TemplatePlaceholder />;
                }
                return null;
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isGroupTableRow(tableRow)}
        >
          {params => (
            <GroupRow
              {...{ attrs: { ...params } }}
              row={params.tableRow.row}
            >
              <TemplatePlaceholderSlot params={params} />
            </GroupRow>
          )}
        </Template>
      </Plugin>
    );
  },
};
