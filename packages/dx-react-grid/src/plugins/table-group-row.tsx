import * as React from 'react';
import {
  Getter, Template, Plugin, TemplatePlaceholder, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  tableGroupCellColSpanGetter,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
  TABLE_GROUP_TYPE,
} from '@devexpress/dx-grid-core';
import {
  TableGroupRowProps, ShowColumnWhenGroupedGetterFn, TableCellProps, TableRowProps,
} from '../types';

const pluginDependencies = [
  { name: 'GroupingState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
  { name: 'TableSelection', optional: true },
];

const tableBodyRowsComputed = (
  { tableBodyRows, isGroupRow }: Getters,
) => tableRowsWithGrouping(tableBodyRows, isGroupRow);
const getCellColSpanComputed = (
  { getTableCellColSpan }: Getters,
) => tableGroupCellColSpanGetter(getTableCellColSpan);

const showColumnWhenGroupedGetter: ShowColumnWhenGroupedGetterFn = (
  showColumnsWhenGrouped, columnExtensions = [],
) => {
  const map = columnExtensions.reduce((acc, columnExtension) => {
    acc[columnExtension.columnName] = columnExtension.showWhenGrouped;
    return acc;
  }, {});

  return columnName => map[columnName] || showColumnsWhenGrouped;
};

class TableGroupRowBase extends React.PureComponent<TableGroupRowProps> {
  static ROW_TYPE = TABLE_GROUP_TYPE;
  static COLUMN_TYPE = TABLE_GROUP_TYPE;
  static defaultProps = {
    showColumnsWhenGrouped: false,
  };
  static components = {
    rowComponent: 'Row',
    cellComponent: 'Cell',
    contentComponent: 'Content',
    iconComponent: 'Icon',
  };

  render() {
    const {
      cellComponent: GroupCell,
      contentComponent: Content,
      iconComponent: Icon,
      rowComponent: GroupRow,
      indentCellComponent: GroupIndentCell,
      indentColumnWidth,
      showColumnsWhenGrouped,
      columnExtensions,
    } = this.props;

    const tableColumnsComputed = ({
      columns, tableColumns, grouping, draftGrouping,
    }: Getters) => tableColumnsWithGrouping(
      columns,
      tableColumns,
      grouping,
      draftGrouping,
      indentColumnWidth,
      showColumnWhenGroupedGetter(showColumnsWhenGrouped!, columnExtensions),
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
          predicate={({ tableRow }: any) => isGroupTableRow(tableRow)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({ grouping, expandedGroups }, { toggleGroupExpanded }) => {
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
                          {...params}
                          contentComponent={Content}
                          iconComponent={Icon}
                          row={params.tableRow.row}
                          column={params.tableColumn.column!}
                          expanded={expandedGroups.indexOf(params.tableRow.row.compoundKey) !== -1}
                          onToggle={() => toggleGroupExpanded(
                            { groupKey: params.tableRow.row.compoundKey },
                          )}
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
                        {...params}
                        row={params.tableRow.row}
                        column={params.tableColumn.column!}
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
          predicate={({ tableRow }: any) => isGroupTableRow(tableRow)}
        >
          {(params: TableRowProps) => (
            <GroupRow
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders group rows and enables them to expand and collapse. */
export const TableGroupRow: React.ComponentType<TableGroupRowProps> & {
  /** The group column type's identifier. */
  COLUMN_TYPE: symbol;
  /** The group row type's identifier. */
  ROW_TYPE: symbol;
} = TableGroupRowBase;
