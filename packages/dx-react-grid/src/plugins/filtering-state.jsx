import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { changeColumnFilter, getColumnExtensionValueGetter } from '@devexpress/dx-grid-core';

import { createStateHelper } from '../utils/state-helper';

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'filteringEnabled', defaultValue);

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
      <Plugin
        name="FilteringState"
      >
        <Getter name="filters" value={filters} />
        <Getter
          name="isColumnFilteringEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnFilteringEnabled)}
        />
        <Action name="changeColumnFilter" action={this.changeColumnFilter} />
      </Plugin>
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
