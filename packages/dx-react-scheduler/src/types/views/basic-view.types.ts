import { ViewCell } from '../index';

/* tslint:disable no-namespace max-line-length no-empty-interface */
/** @internal */
export interface BasicViewProps {
  /** The function that calculate cells data */
  /** @internal */
  viewCellsDataComputed: (cellDuration: any, startDayHour: any, endDayHour: any) => (payload: any) => readonly ViewCell[][];
  /** The view's type */
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
  /** The function that calculate time table appointment rects */
  timeTableRects: any;
  /** The properties that passed into layout component */
  layoutProps?: {
    dayScaleEmptyCellComponent: React.ComponentType<any>,
    timeScaleComponent: React.ComponentType<any>,
  };
  /** A component that renders a view layout. */
  layoutComponent: React.ComponentType<any>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent: React.ComponentType<any>;
  /** A component that renders a day scale cell. */
  dayScaleCellComponent: React.ComponentType<any>;
  /** A component that renders a day scale row.  */
  dayScaleRowComponent: React.ComponentType<any>;
  /** A component that renders a time table layout. */
  timeTableLayoutComponent: React.ComponentType<any>;
  /** A component that renders a time table cell. */
  timeTableCellComponent: React.ComponentType<any>;
  /** A component that renders a time table row. */
  timeTableRowComponent: React.ComponentType<any>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent: React.ComponentType<any>;
}
