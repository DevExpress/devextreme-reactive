import { ViewCell, VerticalViewProps, VerticalView, ScrollingStrategy, MonthView } from '../index';

/* tslint:disable no-namespace max-line-length */
type BasicViewPropsType =
  Pick<
    VerticalViewProps,
    Exclude<
      keyof VerticalViewProps,
      'timeScaleLayoutComponent' | 'timeScaleRowComponent' | 'timeScaleCellComponent' | 'layoutComponent' | 'dayScaleEmptyCellComponent'
    >
  >;

interface LayoutBaseProps {
  /** The scrolling API callback */
  setScrollingStrategy: (scrollingStrategy: ScrollingStrategy) => void;
  /** A component that renders a day scale layout. */
  dayScaleComponent: React.ComponentType<VerticalView.DayScaleLayoutProps> | React.ComponentType<MonthView.DayScaleLayoutProps>;
  /** A component that renders a time table layout. */
  timeTableComponent: React.ComponentType<VerticalView.TimeTableLayoutProps> | React.ComponentType<MonthView.TimeTableLayoutProps>;
  /** A component that renders a time scale layout. */
  timeScaleComponent?: React.ComponentType<VerticalView.TimeScaleLayoutProps>;
  /** A component that renders a day scale empty cell. */
  dayScaleEmptyCellComponent?: React.ComponentType<VerticalView.DayScaleEmptyCellProps>;
}

/** @internal */
export interface BasicViewProps extends BasicViewPropsType {
  /** The function that calculate cells data */
  /** @internal */
  viewCellsDataComputed: (cellDuration: any, startDayHour: any, endDayHour: any) => (payload: any) => readonly ViewCell[][];
  /** The view's type */
  type: string;
  /** Specifies the days of week that should not be displayed on the view. Accepts an array of zero-based day indexes (0 - Sunday). */
  excludedDays?: number[];
  /** The function that calculate time table appointment rects */
  timeTableRects: any;
  /** The properties that passed into layout component */
  layoutProps?: {
    dayScaleEmptyCellComponent: React.ComponentType<VerticalView.DayScaleEmptyCellProps>,
    timeScaleComponent: React.ComponentType<VerticalView.TimeScaleLayoutProps>,
  };
  layoutComponent: React.ComponentType<BasicView.LayoutProps>; // | React.ComponentType<MonthView.LayoutProps>;
}

/** @internal */
export namespace BasicView {
  /** @internal */
  export interface LayoutProps {
    /** The scrolling API callback */
    setScrollingStrategy: (scrollingStrategy: ScrollingStrategy) => void;
    /** A component that renders a day scale layout. */
    dayScaleComponent: React.ComponentType<VerticalView.DayScaleLayoutProps> | React.ComponentType<MonthView.DayScaleLayoutProps>;
    /** A component that renders a time table layout. */
    timeTableComponent: React.ComponentType<VerticalView.TimeTableLayoutProps> | React.ComponentType<MonthView.TimeTableLayoutProps>;
    /** A component that renders a time scale layout. */
    timeScaleComponent?: React.ComponentType<VerticalView.TimeScaleLayoutProps>;
    /** A component that renders a day scale empty cell. */
    dayScaleEmptyCellComponent?: React.ComponentType<VerticalView.DayScaleEmptyCellProps>;
  }

  export interface LayoutProps2 {
    /** The scrolling API callback */
    setScrollingStrategy: (scrollingStrategy: ScrollingStrategy) => void;
    /** A component that renders a time scale layout. */
    timeScaleComponent: React.ComponentType<VerticalView.TimeScaleLayoutProps>;
    /** A component that renders a day scale layout. */
    dayScaleComponent: React.ComponentType<VerticalView.DayScaleLayoutProps>;
    /** A component that renders a time table layout. */
    timeTableComponent: React.ComponentType<VerticalView.TimeTableLayoutProps>;
    /** A component that renders a day scale empty cell. */
    dayScaleEmptyCellComponent: React.ComponentType<VerticalView.DayScaleEmptyCellProps>;
  }
}
