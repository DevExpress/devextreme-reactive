import { VerticalViewProps } from './view.types';
import { WeekViewProps } from './week-view.types';

type MonthViewPropsType =
  Pick<
    VerticalViewProps,
    Exclude<
      keyof VerticalViewProps,
      'timeScaleLayoutComponent' | 'timeScaleRowComponent' | 'timeScaleCellComponent'
    >
  >
  &
  Pick<WeekViewProps, 'firstDayOfWeek'>;

// tslint:disable-next-line: no-empty-interface
export interface MonthViewProps extends MonthViewPropsType {
  /** A component that renders a view layout. */
  layoutComponent: React.ComponentType<HorizontalView.LayoutProps>;
}

// tslint:disable-next-line: no-namespace
export namespace HorizontalView {
  export interface LayoutProps {
    /** A component that renders a day scale layout. */
    dayScaleComponent: React.ComponentType<HorizontalView.DayScaleLayoutProps>;
    /** A component that renders a time table layout. */
    timeTableComponent: React.ComponentType<HorizontalView.TimeTableLayoutProps>;
    /** A component that renders a day scale empty cell. */
    layoutRef: React.RefObject<HTMLElement>;
    layoutHeaderRef: React.RefObject<HTMLElement>;
  }

  /** Describes properties passed to a component that renders a day scale layout. */
  export interface DayScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData:	VerticalView.CellData[][];
    /** A component that renders a day scale cell. */
    cellComponent:	React.ComponentType<HorizontalView.DayScaleCellProps>;
    /** A component that renders a day scale row. */
    rowComponent:	React.ComponentType<HorizontalView.RowProps>;
  }
}
