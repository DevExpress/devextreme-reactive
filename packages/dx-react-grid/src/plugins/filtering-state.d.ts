import * as React from 'react';

export interface Filter {
  /** Specifies the name of a column whose value is used for filtering. */
  columnName: string;
  /** Specifies the filter value. */
  value?: string;
}

export interface FilteringStateProps {
  /** Specifies the currently applied filters. */
  filters: Array<Filter>;
  /** Specifies the filters initially applied in the uncontrolled mode. */
  defaultFilters: Array<Filter>;
  /** Handles filter changes. */
  onFiltersChange: (filters: Array<Filter>) => void;
}

export declare const FilteringState: React.ComponentType<FilteringStateProps>;
