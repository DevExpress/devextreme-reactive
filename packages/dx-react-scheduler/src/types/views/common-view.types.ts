import { FormatterFn, CellElementsMeta, ScrollingStrategy } from '../index';

// tslint:disable: no-namespace
export interface CommonViewProps {
  /** The view's unique identifier. */
  name?: string;
  /** The view's name used in UI plugins. */
  displayName?: string;
  /** Multiplies the default view interval. */
  intervalCount?: number;
  /** A component that renders a day scale cell. */
  dayScaleCellComponent: React.ComponentType<CommonView.DayScaleCellProps>;
  /** A component that renders a day scale row.  */
  dayScaleRowComponent: React.ComponentType<CommonView.RowProps>;
  /** A component that renders a time table cell. */
  timeTableCellComponent: React.ComponentType<CommonView.TimeTableCellProps>;
  /** A component that renders a time table row. */
  timeTableRowComponent: React.ComponentType<CommonView.RowProps>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent: React.ComponentType<CommonView.AppointmentLayerProps>;
}

export namespace CommonView {
  /** Describes properties passed to a component that renders a vertical view layout. */
  export interface LayoutProps {
    /** The scrolling API callback */
    setScrollingStrategy: (scrollingStrategy: ScrollingStrategy) => void;
    /** A component that renders a day scale layout. */
    dayScaleComponent: React.ComponentType<CommonView.DayScaleLayoutProps>;
    /** A component that renders a time table layout. */
    timeTableComponent: React.ComponentType<CommonView.TimeTableLayoutProps>;
  }
  /** Describes properties passed to a component that renders a time table layout. */
  export interface TimeTableLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: CommonView.CellData[][];
    /** A component that renders a time table cell. */
    cellComponent: React.ComponentType<CommonView.TimeTableCellProps>;
    /** A component that renders a time table row. */
    rowComponent: React.ComponentType<CommonView.RowProps>;
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
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
  }
  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: CommonView.CellData[][];
    /** A component that renders a time scale cell. */
    cellComponent: React.ComponentType<CommonView.TimeScaleCellProps>;
    /** A component that renders a time scale row. */
    rowComponent: React.ComponentType<CommonView.RowProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
  }
  /** Describes properties passed to a component that renders a day scale layout. */
  export interface DayScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: CommonView.CellData[][];
    /** A component that renders a day scale cell. */
    cellComponent: React.ComponentType<CommonView.DayScaleCellProps>;
    /** A component that renders a day scale row. */
    rowComponent: React.ComponentType<CommonView.RowProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
  }
  /** Describes properties passed to a component that renders a day scale cell. */
  export interface DayScaleCellProps {
    /** Specifies the cell end time. */
    startDate: Date;
    /** Specifies the cell start time. */
    endDate?: Date;
    /** Indicates whether the cell’s date is today. */
    today?: boolean;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
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
