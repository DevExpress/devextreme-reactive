export interface TreeDataStateProps {
  /** IDs of the rows being expanded. */
  expandedRowIds?: Array<number | string>;
  /** IDs of the rows that are initially expanded in the uncontrolled mode. */
  defaultExpandedRowIds?: Array<number | string>;
  /** Handles expanded rows changes. */
  onExpandedRowIdsChange?: (expandedRowIds: Array<number | string>) => void;
}

export type TreeDataStateState = {
  expandedRowIds: Array<number | string>,
};
