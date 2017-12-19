import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setColumnSorting } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sorting: props.defaultSorting,
    };

    const stateHelper = createStateHelper(this);

    this.setColumnSorting = stateHelper.applyReducer
      .bind(stateHelper, setColumnSorting);
  }
  getState() {
    return {
      ...this.state,
      sorting: this.props.sorting || this.state.sorting,
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

    return (
      <PluginContainer
        pluginName="SortingState"
      >
        <Getter name="sorting" value={sorting} />
        <Action name="setColumnSorting" action={this.setColumnSorting} />
      </PluginContainer>
    );
  }
}

SortingState.propTypes = {
  sorting: PropTypes.array,
  defaultSorting: PropTypes.array,
  onSortingChange: PropTypes.func,
};

SortingState.defaultProps = {
  sorting: undefined,
  defaultSorting: [],
  onSortingChange: undefined,
};
