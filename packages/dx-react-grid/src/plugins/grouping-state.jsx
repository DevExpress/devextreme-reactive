import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer, Watcher } from '@devexpress/dx-react-core';
import {
  groupByColumn,
  groupedColumns,
  nextExpandedGroups,
  expandedGroupsWithChangedGrouping,
} from '@devexpress/dx-grid-core';

const arrayToSet = array => new Set(array);

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.defaultGrouping || [],
      expandedGroups: props.defaultExpandedGroups || [],
    };

    this.prevGrouping = [];

    this._expandedGroups = () => (this.props.expandedGroups || this.state.expandedGroups);

    this.toggleGroupExpanded = (groupKey) => {
      const prevExpandedGroups = this._expandedGroups();
      const expandedGroups = nextExpandedGroups(prevExpandedGroups, groupKey);

      this._expandedGroupsChanged(expandedGroups);
    };

    this._groupByColumn = (prevGrouping, { columnName, groupIndex }) => {
      const { onGroupingChange } = this.props;
      const grouping = groupByColumn(prevGrouping, { columnName, groupIndex });

      this.setState({ grouping });
      if (onGroupingChange) {
        onGroupingChange(grouping);
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
    const expandedGroups = this._expandedGroups();

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
        <Watcher
          watch={getter => [
            getter('grouping'),
          ]}
          onChange={(action, nextGrouping) => {
            const prevGrouping = this.prevGrouping;
            const prevExpandedGroups = this._expandedGroups();

            const updatedExpandedGroups = expandedGroupsWithChangedGrouping(
              prevGrouping,
              nextGrouping,
              prevExpandedGroups,
            );

            if (updatedExpandedGroups !== prevExpandedGroups) {
              this._expandedGroupsChanged(updatedExpandedGroups);
            }

            this.prevGrouping = nextGrouping;
          }}
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

