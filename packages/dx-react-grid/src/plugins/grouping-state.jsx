import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer, Watcher } from '@devexpress/dx-react-core';
import { groupByColumn, groupedColumns, nextExpandedGroups } from '@devexpress/dx-grid-core';

const arrayToSet = array => new Set(array);

const findRemovedColumnIndex = (initialColumns, updatedColumns) => {
  for (let i = 0; i < initialColumns.length; i += 1) {
    const index = updatedColumns
      .findIndex(column => column.columnName === initialColumns[i].columnName);

    if (index === -1) {
      return i;
    }
  }

  return null;
};

export class GroupingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grouping: props.defaultGrouping || [],
      expandedGroups: props.defaultExpandedGroups || [],
    };

    this.prevGrouping = [];

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
  }
  render() {
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
            const { onExpandedGroupsChange } = this.props;

            if (prevGrouping.length >= nextGrouping.length) {
              const index = findRemovedColumnIndex(prevGrouping, nextGrouping);
              let processedExpandedGroups = this.state.expandedGroups.map(
                group => group
                  .split('|')
                  .slice(0, index)
                  .join('|'),
                );

              processedExpandedGroups = arrayToSet(processedExpandedGroups);
              processedExpandedGroups.delete('');

              this.setState({
                expandedGroups: Array.from(processedExpandedGroups),
              });
              if (onExpandedGroupsChange) {
                onExpandedGroupsChange(Array.from(processedExpandedGroups));
              }
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

