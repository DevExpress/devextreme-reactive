import { Grouping, GroupKey, GroupOrientation } from '../index';

// tslint:disable-next-line:no-namespace
export interface GroupingStateProps {
  /** Specifies resources to group by. */
  grouping?: Array<Grouping>;
  /** Specifies whether appointments should be grouped by date. */
  groupByDate?: (viewName: string) => boolean;
  groupOrientation?: (view: string) => GroupOrientation;
  /** Specifies expanded groups. */
  expandedGroups?: Array<GroupKey>;
  /** Specifies initially expanded groups in the uncontrolled mode. */
  defaultExpandedGroups?: Array<GroupKey>;
  /** Handles expanded group changes. */
  onExpandedGroupsChange?: (expandedGroups: Array<GroupKey>) => void;
}

/** @internal */
export type GroupingStateState = {
  grouping: Grouping[];
  expandedGroups: Array<GroupKey>;
};
