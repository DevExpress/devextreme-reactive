import { ScrollingStrategy } from '../index';
import { VerticalViewProps, VerticalView } from './view.types';

/* tslint:disable no-namespace max-line-length no-empty-interface */
type MonthViewPropsType =
  Pick<
    VerticalViewProps,
    Exclude<
      keyof VerticalViewProps,
      'timeScaleLayoutComponent' | 'timeScaleRowComponent' | 'timeScaleCellComponent' | 'layoutComponent' | 'dayScaleEmptyCellComponent'
    >
  >;

export interface MonthViewProps extends MonthViewPropsType {
  /** A component that renders a view layout. */
  layoutComponent: React.ComponentType<MonthView.LayoutProps>;
}

export namespace MonthView {
  /** Describes properties passed to a component that renders the appointment layer. */
  export interface AppointmentLayerProps extends VerticalView.AppointmentLayerProps {}

  /** Describes a cell data configuration object. */
  export interface CellData {
    /** Specifies the cell start time. */
    startDate: Date;
    /** Specifies the cell end time. */
    endDate: Date;
    /** Indicates whether the cell’s date is not in the current month. */
    otherMonth: boolean;
    /** Indicates whether the cell’s date is today. */
    today: boolean;
  }
  /** Describes properties passed to a component that renders a time scale cell. */
  export interface TimeTableCellProps {
    /** Specifies the cell start time. */
    startDate?: Date;
    /** Specifies the cell end time. */
    endDate?: Date;
    /** Indicates whether the cell’s date is not in the current month. */
    otherMonth?: boolean;
    /** Indicates whether the cell’s date is today. */
    today?: boolean;
  }

  /** Describes properties passed to a component that renders a day scale cell. */
  export interface DayScaleCellProps {
    /** Specifies the cell start time. */
    startDate: Date;
    /** Specifies the cell end time. */
    endDate?: Date;
  }
  /** Describes properties passed to a component that renders a row. */
  export interface RowProps {
    /** A React node used to render the row content. */
    children?: React.ReactNode;
  }

  /** Describes properties passed to a component that renders a day scale layout. */
  export interface DayScaleLayoutProps {
    /** 	Specifies the cells meta data. */
    cellsData: MonthView.CellData[][];
    /** A component that renders a day scale cell. */
    cellComponent: React.ComponentType<MonthView.DayScaleCellProps>;
    /** A component that renders a day scale row. */
    rowComponent: React.ComponentType<MonthView.RowProps>;
  }

  /** Describes properties passed to a component that renders a time table layout. */
  export interface TimeTableLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: MonthView.CellData[][];
    /** A function that accepts the table’s root React element. */
    tableRef: React.RefObject<HTMLElement>;
    /** A component that renders a time table cell. */
    cellComponent: React.ComponentType<MonthView.TimeTableCellProps>;
    /** A component that renders a time table row. */
    rowComponent: React.ComponentType<MonthView.RowProps>;
  }
  export interface LayoutProps {
    /** A component that renders a day scale layout. */
    dayScaleComponent: React.ComponentType<MonthView.DayScaleLayoutProps>;
    /** A component that renders a time table layout. */
    timeTableComponent: React.ComponentType<MonthView.TimeTableLayoutProps>;
    /** The scrolling API callback */
    setScrollingStrategy: (scrollingStrategy: ScrollingStrategy) => void;
  }
}
