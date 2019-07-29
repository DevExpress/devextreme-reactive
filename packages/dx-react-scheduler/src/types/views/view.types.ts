import {
  FormatterFn, ElementRect, CellElementsMeta, ScrollingStrategy,
} from '../index';

export interface VerticalViewProps {
  /** The view's unique identifier. */
  name?: string;
  /** The view's name used in UI plugins. */
  displayName?: string;
  /** Multiplies the default view interval. */
  intervalCount?: number;
  /** Specifies the cell's duration in minutes. */
  cellDuration?: number;
  /** Specifies the start hour of the view time scale. */
  startDayHour?: number;
  /** Specifies the end hour of the view time scale. */
  endDayHour?: number;
  /** A component that renders a view layout. */
  layoutComponent: React.ComponentType<VerticalView.LayoutProps>;
  /** A component that renders a time scale layout. */
  timeScaleLayoutComponent: React.ComponentType<VerticalView.TimeScaleLayoutProps>;
  /** A component that renders a time scale row. */
  timeScaleRowComponent: React.ComponentType<VerticalView.RowProps>;
  /** A component that renders a time scale cell. */
  timeScaleCellComponent: React.ComponentType<VerticalView.TimeScaleCellProps>;
  /** A component that renders a day scale layout. */
  dayScaleLayoutComponent: React.ComponentType<VerticalView.DayScaleLayoutProps>;
  /** A component that renders a day scale cell. */
  dayScaleCellComponent: React.ComponentType<VerticalView.DayScaleCellProps>;
  /** A component that renders a day scale row.  */
  dayScaleRowComponent: React.ComponentType<VerticalView.RowProps>;
  /** A component that renders a day scale empty cell.  */
  dayScaleEmptyCellComponent: React.ComponentType<VerticalView.DayScaleEmptyCellProps>;
  /** A component that renders a time table layout. */
  timeTableLayoutComponent: React.ComponentType<VerticalView.TimeTableLayoutProps>;
  /** A component that renders a time table cell. */
  timeTableCellComponent: React.ComponentType<VerticalView.TimeTableCellProps>;
  /** A component that renders a time table row. */
  timeTableRowComponent: React.ComponentType<VerticalView.RowProps>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent: React.ComponentType<VerticalView.AppointmentLayerProps>;
}

/** @internal */
export type ViewState = {
  rects: readonly ElementRect[];
  scrollingStrategy: ScrollingStrategy;
  timeTableElementsMeta: CellElementsMeta | {};
};

// tslint:disable-next-line: no-namespace
export namespace VerticalView {
  /** Describes properties passed to a component that renders a vertical view layout. */
  export interface LayoutProps {
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

  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: VerticalView.CellData[][];
    /** A component that renders a time scale cell. */
    cellComponent: React.ComponentType<VerticalView.TimeScaleCellProps>;
    /** A component that renders a time scale row. */
    rowComponent: React.ComponentType<VerticalView.RowProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
  }

  /** Describes properties passed to a component that renders a time table layout. */
  export interface TimeTableLayoutProps {
    /** Specifies the cells meta data. */
    cellsData:	VerticalView.CellData[][];
    /** A component that renders a time table cell. */
    cellComponent: React.ComponentType<VerticalView.TimeTableCellProps>;
    /** A component that renders a time table row. */
    rowComponent: React.ComponentType<VerticalView.RowProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
    /** A setCellElementsMeta callback */
    setCellElementsMeta: (cellElementsMeta: CellElementsMeta) => void;
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
    cellsData:	VerticalView.CellData[][];
    /** A component that renders a day scale cell. */
    cellComponent:	React.ComponentType<VerticalView.DayScaleCellProps>;
    /** A component that renders a day scale row. */
    rowComponent:	React.ComponentType<VerticalView.RowProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
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
