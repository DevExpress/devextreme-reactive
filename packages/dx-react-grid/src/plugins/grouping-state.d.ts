import * as React from 'react';

export interface Grouping {
  /** Specifies the name of the column by which the data is grouped. */
  columnName: string;
}

export type GroupKey = string;

export interface GroupingStateProps {
  /** Specifies columns to group by. */
  grouping: Array<Grouping>;
  /** Specifies initial grouping options in the uncontrolled mode. */
  defaultGrouping: Array<Grouping>;
  /** Handles grouping option changes. */
  onGroupingChange: (grouping: Array<Grouping>) => void;
  /** Specifies expanded groups. */
  expandedGroups: Array<GroupKey>;
  /** Specifies initially expanded groups in the uncontrolled mode. */
  defaultExpandedGroups: Array<GroupKey>;
  /** Handles expanded group changes. */
  onExpandedGroupsChange: (expandedGroups: Array<GroupKey>) => void;
}

export declare const GroupingState: React.ComponentType<GroupingStateProps>;
