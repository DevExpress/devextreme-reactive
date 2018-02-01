import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, Plugin, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'GroupingState' },
  { name: 'Table' },
  { name: 'DataTypeProvider', optional: true },
];

const tableBodyRowsComputed = ({ tableBodyRows, isGroupRow }) =>
  tableRowsWithGrouping(tableBodyRows, isGroupRow);

const showColumnWhenGroupedGetter = (showColumnsWhenGrouped, columnExtensions = []) => {
  const map = columnExtensions.reduce((acc, columnExtension) => {
    acc[columnExtension.columnName] = columnExtension.showWhenGrouped;
    return acc;
  }, {});

  return columnName => map[columnName] || showColumnsWhenGrouped;
};

export class TableGroupRow extends React.PureComponent {
  render() {
    const {
      cellComponent: GroupCell,
      rowComponent: GroupRow,
      indentCellComponent: GroupIndentCell,
      indentColumnWidth,
      showColumnsWhenGrouped,
      columnExtensions,
    } = this.props;

    const tableColumnsComputed = ({
      columns, tableColumns, grouping, draftGrouping,
    }) =>
      tableColumnsWithGrouping(
        columns,
        tableColumns,
        grouping,
        draftGrouping,
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

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isGroupTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ expandedGroups }, { toggleGroupExpanded }) => (
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
              )}
            </TemplateConnector>
          )}
        </Template>
        {GroupIndentCell && (
          <Template
            name="tableCell"
            predicate={({ tableRow, tableColumn }) => isGroupIndentTableCell(tableRow, tableColumn)}
          >
            {params => (
              <GroupIndentCell
                {...params}
                row={params.tableRow.row}
                column={params.tableColumn.column}
              />
            )}
          </Template>
        )}
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isGroupTableRow(tableRow)}
        >
          {params => (
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

TableGroupRow.propTypes = {
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  indentCellComponent: PropTypes.func,
  indentColumnWidth: PropTypes.number.isRequired,
  showColumnsWhenGrouped: PropTypes.bool,
  columnExtensions: PropTypes.array,
};

TableGroupRow.defaultProps = {
  indentCellComponent: null,
  showColumnsWhenGrouped: false,
  columnExtensions: undefined,
};
