import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setColumnFilter } from '@devexpress/dx-grid-core';

export class FilteringState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.defaultFilters || [],
    };

    this.setColumnFilter = (payload) => {
      this.applyReducer(state => ({
        filters: setColumnFilter(state.filters, payload),
      }));
    };
  }
  getState(temporaryState) {
    return {
      ...this.state,
      filters: this.props.filters || this.state.filters,
      ...(this.state !== temporaryState ? temporaryState : null),
    };
  }
  applyReducer(reduce, payload) {
    const stateUpdater = (prevState) => {
      const state = this.getState(prevState);
      const nextState = { ...state, ...reduce(state, payload) };

      if (stateUpdater === this.lastStateUpdater) {
        this.notifyStateChange(nextState, state);
      }

      return nextState;
    };
    this.lastStateUpdater = stateUpdater;

    this.setState(stateUpdater);
  }
  notifyStateChange(nextState, state) {
    const { filters } = nextState;
    const { onFiltersChange } = this.props;
    if (onFiltersChange && filters !== state.filters) {
      onFiltersChange(filters);
    }
  }
  render() {
    const filters = this.props.filters || this.state.filters;

    return (
      <PluginContainer
        pluginName="FilteringState"
      >
        <Getter name="filters" value={filters} />
        <Action name="setColumnFilter" action={this.setColumnFilter} />
      </PluginContainer>
    );
  }
}

FilteringState.propTypes = {
  filters: PropTypes.array,
  defaultFilters: PropTypes.array,
  onFiltersChange: PropTypes.func,
};

FilteringState.defaultProps = {
  filters: undefined,
  defaultFilters: undefined,
  onFiltersChange: undefined,
};
