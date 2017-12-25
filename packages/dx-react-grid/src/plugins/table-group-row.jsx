import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
  { pluginName: 'Table' },
  { pluginName: 'DataTypeProvider', optional: true },
];

const tableBodyRowsComputed = ({ tableBodyRows, isGroupRow }) =>
  tableRowsWithGrouping(tableBodyRows, isGroupRow);

const createShowWhenGrouped = (columns) => {
  const cache = columns.reduce((acc, column) => {
    acc[column.name] = column.showWhenGrouped;
    return acc;
  }, {});

  return columnName => cache[columnName] || false;
};

export class TableGroupRow extends React.PureComponent {
  render() {
    const {
      cellComponent: GroupCell,
      rowComponent: GroupRow,
      indentCellComponent: GroupIndentCell,
      indentColumnWidth,
      showColumnWhenGrouped,
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
        showColumnWhenGrouped || createShowWhenGrouped(columns),
      );

    return (
      <PluginContainer
        pluginName="TableGroupRow"
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
                      expanded={expandedGroups.has(params.tableRow.row.compoundKey)}
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
      </PluginContainer>
    );
  }
}

TableGroupRow.propTypes = {
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  indentCellComponent: PropTypes.func,
  indentColumnWidth: PropTypes.number.isRequired,
  showColumnWhenGrouped: PropTypes.func,
};

TableGroupRow.defaultProps = {
  indentCellComponent: null,
  showColumnWhenGrouped: undefined,
};
