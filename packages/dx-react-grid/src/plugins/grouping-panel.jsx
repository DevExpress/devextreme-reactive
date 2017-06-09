import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { getColumnSortingDirection, tableColumnsWithoutGroups } from '@devexpress/dx-grid-core';

export class GroupingPanel extends React.PureComponent {
  render() {
    const { groupPanelTemplate, allowSorting } = this.props;

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
            <TemplatePlaceholder name="groupPanel" />
            <TemplatePlaceholder />
          </div>
        </Template>
        <Template
          name="groupPanel"
          connectGetters={getter => ({
            groupedColumns: getter('groupedColumns'),
            getSortingConfig: ({ column }) => {
              const sorting = getter('sorting');

              const result = {
                sortingSupported: !column.type && sorting !== undefined,
              };

              if (result.sortingSupported) {
                result.sortingDirection = getColumnSortingDirection(sorting, column.name);
              }

              return result;
            },
          })}
          connectActions={action => ({
            groupByColumn: action('groupByColumn'),
            changeSortingDirection: ({ keepOther, cancel, column }) =>
                action('setColumnSorting')({ columnName: column.name, keepOther, cancel }),
          })}
        >
          {params => groupPanelTemplate({ allowSorting, ...params })}
        </Template>
      </PluginContainer>
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  groupPanelTemplate: PropTypes.func.isRequired,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
};
