import { BaseView, VerticalViewProps } from './index';

/* tslint:disable no-namespace max-line-length no-empty-interface */
export namespace WeekView {
  /** Describes a cell data configuration object. */
  export interface CellData extends BaseView.CellData {}
  /** Describes properties passed to a component that renders a week view layout. */
  export interface LayoutProps extends BaseView.LayoutProps {}
  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps extends BaseView.TimeScaleLayoutProps {}
  /** Describes properties passed to a component that renders a time scale label. */
  export interface TimeScaleLabelProps extends BaseView.TimeScaleLabelProps {}
  /** Describes properties passed to a component that renders a day scale layout. */
  export interface DayScaleLayoutProps extends BaseView.DayScaleLayoutProps {}
  /** Describes properties passed to a component that renders a day scale cell. */
  export interface DayScaleCellProps extends BaseView.DayScaleCellProps {}
  /** Describes properties passed to a component that renders a day scale empty cell. */
  export interface DayScaleEmptyCellProps extends BaseView.DayScaleEmptyCellProps {}
  /** Describes properties passed to a component that renders a timetable layout. */
  export interface TimeTableLayoutProps extends BaseView.TimeTableLayoutProps {}
  /** Describes properties passed to a component that renders a timetable cell. */
  export interface TimeTableCellProps extends BaseView.TimeTableCellProps {}
  /** Describes properties passed to a component that renders the appointment layer. */
  export interface AppointmentLayerProps extends BaseView.AppointmentLayerProps {}
  /** Describes properties passed to a component that renders a week view row. */
  export interface RowProps extends BaseView.RowProps {}
}

export interface WeekViewProps extends VerticalViewProps {
  /** Specifies the days of week that should not be displayed on the view. Accepts an array of zero-based day indexes (0 - Sunday). */
  excludedDays?: number[];
}
