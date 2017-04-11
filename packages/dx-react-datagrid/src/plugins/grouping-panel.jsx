import React from 'react';
import { Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export class GroupingPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = (tableColumns, grouping) => [
      ...tableColumns.filter(column => grouping.findIndex(g => g.column === column.name) === -1),
    ];
  }
  render() {
    const GroupPanel = this.props.groupPanelTemplate;

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
          connectActions={action => ({
            groupByColumn: ({ columnName, groupIndex }) => action('groupByColumn')({ columnName, groupIndex }),
          })}
        >
          {({ groupedColumns, groupByColumn }) => (
            <GroupPanel
              groupedColumns={groupedColumns}
              groupByColumn={groupByColumn}
            />
          )}
        </Template>
      </div>
    );
  }
}

GroupingPanel.propTypes = {
  groupPanelTemplate: React.PropTypes.func.isRequired,
};
