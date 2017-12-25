import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setColumnFilter } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class FilteringState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.defaultFilters || [],
    };
    const stateHelper = createStateHelper(this);

    this.setColumnFilter = stateHelper.applyFieldReducer
      .bind(stateHelper, 'filters', setColumnFilter);
  }
  getState() {
    return {
      ...this.state,
      filters: this.props.filters || this.state.filters,
    };
  }
  notifyStateChange(nextState, state) {
    const { filters } = nextState;
    const { onFiltersChange } = this.props;
    if (onFiltersChange && filters !== state.filters) {
      onFiltersChange(filters);
    }
  }
  render() {
    const { filters } = this.getState();

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
