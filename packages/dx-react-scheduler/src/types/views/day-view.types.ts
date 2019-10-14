import { CommonView, VerticalViewProps } from './index';

/* tslint:disable no-namespace no-empty-interface */
export namespace DayView {
  /** Describes a cell data configuration object. */
  export interface CellData extends CommonView.CellData {}
  /** Describes properties passed to a component that renders a day view layout. */
  export interface LayoutProps extends CommonView.LayoutProps {}
  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps extends CommonView.TimeScaleLayoutProps {}
  /** Describes properties passed to a component that renders a time scale label. */
  export interface TimeScaleLabelProps extends CommonView.TimeScaleLabelProps {}
  /** Describes properties passed to a component that renders a day scale layout. */
  export interface DayScaleLayoutProps extends CommonView.DayScaleLayoutProps {}
  /** Describes properties passed to a component that renders a day scale cell. */
  export interface DayScaleCellProps extends CommonView.DayScaleCellProps {}
  /** Describes properties passed to a component that renders a day scale empty cell. */
  export interface DayScaleEmptyCellProps extends CommonView.DayScaleEmptyCellProps {}
  /** Describes properties passed to a component that renders a time table layout. */
  export interface TimeTableLayoutProps extends CommonView.TimeTableLayoutProps {}
  /** Describes properties passed to a component that renders a time table cell. */
  export interface TimeTableCellProps extends CommonView.TimeTableCellProps {}
  /** Describes properties passed to a component that renders the appointment layer. */
  export interface AppointmentLayerProps extends CommonView.AppointmentLayerProps {}
  /** Describes properties passed to a component that renders a day view row. */
  export interface RowProps extends CommonView.RowProps {}
}

export interface DayViewProps extends VerticalViewProps {}
