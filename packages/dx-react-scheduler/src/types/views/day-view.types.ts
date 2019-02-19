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
  layoutComponent: React.ComponentType<DayView.LayoutProps>;
  /** A component that renders a time scale layout. */
  timeScaleLayoutComponent: React.ComponentType<DayView.TimeScaleLayoutProps>;
  /** A component that renders a time scale row. */
  timeScaleRowComponent: React.ComponentType<DayView.RowProps>;
  /** A component that renders a time scale cell. */
  timeScaleCellComponent: React.ComponentType<DayView.TimeScaleCellProps>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent: React.ComponentType<DayView.DayScaleLayoutProps>;
  /** A component that renders a day scale cell. */
  dayScaleCellComponent: React.ComponentType<DayView.DayScaleCellProps>;
  /** A component that renders a day scale row.  */
  dayScaleRowComponent: React.ComponentType<DayView.RowProps>;
  /** A component that renders a day scale empty cell.  */
  dayScaleEmptyCellComponent: React.ComponentType<DayView.DayScaleEmptyCellProps>;
  /** A component that renders a time table layout. */
  timeTableLayoutComponent: React.ComponentType<DayView.TimeTableLayoutProps>;
  /** A component that renders a time table cell. */
  timeTableCellComponent: React.ComponentType<DayView.TimeTableCellProps>;
  /** A component that renders a time table row. */
  timeTableRowComponent: React.ComponentType<DayView.RowProps>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent: React.ComponentType<DayView.AppointmentLayerProps>;
}

/** @internal */
export type DayViewState = {
  currentDate: number | string | Date;
  currentViewName: string;
};

// tslint:disable-next-line: no-namespace
export namespace DayView {
  /** Describes properties passed to a component that renders a day view layout. */
  export interface LayoutProps {
    /** A component that renders a time scale layout. */
    timeScaleComponent: React.ComponentType<DayView.TimeScaleLayoutProps>;
    /** A component that renders a day scale layout. */
    dayScaleComponent: React.ComponentType<DayView.DayScaleLayoutProps>;
    /** A component that renders a time table layout. */
    timeTableComponent: React.ComponentType<DayView.TimeTableLayoutProps>;
    /** A component that renders a day scale empty cell. */
    dayScaleEmptyCellComponent: React.ComponentType<DayView.DayScaleEmptyCellProps>;
  }
  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: DayView.CellData[][];
    /** A component that renders a time scale cell. */
    cellComponent: React.ComponentType<DayView.TimeScaleCellProps>;
    /** A component that renders a time scale row. */
    rowComponent: React.ComponentType<DayView.RowProps>;
  }

  /** Describes properties passed to a component that renders a time table layout. */
  export interface TimeTableLayoutProps {
    /** Specifies the cells meta data. */
    cellsData:	DayView.CellData[][];
    /** A function that accepts the table root React element. */
    tableRef: (ref: React.ReactInstance) => void;
    /** A component that renders a time table cell. */
    cellComponent: React.ComponentType<DayView.TimeTableCellProps>;
    /** A component that renders a time table row. */
    rowComponent: React.ComponentType<DayView.RowProps>;
  }

  /** Describes properties passed to a component that renders a time table cell. */
  export interface TimeTableCellProps {
    /** Specifies the cell a start time. */
    startDate?: Date;
    /** Specifies the cell end time. */
    endDate?: Date;
    /** A React node used to render the time table cell content. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a day scale empty cell. */
  export interface DayScaleEmptyCellProps {
    /** A React node used to render the row content. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a time scale cell. */
  export interface TimeScaleCellProps {
    /** Specifies the cell end time. */
    endDate: Date;
    /** Specifies the cell start time. */
    startDate: Date;
  }

  /** Describes properties passed to a component that renders a day scale layout. */
  export interface DayScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData:	DayView.CellData[][];
    /** A component that renders a day scale cell. */
    cellComponent:	React.ComponentType<DayView.DayScaleCellProps>;
    /** A component that renders a day scale row. */
    rowComponent:	React.ComponentType<DayView.RowProps>;
  }
  /** Describes properties passed to a component that renders a day scale cell. */
  export interface DayScaleCellProps {
    /** Specifies the cell end time. */
    startDate:	Date;
    /** Specifies the cell start time. */
    endDate?: Date;
    /** Indicates whether the cell’s date is today. */
    today?: boolean;
  }

  /** Describes properties passed to a component that renders the appointment layer. */
  export interface AppointmentLayerProps {
    /** A React node used to render the appointment layer content. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a day view row. */
  export interface RowProps {
    /** A React node used to render the row content. */
    children?: React.ReactNode;
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
}
