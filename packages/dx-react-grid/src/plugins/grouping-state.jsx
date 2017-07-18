import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  groupByColumn,
  groupedColumns,
  nextExpandedGroups,
  visualGrouping,
  startGroupingChange,
  cancelGroupingChange,
  visuallyGroupedColumns,
} from '@devexpress/dx-grid-core';

const arrayToSet = array => new Set(array);

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.defaultGrouping || [],
      groupingChange: null,
      expandedGroups: props.defaultExpandedGroups || [],
    };

    this.toggleGroupExpanded = (groupKey) => {
      const prevExpandedGroups = this.props.expandedGroups || this.state.expandedGroups;
      const { onExpandedGroupsChange } = this.props;
      const expandedGroups = nextExpandedGroups(prevExpandedGroups, groupKey);

      this.setState({ expandedGroups });
      if (onExpandedGroupsChange) {
        onExpandedGroupsChange(expandedGroups);
      }
    };

    this._groupByColumn = (prevGrouping, { columnName, groupIndex }) => {
      const { onGroupingChange } = this.props;
      const grouping = groupByColumn(prevGrouping, { columnName, groupIndex });
      this.setState({ grouping });
      if (onGroupingChange) {
        onGroupingChange(grouping);
      }
    };

    this.startGroupingChange = (groupingChange) => {
      this.setState({
        groupingChange: startGroupingChange(this.state.groupingChange, groupingChange),
      });
    };

    this.cancelGroupingChange = () => {
      this.setState({
        groupingChange: cancelGroupingChange(),
      });
    };
  }
  render() {
    const { groupingChange } = this.state;
    const grouping = this.props.grouping || this.state.grouping;
    const expandedGroups = this.props.expandedGroups || this.state.expandedGroups;

    return (
      <PluginContainer>
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
        <Action
          name="startGroupingChange"
          action={(change) => { this.startGroupingChange(change); }}
        />
        <Action
          name="cancelGroupingChange"
          action={() => { this.cancelGroupingChange(); }}
        />

        <Getter
          name="grouping"
          value={grouping}
        />
        <Getter
          name="visualGrouping"
          pureComputed={visualGrouping}
          connectArgs={() => [
            grouping,
            groupingChange,
          ]}
        />
        <Getter
          name="visuallyGroupedColumns"
          pureComputed={visuallyGroupedColumns}
          connectArgs={getter => [
            getter('columns'),
            getter('visualGrouping'),
          ]}
        />
        <Getter
          name="expandedGroups"
          pureComputed={arrayToSet}
          connectArgs={() => [expandedGroups]}
        />
        <Getter
          name="groupedColumns"
          pureComputed={groupedColumns}
          connectArgs={getter => [
            getter('columns'),
            grouping,
          ]}
        />
      </PluginContainer>
    );
  }
}

GroupingState.propTypes = {
  grouping: PropTypes.array,
  defaultGrouping: PropTypes.array,
  onGroupingChange: PropTypes.func,
  expandedGroups: PropTypes.array,
  defaultExpandedGroups: PropTypes.array,
  onExpandedGroupsChange: PropTypes.func,
};

GroupingState.defaultProps = {
  grouping: undefined,
  defaultGrouping: undefined,
  onGroupingChange: undefined,
  expandedGroups: undefined,
  defaultExpandedGroups: undefined,
  onExpandedGroupsChange: undefined,
};
