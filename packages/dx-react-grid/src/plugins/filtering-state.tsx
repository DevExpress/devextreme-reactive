import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, Getters,
} from '@devexpress/dx-react-core';
import {
  changeColumnFilter,
  getColumnExtensionValueGetter,
  filterExpression,
  ChangeFilterPayload,
} from '@devexpress/dx-grid-core';
import { FilteringStateProps, FilteringStateState } from '../types';

const columnExtensionValueGetter = (columnExtensions, defaultValue) => (
  getColumnExtensionValueGetter(columnExtensions, 'filteringEnabled', defaultValue)
);
const filterExpressionComputed = (
  { filters, filterExpression: filterExpressionValue }: Getters,
) => filterExpression(filters, filterExpressionValue);

class FilteringStateBase extends React.PureComponent<FilteringStateProps, FilteringStateState> {
  static defaultProps = {
    defaultFilters: [],
    columnFilteringEnabled: true,
  };
  changeColumnFilter: (payload: ChangeFilterPayload) => void;

  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters || props.defaultFilters,
    };
    const stateHelper = createStateHelper(
      this,
      {
        filters: () => {
          const { onFiltersChange } = this.props;
          return onFiltersChange;
        },
      },
    );

    this.changeColumnFilter = stateHelper.applyFieldReducer
      .bind(stateHelper, 'filters', changeColumnFilter);
  }

  // tslint:disable-next-line:member-ordering
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      filters = prevState.filters,
    } = nextProps;

    return {
      filters,
    };
  }

  render() {
    const { filters } = this.state;
    const { columnExtensions, columnFilteringEnabled } = this.props;

    return (
      <Plugin
        name="FilteringState"
      >
        <Getter name="filters" value={filters} />
        <Getter name="filterExpression" computed={filterExpressionComputed} />
        <Getter
          name="isColumnFilteringEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnFilteringEnabled)}
        />
        <Action name="changeColumnFilter" action={this.changeColumnFilter} />
      </Plugin>
    );
  }
}

/** A plugin that manages the filtering state. */
export const FilteringState: React.ComponentType<FilteringStateProps> = FilteringStateBase;
