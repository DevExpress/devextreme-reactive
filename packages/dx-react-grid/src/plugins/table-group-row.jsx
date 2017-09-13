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
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => {
                const templateArgs = getGroupTableCellTemplateArgs(params, getters, actions);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={{
                      row: templateArgs.row,
                      column: templateArgs.column,
                      value: templateArgs.row.value,
                    }}
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
