import { BaseView, VerticalViewProps } from './index';

/* tslint:disable no-namespace no-empty-interface */
export namespace DayView {
  /** Describes a cell data configuration object. */
  export interface CellData extends BaseView.CellData {}
  /** Describes properties passed to a component that renders a day view layout. */
  export interface LayoutProps extends BaseView.LayoutProps {}
  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps extends BaseView.TimeScaleLayoutProps {}
  /** Describes properties passed to a component that renders a time scale label. */
  export interface TimeScaleLabelProps extends BaseView.TimeScaleLabelProps {}
  /** Describes properties passed to a component that renders a time scale tick. */
  export interface TimeScaleTickCellProps extends BaseView.TimeScaleTickCellProps {}
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
  /** Describes properties passed to a component that renders a day view row. */
  export interface RowProps extends BaseView.RowProps {}
}

export interface DayViewProps extends VerticalViewProps {}
