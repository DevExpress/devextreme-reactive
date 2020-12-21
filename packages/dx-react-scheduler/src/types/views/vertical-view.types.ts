import { CommonViewProps, BaseView } from '../index';

// tslint:disable: no-namespace no-empty-interface
export interface VerticalViewProps extends CommonViewProps {
  /** Specifies the cell’s duration in minutes. */
  cellDuration?: number;
  /** Specifies the start hour of the view time scale. */
  startDayHour?: number;
  /** Specifies the end hour of the view time scale. */
  endDayHour?: number;
  /** A component that renders a view layout. */
  layoutComponent: React.ComponentType<VerticalView.LayoutProps>;
  /** A component that renders a time scale layout. */
  timeScaleLayoutComponent: React.ComponentType<BaseView.TimeScaleLayoutProps>;
  /** A component that renders a time scale label. */
  timeScaleLabelComponent: React.ComponentType<BaseView.TimeScaleLabelProps>;
  /** @internal */
  timeScaleTickCellComponent: React.ComponentType<BaseView.TimeScaleTickCellProps>;
  /** @internal */
  timeScaleTicksRowComponent: React.ComponentType<BaseView.RowProps>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent: React.ComponentType<BaseView.DayScaleLayoutProps>;
  /** A component that renders a day scale empty cell. */
  dayScaleEmptyCellComponent: React.ComponentType<BaseView.DayScaleEmptyCellProps>;
  /** A component that renders a timetable layout. */
  timeTableLayoutComponent: React.ComponentType<BaseView.TimeTableLayoutProps>;
}

export namespace VerticalView {
  /** Describes properties passed to a component that renders a vertical view layout. */
  export interface LayoutProps extends BaseView.LayoutProps {
    /** A component that renders a time scale layout. */
    timeScaleComponent: React.ComponentType<BaseView.TimeScaleLayoutProps>;
    /** A component that renders a day scale empty cell. */
    dayScaleEmptyCellComponent: React.ComponentType<BaseView.DayScaleEmptyCellProps>;
  }
}
