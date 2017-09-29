import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  Template,
  PluginContainer,
  TemplatePlaceholder,
  TemplateConnector,
  TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
} from '@devexpress/dx-grid-core';

const getGroupIndentTableCellTemplateArgs = ({ params }) => ({
  ...params,
  row: params.tableRow.row,
  column: params.tableColumn.column,
});

const getGroupTableCellTemplateArgs = (
  params,
  { expandedGroups },
  { toggleGroupExpanded },
) => ({
  ...params,
  row: params.tableRow.row,
  column: params.tableColumn.column,
  isExpanded: expandedGroups.has(params.tableRow.row.key),
  toggleGroupExpanded: () => toggleGroupExpanded({ groupKey: params.tableRow.row.key }),
});

const getValueFormatterArgs = params => ({
  column: params.column,
  value: params.row.value,
});

const getGroupTableRowTemplateArgs = params => ({
  ...params,
  row: params.tableRow.row,
});

const pluginDependencies = [
  { pluginName: 'GroupingState' },
  { pluginName: 'TableView' },
  { pluginName: 'DataTypeProvider', optional: true },
];

const tableBodyRowsComputed = ({ tableBodyRows }) => tableRowsWithGrouping(tableBodyRows);

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
      groupCellTemplate,
      groupRowTemplate,
      groupIndentCellTemplate,
      groupIndentColumnWidth,
      showColumnWhenGrouped,
    } = this.props;

    const tableColumnsComputed = ({ columns, tableColumns, grouping, draftGrouping }) =>
      tableColumnsWithGrouping(
        tableColumns,
        grouping,
        draftGrouping,
        groupIndentColumnWidth,
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
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isGroupTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => {
                const templateArgs = getGroupTableCellTemplateArgs(params, getters, actions);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={getValueFormatterArgs(templateArgs)}
                  >
                    {content => (
                      <TemplateRenderer
                        template={groupCellTemplate}
                        params={templateArgs}
                      >
                        {content}
                      </TemplateRenderer>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        {groupIndentCellTemplate && (
          <Template
            name="tableViewCell"
            predicate={({ tableRow, tableColumn }) => isGroupIndentTableCell(tableRow, tableColumn)}
          >
            {params => (
              <TemplateRenderer
                template={groupIndentCellTemplate}
                params={getGroupIndentTableCellTemplateArgs({ params })}
              />
            )}
          </Template>
        )}
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => isGroupTableRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
              {() => (
                <TemplateRenderer
                  template={groupRowTemplate}
                  params={getGroupTableRowTemplateArgs(params)}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableGroupRow.propTypes = {
  groupCellTemplate: PropTypes.func.isRequired,
  groupRowTemplate: PropTypes.func.isRequired,
  groupIndentCellTemplate: PropTypes.func,
  groupIndentColumnWidth: PropTypes.number.isRequired,
  showColumnWhenGrouped: PropTypes.func,
};

TableGroupRow.defaultProps = {
  groupIndentCellTemplate: null,
  showColumnWhenGrouped: undefined,
};
