import {
  ViewCell,
  ScrollingStrategy,
  CellElementsMeta,
  ElementRect,
  MonthView,
  BaseView,
  CommonViewProps,
} from '../index';

/* tslint:disable no-namespace max-line-length */

/** @internal */
export type BasicViewState = {
  rects: readonly ElementRect[];
  scrollingStrategy: ScrollingStrategy;
  timeTableElementsMeta: CellElementsMeta | {};
};

/** @internal */
export interface BasicViewProps extends CommonViewProps {
  /** A function that calculates cells data. */
  viewCellsDataComputed: (cellDuration: number, startDayHour: number, endDayHour: number) => (payload: any) => readonly ViewCell[][];
  /** The view's type */
  type: string;
  /** Specifies the cell’s duration in minutes. */
  cellDuration?: number;
  /** Specifies the start hour of the view time scale. */
  startDayHour?: number;
  /** Specifies the end hour of the view time scale. */
  endDayHour?: number;
  /** Specifies the days of week that should not be displayed on the view. Accepts an array of zero-based day indexes (0 - Sunday). */
  excludedDays?: number[];
  /** The function that calculate time table appointment rects */
  timeTableRects: any;
  /** The properties that passed into layout component */
  layoutProps?: {
    dayScaleEmptyCellComponent: React.ComponentType<BaseView.DayScaleEmptyCellProps>,
    timeScaleComponent: React.ComponentType<BaseView.TimeScaleLayoutProps>,
  };
  layoutComponent: React.ComponentType<any>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent: React.ComponentType<BaseView.DayScaleLayoutProps> | React.ComponentType<MonthView.DayScaleLayoutProps>;
  /** A component that renders a time table layout. */
  timeTableLayoutComponent: React.ComponentType<BaseView.TimeTableLayoutProps> | React.ComponentType<MonthView.TimeTableLayoutProps>;
}
