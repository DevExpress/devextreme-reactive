import { SummaryItem } from '@devexpress/dx-grid-core';

export interface SummaryStateProps {
  /** The total summary items. */
  totalItems?: Array<SummaryItem>;
  /** The group summary items. */
  groupItems?: Array<SummaryItem>;
  /** The tree summary items. */
  treeItems?: Array<SummaryItem>;
}
