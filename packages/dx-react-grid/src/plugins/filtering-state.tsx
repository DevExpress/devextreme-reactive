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

/** Describes a filter. */
export interface Filter {
  /** Specifies the name of a column whose value is used for filtering. */
  columnName: string;
  /** Specifies the operation name. The value is 'contains' if the operation name is not set. */
  operation?: FilterOperation;
  /** Specifies the filter value. */
  value?: string;
}

/*** Describes a filter operation. Accepts one of the built-in operations or a custom string.
 * Built-in operations: `contains`, `notContains`, `startsWith`, `endsWith`, `equal`, `notEqual`,
 * `greaterThan`, `graterThenOrEqual`, `lessThan`, `lessThanOrEqual` */
export type FilterOperation = string;

// tslint:disable-next-line:no-namespace
export namespace FilteringState {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** Specifies whether filtering is enabled for a column. */
    filteringEnabled: boolean;
  }
}

export interface FilteringStateProps {
  /** Specifies the applied filters. */
  filters?: Filter[];
  /** Specifies the filters initially applied in the uncontrolled mode. */
  defaultFilters?: Filter[];
  /** Handles filter changes. */
  onFiltersChange?: (filters: Filter[]) => void;
  /** Specifies whether filtering is enabled for all columns. */
  columnFilteringEnabled?: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: FilteringState.ColumnExtension[];
}

interface FilteringStateState {
  filters: Filter[];
}

const columnExtensionValueGetter = (columnExtensions, defaultValue) => (
  getColumnExtensionValueGetter(columnExtensions, 'filteringEnabled', defaultValue)
);
const filterExpressionComputed = (
  { filters, filterExpression: filterExpressionValue }: Getters,
) => filterExpression(filters, filterExpressionValue);

export class FilteringState extends React.PureComponent<FilteringStateProps, FilteringStateState> {
  changeColumnFilter: (payload: ChangeFilterPayload) => void;

  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters || props.defaultFilters || [],
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
