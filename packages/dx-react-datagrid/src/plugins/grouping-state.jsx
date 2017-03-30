import React from 'react';
import { Getter, Action } from '@devexpress/dx-react-core';
import { groupByColumn, groupedRows, expandedGroupRows } from '@devexpress/dx-datagrid-core';

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.defaultGrouping || [],
      expandedGroups: props.defaultExpandedGroups || {},
    };

    this.toggleGroupExpanded = (groupKey) => {
      const prevExpandedGroups = this.props.expandedGroups || this.state.expandedGroups;
      const { expandedGroupsChange } = this.props;

      const expandedGroups = Object.assign({}, prevExpandedGroups);
      if (expandedGroups[groupKey]) {
        delete expandedGroups[groupKey];
      } else {
        expandedGroups[groupKey] = true;
      }

      this.setState({ expandedGroups });
      if (expandedGroupsChange) {
        expandedGroupsChange(expandedGroups);
      }
    };

    this._groupByColumn = (prevGrouping, { columnName, groupIndex }) => {
      const { groupingChange } = this.props;
      const grouping = groupByColumn(prevGrouping, { columnName, groupIndex });
      this.setState({ grouping });
      if (groupingChange) {
        groupingChange(grouping);
      }
    };
  }
  render() {
    const grouping = this.props.grouping || this.state.grouping;
    const expandedGroups = this.props.expandedGroups || this.state.expandedGroups;

    return (
      <div>
        <Action
          name="toggleGroupExpanded"
          action={({ groupKey }) => { this.toggleGroupExpanded(groupKey); }}
        />
        <Action
          name="groupByColumn"
          action={({ columnName, groupIndex }) => {
            this._groupByColumn(grouping, { columnName, groupIndex });
          }}
        />

        <Getter
          name="rows"
          pureComputed={groupedRows}
          connectArgs={getter => [
            getter('rows')(),
            grouping,
          ]}
        />

        <Getter
          name="rows"
          pureComputed={expandedGroupRows}
          connectArgs={getter => [
            getter('rows')(),
            expandedGroups,
          ]}
        />

        <Getter name="grouping" value={grouping} />
        <Getter name="expandedGroups" value={expandedGroups} />
      </div>
    );
  }
}

GroupingState.propTypes = {
  grouping: React.PropTypes.array,
  defaultGrouping: React.PropTypes.array,
  groupingChange: React.PropTypes.func,
  expandedGroups: React.PropTypes.array,
  defaultExpandedGroups: React.PropTypes.object,
  expandedGroupsChange: React.PropTypes.func,
};

GroupingState.defaultProps = {
  grouping: undefined,
  defaultGrouping: undefined,
  groupingChange: undefined,
  expandedGroups: undefined,
  defaultExpandedGroups: undefined,
  expandedGroupsChange: undefined,
};

