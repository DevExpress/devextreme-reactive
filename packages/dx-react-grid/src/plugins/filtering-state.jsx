import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { changeColumnFilter, getColumnExtensionValue } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

const getColumnFilteringEnabled = (columnExtensions, defaultValue) =>
  getColumnExtensionValue(columnExtensions, 'filteringEnabled', defaultValue);

export class FilteringState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.defaultFilters,
    };
    const stateHelper = createStateHelper(this);

    this.changeColumnFilter = stateHelper.applyFieldReducer
      .bind(stateHelper, 'filters', changeColumnFilter);
  }
  getState() {
    const {
      filters = this.state.filters,
    } = this.props;
    return {
      ...this.state,
      filters,
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
    const { columnExtensions, columnFilteringEnabled } = this.props;

    return (
      <PluginContainer
        pluginName="FilteringState"
      >
        <Getter name="filters" value={filters} />
        <Getter
          name="columnFilteringEnabled"
          value={getColumnFilteringEnabled(columnExtensions, columnFilteringEnabled)}
        />
        <Action name="changeColumnFilter" action={this.changeColumnFilter} />
      </PluginContainer>
    );
  }
}

FilteringState.propTypes = {
  filters: PropTypes.array,
  defaultFilters: PropTypes.array,
  onFiltersChange: PropTypes.func,
  columnExtensions: PropTypes.array,
  columnFilteringEnabled: PropTypes.bool,
};

FilteringState.defaultProps = {
  filters: undefined,
  defaultFilters: [],
  onFiltersChange: undefined,
  columnExtensions: undefined,
  columnFilteringEnabled: true,
};
