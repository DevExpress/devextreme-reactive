import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setColumnSorting } from '@devexpress/dx-grid-core';

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sorting: props.defaultSorting,
    };

    this.setColumnSorting = this.applyReducer.bind(this, setColumnSorting);
  }
  getState() {
    return {
      sorting: this.props.sorting || this.state.sorting,
    };
  }
  applyReducer(reduce, payload) {
    const state = this.getState();
    const nextState = reduce(state, payload);
    this.setState(nextState);

    const { onSortingChange } = this.props;
    if (onSortingChange && nextState.sorting !== state.sorting) {
      onSortingChange(nextState.sorting);
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
