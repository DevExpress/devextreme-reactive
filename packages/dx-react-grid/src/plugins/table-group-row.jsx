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

const getGroupIndentTableCellProps = ({ params }) => ({
  ...params,
  row: params.tableRow.row,
  column: params.tableColumn.column,
});

const getGroupTableCellProps = (
  params,
  { expandedGroups },
  { toggleGroupExpanded },
) => {
  const { compoundKey } = params.tableRow.row;
  return {
    ...params,
    row: params.tableRow.row,
    column: params.tableColumn.column,
    isExpanded: expandedGroups.has(compoundKey),
    toggleGroupExpanded: () => toggleGroupExpanded({ groupKey: compoundKey }),
  };
};

const getValueFormatterArgs = params => ({
  column: params.column,
  value: params.row.value,
});

const getGroupTableRowProps = params => ({
  ...params,
  row: params.tableRow.row,
});

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
      getCellComponent,
      rowComponent: GroupRow,
      indentCellComponent: GroupIndentCell,
      indentColumnWidth,
      showColumnWhenGrouped,
    } = this.props;

    const tableColumnsComputed = ({
      columns, tableColumns, grouping, draftGrouping,
    }) =>
      tableColumnsWithGrouping(
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
              {(getters, actions) => {
                const GroupCell = getCellComponent(params.tableColumn.column.name);
                const templateArgs = getGroupTableCellProps(params, getters, actions);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={getValueFormatterArgs(templateArgs)}
                  >
                    {content => (
                      <GroupCell {...templateArgs}>
                        {content}
                      </GroupCell>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        {GroupIndentCell && (
          <Template
            name="tableCell"
            predicate={({ tableRow, tableColumn }) => isGroupIndentTableCell(tableRow, tableColumn)}
          >
            {params => (
              <GroupIndentCell {...getGroupIndentTableCellProps({ params })} />
            )}
          </Template>
        )}
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isGroupTableRow(tableRow)}
        >
          {params => <GroupRow {...getGroupTableRowProps(params)} />}
        </Template>
      </PluginContainer>
    );
  }
}

TableGroupRow.propTypes = {
  getCellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  indentCellComponent: PropTypes.func,
  indentColumnWidth: PropTypes.number.isRequired,
  showColumnWhenGrouped: PropTypes.func,
};

TableGroupRow.defaultProps = {
  indentCellComponent: null,
  showColumnWhenGrouped: undefined,
};
