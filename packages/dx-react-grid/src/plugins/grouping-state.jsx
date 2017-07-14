import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  groupByColumn,
  groupedColumns,
  nextExpandedGroups,
  ungroupedColumnIndex,
} from '@devexpress/dx-grid-core';

const arrayToSet = array => new Set(array);

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.defaultGrouping || [],
      expandedGroups: props.defaultExpandedGroups || [],
    };

    this._toggleGroupExpanded = (prevExpandedGroups, { groupKey }) => {
      const expandedGroups = nextExpandedGroups(prevExpandedGroups, groupKey);

      this._expandedGroupsChanged(expandedGroups);
    };

    this._groupByColumn = (prevGrouping, prevExpandedGroups, { columnName, groupIndex }) => {
      const { onGroupingChange } = this.props;
      const grouping = groupByColumn(prevGrouping, { columnName, groupIndex });

      this.setState({ grouping });
      if (onGroupingChange) {
        onGroupingChange(grouping);
      }

      this._updateExpandedGroups(prevGrouping, grouping, prevExpandedGroups);
    };

    this._updateExpandedGroups = (prevGrouping, nextGrouping, prevExpandedGroups) => {
      const index = ungroupedColumnIndex(prevGrouping, nextGrouping);

      if (index > -1) {
        this._expandedGroupsChanged(
          prevExpandedGroups.filter(group => group.split('|').length <= index),
        );
      }
    };

    this._expandedGroupsChanged = (groups) => {
      const { onExpandedGroupsChange } = this.props;
      this.setState({ expandedGroups: groups });

      if (onExpandedGroupsChange) {
        onExpandedGroupsChange(groups);
      }
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

