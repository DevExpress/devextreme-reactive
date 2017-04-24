import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action } from '@devexpress/dx-react-core';
import { groupByColumn } from '@devexpress/dx-datagrid-core';

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
    this._groupedColumns = (columns, grouping) =>
      grouping.map(group => columns.find(c => c.name === group.column));
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

        <Getter name="grouping" value={grouping} />
        <Getter name="expandedGroups" value={expandedGroups} />
        <Getter
          name="groupedColumns"
          pureComputed={this._groupedColumns}
          connectArgs={getter => [
            getter('columns'),
            grouping,
          ]}
        />
      </div>
    );
  }
}

GroupingState.propTypes = {
  grouping: PropTypes.array,
  defaultGrouping: PropTypes.array,
  groupingChange: PropTypes.func,
  expandedGroups: PropTypes.array,
  defaultExpandedGroups: PropTypes.object,
  expandedGroupsChange: PropTypes.func,
};

GroupingState.defaultProps = {
  grouping: undefined,
  defaultGrouping: undefined,
  groupingChange: undefined,
  expandedGroups: undefined,
  defaultExpandedGroups: undefined,
  expandedGroupsChange: undefined,
};

