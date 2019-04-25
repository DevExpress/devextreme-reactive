import { SummaryItem } from '../index';

export interface SummaryStateProps {
  /** The total summary items. */
  totalItems?: Array<SummaryItem>;
  /** The group summary items. */
  groupItems?: Array<SummaryItem>;
  /** The tree summary items. */
  treeItems?: Array<SummaryItem>;
}
