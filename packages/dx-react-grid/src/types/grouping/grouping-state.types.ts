import { Grouping, GroupKey } from '../index';

// tslint:disable-next-line:no-namespace
export namespace GroupingState {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** Specifies whether grouping is enabled for a column. */
    groupingEnabled: boolean;
  }
}
export interface GroupingStateProps {
  /** Specifies columns to group by. */
  grouping?: Array<Grouping>;
  /** Specifies initial grouping options in the uncontrolled mode. */
  defaultGrouping?: Array<Grouping>;
  /** Handles grouping option changes. */
  onGroupingChange?: (grouping: Array<Grouping>) => void;
  /** Specifies expanded groups. */
  expandedGroups?: Array<GroupKey>;
  /** Specifies initially expanded groups in the uncontrolled mode. */
  defaultExpandedGroups?: Array<GroupKey>;
  /** Specifies whether grouping is enabled for all columns. */
  columnGroupingEnabled?: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<GroupingState.ColumnExtension>;
  /** Handles expanded group changes. */
  onExpandedGroupsChange?: (expandedGroups: Array<GroupKey>) => void;
}

/** @internal */
export type GroupingStateState = {
  grouping: Grouping[];
  draftGrouping: Grouping[] | null;
  expandedGroups: GroupKey[];
};
