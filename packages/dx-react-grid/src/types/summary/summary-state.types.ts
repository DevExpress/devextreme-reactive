import { GroupSummaryItem } from '@devexpress/dx-grid-core';
import { SummaryItem } from '../index';

export interface SummaryStateProps {
  /** The total summary items. */
  totalItems?: Array<SummaryItem>;
  /** The group summary items. */
  groupItems?: Array<GroupSummaryItem>;
  /** The tree summary items. */
  treeItems?: Array<SummaryItem>;
}
