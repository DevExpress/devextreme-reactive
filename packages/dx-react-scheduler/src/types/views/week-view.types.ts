import { VerticalViewProps, VerticalView } from './view.types';

/* tslint:disable no-namespace max-line-length no-empty-interface */
export namespace WeekView {
  /** Describes a cell data configuration object. */
  export interface CellData extends VerticalView.CellData {}
  /** Describes properties passed to a component that renders a week view layout. */
  export interface LayoutProps extends VerticalView.LayoutProps {}
  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps extends VerticalView.TimeScaleLayoutProps {}
  /** Describes properties passed to a component that renders a time scale cell. */
  export interface TimeScaleCellProps extends VerticalView.TimeScaleCellProps {}
  /** Describes properties passed to a component that renders a day scale layout. */
  export interface DayScaleLayoutProps extends VerticalView.DayScaleLayoutProps {}
  /** Describes properties passed to a component that renders a day scale cell. */
  export interface DayScaleCellProps extends VerticalView.DayScaleCellProps {}
  /** Describes properties passed to a component that renders a day scale empty cell. */
  export interface DayScaleEmptyCellProps extends VerticalView.DayScaleEmptyCellProps {}
  /** Describes properties passed to a component that renders a time table layout. */
  export interface TimeTableLayoutProps extends VerticalView.TimeTableLayoutProps {}
  /** Describes properties passed to a component that renders a time table cell. */
  export interface TimeTableCellProps extends VerticalView.TimeTableCellProps {}
  /** Describes properties passed to a component that renders the appointment layer. */
  export interface AppointmentLayerProps extends VerticalView.AppointmentLayerProps {}
  /** Describes properties passed to a component that renders a week view row. */
  export interface RowProps extends VerticalView.RowProps {}
}

export interface WeekViewProps extends VerticalViewProps {
  /** Specifies the days of week that should not be displayed on the view. Accepts an array of zero-bazed day indexes (0 - Sunday). */
  excludedDays?: number[];
}
