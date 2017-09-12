import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  Template,
  PluginContainer,
  TemplatePlaceholder,
  TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  isGroupTableCell,
  isGroupIndentTableCell,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
  { pluginName: 'TableView' },
];

const tableBodyRowsComputed = ({ tableBodyRows }) => tableRowsWithGrouping(tableBodyRows);

export class TableGroupRow extends React.PureComponent {
  render() {
    const {
      groupCellTemplate,
      groupIndentCellTemplate,
      groupIndentColumnWidth,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns, grouping, draftGrouping }) =>
      tableColumnsWithGrouping(tableColumns, grouping, draftGrouping, groupIndentColumnWidth);

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
          connectGetters={getter => ({ expandedGroups: getter('expandedGroups') })}
          connectActions={action => ({ toggleGroupExpanded: action('toggleGroupExpanded') })}
        >
          {({ expandedGroups, toggleGroupExpanded, ...params }) => {
            const { tableColumn: { column }, tableRow: { row } } = params;
            return (
              <TemplatePlaceholder
                name="valueFormatter"
                params={{
                  row,
                  column,
                  value: row.value,
                }}
              >
                {content => (
                  <TemplateRenderer
                    template={groupCellTemplate}
                    {...{
                      ...params,
                      row,
                      column,
                      value: row.value,
                      isExpanded: expandedGroups.has(row.key),
                      toggleGroupExpanded: () => toggleGroupExpanded({ groupKey: row.key }),
                    }}
                  >
                    {content}
                  </TemplateRenderer>
                )}
              </TemplatePlaceholder>
            );
          }}
        </Template>
        {groupIndentCellTemplate && (
          <Template
            name="tableViewCell"
            predicate={({ tableRow, tableColumn }) => isGroupIndentTableCell(tableRow, tableColumn)}
          >
            {params => groupIndentCellTemplate({
              ...params,
              row: params.tableRow.row,
              column: params.tableColumn.column,
            })}
          </Template>
        )}
      </PluginContainer>
    );
  }
}

TableGroupRow.propTypes = {
  groupCellTemplate: PropTypes.func.isRequired,
  groupIndentCellTemplate: PropTypes.func,
  groupIndentColumnWidth: PropTypes.number.isRequired,
};

TableGroupRow.defaultProps = {
  groupIndentCellTemplate: null,
};
