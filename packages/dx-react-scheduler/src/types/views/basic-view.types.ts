import { ViewCell, VerticalViewProps, VerticalView } from '../index';

/* tslint:disable no-namespace max-line-length */
type BasicViewPropsType =
  Pick<
    VerticalViewProps,
    Exclude<
      keyof VerticalViewProps,
      'timeScaleLayoutComponent' | 'timeScaleRowComponent' | 'timeScaleCellComponent' | 'layoutComponent' | 'dayScaleEmptyCellComponent'
    >
  >;

/** @internal */
export interface BasicViewProps extends BasicViewPropsType {
  /** The function that calculate cells data */
  /** @internal */
  viewCellsDataComputed: (cellDuration: number, startDayHour: number, endDayHour: number) => (payload: any) => readonly ViewCell[][];
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
  layoutComponent: React.ComponentType<any>;
}
