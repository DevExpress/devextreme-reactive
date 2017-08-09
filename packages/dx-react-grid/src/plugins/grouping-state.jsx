import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  groupByColumn,
  toggleExpandedGroups,
  draftGrouping,
  draftGroupingChange,
  cancelGroupingChange,
  removeOutdatedExpandedGroups,
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

    this._grouping = () => this.props.grouping || this.state.grouping;
    this._expandedGroups = () => this.props.expandedGroups || this.state.expandedGroups;

    this._reduceExpandedGroups = reducer => (prevExpandedGroups, payload) => {
      const expandedGroups = reducer(prevExpandedGroups, payload);

      if (expandedGroups === prevExpandedGroups) return;

      this.setState({ expandedGroups });

      const { onExpandedGroupsChange } = this.props;
      if (onExpandedGroupsChange) {
        onExpandedGroupsChange(expandedGroups);
      }
    };

    this._toggleGroupExpanded = this._reduceExpandedGroups(toggleExpandedGroups);
    this._removeOutdatedExpandedGroups = this._reduceExpandedGroups(removeOutdatedExpandedGroups);

    this._groupByColumn = (prevGrouping, prevExpandedGroups, { columnName, groupIndex }) => {
      const grouping = groupByColumn(prevGrouping, { columnName, groupIndex });

      this.setState({ grouping });

      const { onGroupingChange } = this.props;
      if (onGroupingChange) {
        onGroupingChange(grouping);
      }

      if (this._expandedGroups() !== prevExpandedGroups) return;

      this._removeOutdatedExpandedGroups(prevExpandedGroups, {
        prevGrouping,
        grouping,
      });
    };

    this.draftGroupingChange = (groupingChange) => {
      this.setState({
        groupingChange: draftGroupingChange(this.state.groupingChange, groupingChange),
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
    const grouping = this._grouping();
    const expandedGroups = this._expandedGroups();

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
        <Action
          name="draftGroupingChange"
          action={(change) => { this.draftGroupingChange(change); }}
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
          name="draftGrouping"
          pureComputed={draftGrouping}
          connectArgs={() => [
            grouping,
            groupingChange,
          ]}
        />
        <Getter
          name="expandedGroups"
          pureComputed={arrayToSet}
          connectArgs={() => [expandedGroups]}
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
