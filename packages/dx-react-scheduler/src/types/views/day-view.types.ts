export interface DayViewProps {
  /** The view name. */
  name?: string;
  /** Multiplies the default view interval. */
  intervalCount?: number;
  /** Specifies the cell duration in minutes. */
  cellDuration?: number;
  /** Specifies the start hour of the view time scale. */
  startDayHour?: number;
  /** Specifies the end hour of the view time scale. */
  endDayHour?: number;
  /** A component that renders a day view layout. */
  layoutComponent: React.ComponentType<DayView.TimeScaleLayoutProps>;
}

/** @internal */
export type DayViewState = {
  currentDate: number | string | Date;
  currentViewName: string;
};

// tslint:disable-next-line: no-namespace
export namespace DayView {
  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: DayView.CellData[][];
    cellComponent: React.ComponentType<DayView.TimeScaleCellProps>;
    rowComponent: React.ComponentType<DayView.RowProps>;
  }

  /** Describes a cell data configuration object. */
  export interface CellData {
    /** Specifies the cell start time. */
    startDate: Date;
    /** Specifies the cell end time. */
    endDate: Date;
    /** Indicates whether the cell’s date is today. */
    today: boolean;
  }

  /** Describes properties passed to a component that renders a time scale cell. */
  export interface TimeScaleCellProps {
    /** Specifies the cell end time. */
    endDate: Date;
    /** Specifies the cell start time. */
    startDate: Date;
  }

  /** Describes properties passed to a component that renders a day view row. */
  export interface RowProps {
    /** A React node used to render the row content. */
    children?: React.ReactNode;
  }
}
