import * as React from 'react';

export interface RowDetailStateProps {
  /** IDs of the rows being expanded. */
  expandedRowIds: Array<number | string>;
  /** IDs of the rows initially expanded in the uncontrolled mode. */
  defaultExpandedRowIds: Array<number | string>;
  /** Handles expanded rows changes. */
  onExpandedRowIdsChange: (expandedRowIds: Array<number | string>) => void;
}

export declare const RowDetailState: React.ComponentType<RowDetailStateProps>;
