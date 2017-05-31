import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { getColumnSortingDirection, tableColumnsWithoutGroups } from '@devexpress/dx-grid-core';

export const GroupPanelCellTemplate = props =>
  <TemplatePlaceholder name="groupingPanelCell" params={props} />;

export class GroupingPanel extends React.PureComponent {
  render() {
    const { allowSorting, groupPanelTemplate, groupPanelCellTemplate } = this.props;
    const GroupPanel = groupPanelTemplate;
    const GroupPanelCell = groupPanelCellTemplate;

    return (
      <PluginContainer>
        <Getter
          name="tableColumns"
          pureComputed={tableColumnsWithoutGroups}
          connectArgs={getter => [
            getter('tableColumns'),
            getter('grouping'),
          ]}
        />

        <Template name="header">
          <div>
            <TemplatePlaceholder name="group-panel" />
            <TemplatePlaceholder />
          </div>
        </Template>
        <Template
          name="group-panel"
          connectGetters={getter => ({
            groupedColumns: getter('groupedColumns'),
          })}
        >
          {({ groupedColumns }) => (
            <GroupPanel
              groupedColumns={groupedColumns}
              cellTemplate={GroupPanelCellTemplate}
            />
          )}
        </Template>
        <Template
          name="groupingPanelCell"
          connectGetters={(getter, { column }) => {
            const sorting = getter('sorting');

            const result = {
              sortingSupported: !column.type && sorting !== undefined,
            };

            if (result.sortingSupported) {
              result.sortingDirection = getColumnSortingDirection(sorting, column.name);
            }

            return result;
          }}
          connectActions={(action, { column }) => ({
            groupByColumn: ({ columnName, groupIndex }) => action('groupByColumn')({ columnName, groupIndex }),
            changeSortingDirection: ({ keepOther, cancel }) => action('setColumnSorting')({ columnName: column.name, keepOther, cancel }),
          })}
        >
          {({ sortingSupported, ...restParams }) => (
            <GroupPanelCell
              {...restParams}
              allowSorting={allowSorting && sortingSupported}
            />
          )}
        </Template>
      </PluginContainer>
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  groupPanelTemplate: PropTypes.func.isRequired,
  groupPanelCellTemplate: PropTypes.func.isRequired,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
};
