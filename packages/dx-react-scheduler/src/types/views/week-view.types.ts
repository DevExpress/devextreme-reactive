import { VerticalViewProps, VerticalView } from './view.types';

/* tslint:disable no-namespace max-line-length no-empty-interface */
/***
 * A plugin that renders the Scheduler’s week view.
 * This plugin arranges appointments from top to bottom.
 * If their time intervals overlap, their width is decreased and they are placed next to each other.
 * */
export namespace WeekView {
  export interface CellData extends VerticalView.CellData {}
  export interface LayoutProps extends VerticalView.LayoutProps {}
  export interface TimeScaleLayoutProps extends VerticalView.TimeScaleLayoutProps {}
  export interface TimeScaleCellProps extends VerticalView.TimeScaleCellProps {}
  export interface DayScaleLayoutProps extends VerticalView.DayScaleLayoutProps {}
  export interface DayScaleCellProps extends VerticalView.DayScaleCellProps {}
  export interface DayScaleEmptyCellProps extends VerticalView.DayScaleEmptyCellProps {}
  export interface TimeTableLayoutProps extends VerticalView.TimeTableLayoutProps {}
  export interface TimeTableCellProps extends VerticalView.TimeTableCellProps {}
  export interface AppointmentLayerProps extends VerticalView.AppointmentLayerProps {}
  export interface RowProps extends VerticalView.RowProps {}
}

export interface WeekViewProps extends VerticalViewProps {
  // tslint:disable-next-line: max-line-length
  /** Specifies the days of week that should not be displayed on the view. Accepts an array of zero-bazed day indexes (0 - Sunday). */
  excludedDays?: number[];
  /** Specifies the first day of week. */
  firstDayOfWeek?: number;
}
