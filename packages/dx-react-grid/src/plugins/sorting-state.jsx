import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { changeColumnSorting, getColumnExtensionValue } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

const getColumnSortingEnabled = (columnExtensions, defaultValue) =>
  getColumnExtensionValue(columnExtensions, 'sortingEnabled', defaultValue);

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sorting: props.defaultSorting,
    };

    const stateHelper = createStateHelper(this);

    this.changeColumnSorting = stateHelper.applyReducer
      .bind(stateHelper, changeColumnSorting);
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
  render() {
    const { sorting } = this.getState();
    const { columnExtensions, columnSortingEnabled } = this.props;

    return (
      <PluginContainer
        pluginName="SortingState"
      >
        <Getter name="sorting" value={sorting} />
        <Getter
          name="columnSortingEnabled"
          value={getColumnSortingEnabled(columnExtensions, columnSortingEnabled)}
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
  columnSortingEnabled: PropTypes.bool,
};

SortingState.defaultProps = {
  sorting: undefined,
  defaultSorting: [],
  onSortingChange: undefined,
  columnExtensions: undefined,
  columnSortingEnabled: true,
};
