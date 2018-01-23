import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { changeColumnSorting, getColumnExtension } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sorting: props.defaultSorting,
    };

    const stateHelper = createStateHelper(this);

    this.changeColumnSorting = stateHelper.applyReducer
      .bind(stateHelper, changeColumnSorting);

    this.columnSortingEnabled = this.columnSortingEnabled.bind(this);
  }
  getState() {
    const {
      sorting = this.state.sorting,
    } = this.props;
    return {
      ...this.state,
      sorting,
    };
  }
  notifyStateChange(nextState, state) {
    const { sorting } = nextState;
    const { onSortingChange } = this.props;
    if (onSortingChange && sorting !== state.sorting) {
      onSortingChange(sorting);
    }
  }
  columnSortingEnabled(columnName) {
    const { columnExtensions, sortable } = this.props;

    if (columnExtensions) {
      const columnExtension = getColumnExtension(columnExtensions, columnName);
      return columnExtension.sortable !== undefined
        ? columnExtension.sortable
        : sortable;
    }
    return sortable;
  }
  render() {
    const { sorting } = this.getState();

    return (
      <PluginContainer
        pluginName="SortingState"
      >
        <Getter name="sorting" value={sorting} />
        <Getter
          name="columnSortingEnabled"
          value={this.columnSortingEnabled}
        />
        <Action name="changeColumnSorting" action={this.changeColumnSorting} />
      </PluginContainer>
    );
  }
}

SortingState.propTypes = {
  sorting: PropTypes.array,
  defaultSorting: PropTypes.array,
  onSortingChange: PropTypes.func,
  columnExtensions: PropTypes.array,
  sortable: PropTypes.bool,
};

SortingState.defaultProps = {
  sorting: undefined,
  defaultSorting: [],
  onSortingChange: undefined,
  columnExtensions: undefined,
  sortable: true,
};
