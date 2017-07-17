import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  groupByColumn,
  groupedColumns,
  nextExpandedGroups,
  updateExpandedGroups,
} from '@devexpress/dx-grid-core';

const arrayToSet = array => new Set(array);

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.defaultGrouping || [],
      expandedGroups: props.defaultExpandedGroups || [],
    };

    this._reduceExpandedGroups = reducer => (prevExpandedGroups, payload) => {
      const expandedGroups = reducer(prevExpandedGroups, payload);

      if (expandedGroups === prevExpandedGroups) return;

      this.setState({ expandedGroups });

      const { onExpandedGroupsChange } = this.props;
      if (onExpandedGroupsChange) {
        onExpandedGroupsChange(expandedGroups);
      }
    };

    this._toggleGroupExpanded = this._reduceExpandedGroups(nextExpandedGroups);
    this._updateExpandedGroups = this._reduceExpandedGroups(updateExpandedGroups);

    this._groupByColumn = (prevGrouping, prevExpandedGroups, { columnName, groupIndex }) => {
      const grouping = groupByColumn(prevGrouping, { columnName, groupIndex });

      this.setState({ grouping });

      const { onGroupingChange } = this.props;
      if (onGroupingChange) {
        onGroupingChange(grouping);
      }

      this._updateExpandedGroups(prevExpandedGroups, {
        prevGrouping,
        grouping,
      });
    };
  }
  render() {
    const grouping = this.props.grouping || this.state.grouping;
    const expandedGroups = this.props.expandedGroups || this.state.expandedGroups;

    return (
      <PluginContainer>
        <Action
          name="toggleGroupExpanded"
          action={({ groupKey }) => {
            this._toggleGroupExpanded(expandedGroups, { groupKey });
          }}
        />
        <Action
          name="groupByColumn"
          action={({ columnName, groupIndex }) => {
            this._groupByColumn(grouping, expandedGroups, { columnName, groupIndex });
          }}
        />

        <Getter name="grouping" value={grouping} />
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

