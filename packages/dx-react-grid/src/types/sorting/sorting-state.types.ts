import { Sorting } from '../index';

// tslint:disable-next-line: no-namespace
export namespace SortingState {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** Specifies whether sorting is enabled for a column. */
    sortingEnabled: boolean;
  }
}

export interface SortingStateProps {
  /** Specifies the applied sorting. */
  sorting?: Array<Sorting>;
  /** Specifies initial sorting in the uncontrolled mode. */
  defaultSorting?: Array<Sorting>;
  /** Specifies whether sorting is enabled for all columns. */
  columnSortingEnabled?: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<SortingState.ColumnExtension>;
  /** Handles sorting changes. */
  onSortingChange?: (sorting: Array<Sorting>) => void;
}

/** @internal */
export type SortingStateState = {
  sorting: Sorting[];
};
