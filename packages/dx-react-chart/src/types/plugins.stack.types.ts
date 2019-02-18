
import { StackList, OffsetFn, OrderFn } from './index';
export interface StackProps {
  /** A list of stacks */
  stacks?: StackList;
  /** A function that gets an array of series data and returns the series order */
  offset?: OffsetFn;
  /** A function that adds offsets to series data array depending on the series order */
  order?: OrderFn;
}
