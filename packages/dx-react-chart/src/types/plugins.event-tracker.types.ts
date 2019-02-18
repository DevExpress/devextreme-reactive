import { HandlerFn } from './index';
export interface EventTrackerProps {
  /** A function that is executed when the chart’s plot is clicked */
  onClick?: HandlerFn;
  /** A function that is executed when the pointer moves over the chart */
  onPointerMove?: HandlerFn;
}
