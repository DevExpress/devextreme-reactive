import { Filter } from '../index';

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

/** @internal */
export type FilteringStateState = {
  filters: Filter[];
};
