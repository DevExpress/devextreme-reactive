import { CommonViewProps, CommonView } from '../index';

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
  timeScaleLayoutComponent: React.ComponentType<CommonView.TimeScaleLayoutProps>;
  /** A component that renders a time scale label. */
  timeScaleLabelComponent: React.ComponentType<CommonView.TimeScaleLabelProps>;
  /** A component that renders a time scale row. */
  timeScaleRowComponent: React.ComponentType<CommonView.RowProps>;
  /** @internal */
  timeScaleTickCellComponent: React.ComponentType<CommonView.TimeScaleTickCellProps>;
  /** @internal */
  timeScaleTicksRowComponent: React.ComponentType<CommonView.RowProps>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent: React.ComponentType<CommonView.DayScaleLayoutProps>;
  /** A component that renders a day scale empty cell. */
  dayScaleEmptyCellComponent: React.ComponentType<CommonView.DayScaleEmptyCellProps>;
  /** A component that renders a time table layout. */
  timeTableLayoutComponent: React.ComponentType<CommonView.TimeTableLayoutProps>;
}

export namespace VerticalView {
  /** Describes properties passed to a component that renders a vertical view layout. */
  export interface LayoutProps extends CommonView.LayoutProps {
    /** A component that renders a time scale layout. */
    timeScaleComponent: React.ComponentType<CommonView.TimeScaleLayoutProps>;
    /** A component that renders a day scale empty cell. */
    dayScaleEmptyCellComponent: React.ComponentType<CommonView.DayScaleEmptyCellProps>;
  }
}
