import {
  ViewCell,
  ScrollingStrategy,
  CellElementsMeta,
  MonthView,
  BaseView,
  CommonViewProps,
} from '../index';

/* tslint:disable no-namespace max-line-length */

/** @internal */
export type BasicViewState = {
  scrollingStrategy: ScrollingStrategy;
  timeTableElementsMeta: CellElementsMeta | {};
  previousTimeTableCell: React.ComponentType<BaseView.TimeTableCellProps> | null;
  timeTableLayoutKey: number;
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
  /** A function that calculates appointments' time intervals. */
  calculateAppointmentsIntervals: any;
  /** The properties that passed into layout component */
  layoutProps?: {
    timeScaleComponent: React.ComponentType<BaseView.TimeScaleLayoutProps>,
  };
  layoutComponent: React.ComponentType<any>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent: React.ComponentType<BaseView.DayScaleLayoutProps> | React.ComponentType<MonthView.DayScaleLayoutProps>;
  /** A component that renders a timetable layout. */
  timeTableLayoutComponent: React.ComponentType<BaseView.TimeTableLayoutProps> | React.ComponentType<MonthView.TimeTableLayoutProps>;
  /** A component that renders a day scale empty cell. */
  dayScaleEmptyCellComponent?: React.ComponentType<BaseView.DayScaleEmptyCellProps>;
}
