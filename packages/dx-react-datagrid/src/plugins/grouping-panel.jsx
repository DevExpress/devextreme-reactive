import React from 'react';
import { Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { getColumnSortingDirection } from '@devexpress/dx-datagrid-core';

export const GroupPanelCellTemplate = props =>
  <TemplatePlaceholder name="groupingPanelCell" params={props} />;

export class GroupingPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = (tableColumns, grouping) => [
      ...tableColumns.filter(column => grouping.findIndex(g => g.column === column.name) === -1),
    ];
  }
  render() {
    const { sortingEnabled, groupPanelTemplate, groupPanelCellTemplate } = this.props;
    const GroupPanel = groupPanelTemplate;
    const GroupPanelCell = groupPanelCellTemplate;

    return (
      <div>
        <Getter
          name="tableColumns"
          pureComputed={this._tableColumns}
          connectArgs={getter => [
            getter('tableColumns'),
            getter('grouping'),
          ]}
        />

        <Template name="gridHeading">
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
            const sortings = getter('sortings');

            const result = {
              sortingSupported: !column.type && sortings !== undefined,
            };

            if (result.sortingSupported) {
              result.sortDirection = getColumnSortingDirection(sortings, column.name);
            }

            return result;
          }}
          connectActions={(action, { column }) => ({
            groupByColumn: ({ columnName, groupIndex }) => action('groupByColumn')({ columnName, groupIndex }),
            changeSortDirection: ({ keepOther }) => action('setColumnSorting')({ columnName: column.name, keepOther }),
          })}
        >
          {({ sortingSupported, ...restParams }) => (
            <GroupPanelCell
              {...restParams}
              sortingEnabled={sortingEnabled && sortingSupported}
            />
          )}
        </Template>
      </div>
    );
  }
}

GroupingPanel.propTypes = {
  sortingEnabled: React.PropTypes.bool,
  groupPanelTemplate: React.PropTypes.func.isRequired,
  groupPanelCellTemplate: React.PropTypes.func.isRequired,
};

GroupingPanel.defaultProps = {
  sortingEnabled: false,
};
