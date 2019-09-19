import { ViewCell } from '../index';

/* tslint:disable no-namespace max-line-length no-empty-interface */
export interface BasicViewProps {
  viewCellsDataBaseComputed: (cellDuration: any, startDayHour: any, endDayHour: any) => (payload: any) => readonly ViewCell[][];
  type: string;
  /** The view's unique identifier. */
  name?: string;
  /** The view's name used in UI plugins. */
  displayName?: string;
  /** Multiplies the default view interval. */
  intervalCount?: number;
  /** Specifies the first day of week. */
  firstDayOfWeek?: number;
  /** Specifies the days of week that should not be displayed on the view. Accepts an array of zero-bazed day indexes (0 - Sunday). */
  excludedDays?: number[];
  /** Specifies the cell's duration in minutes. */
  cellDuration?: number;
  /** Specifies the start hour of the view time scale. */
  startDayHour?: number;
  /** Specifies the end hour of the view time scale. */
  endDayHour?: number;
}
