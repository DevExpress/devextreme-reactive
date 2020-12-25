import {
  ScrollingStrategy, BaseView, CommonViewProps,
  FormatterFn, CellElementsMeta, GroupingPanel, Group, GroupOrientation,
} from '../index';

/* tslint:disable no-namespace no-empty-interface */
export namespace MonthView {
  /** Describes properties passed to a component that renders a month scale cell. */
  export interface DayScaleCellProps extends BaseView.DayScaleCellProps {}
  /** Describes properties passed to a component that renders a month scale empty cell. */
  export interface DayScaleEmptyCellProps extends BaseView.DayScaleEmptyCellProps {}
  /** Describes properties passed to a component that renders a timetable layout. */
  export interface TimeTableLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: MonthView.CellData[][];
    /** A component that renders a timetable cell. */
    cellComponent: React.ComponentType<MonthView.TimeTableCellProps>;
    /** A component that renders a timetable row. */
    rowComponent: React.ComponentType<MonthView.RowProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
    /** A setCellElementsMeta callback */
    setCellElementsMeta: (cellElementsMeta: CellElementsMeta) => void;
  }
  /** Describes properties passed to a component that renders a timetable cell. */
  export interface TimeTableCellProps {
    /** Specifies the cell's start time. */
    startDate: Date;
    /** Specifies the cell's end time. */
    endDate?: Date;
    /** Indicates whether the cell’s date is not in the current month. */
    otherMonth?: boolean;
    /** Indicates whether the cell’s date is today. */
    today?: boolean;
    /** A function that formats dates according to the set locale. */
    formatDate?: FormatterFn;
    /** Information about the cell's grouping. */
    groupingInfo?: Array<Group>;
    /** Scheduler's grouping orientation. */
    groupOrientation?: GroupOrientation;
    /** "true" if this cell is last in its group. */
    endOfGroup?: boolean;
    /** Indicates whether the cell is shaded. */
    isShaded?: boolean;
    /** A function that handles a double click on the cell. */
    onDoubleClick?: (e: any) => void;
  }
  /** Describes properties passed to a component that renders the appointment layer. */
  export interface AppointmentLayerProps extends BaseView.AppointmentLayerProps {}
  /** Describes properties passed to a component that renders a month view row. */
  export interface RowProps extends BaseView.RowProps {}
  /** Describes properties passed to a component that renders a month view layout. */
  export interface LayoutProps {
    /** A component that renders a month scale layout. */
    dayScaleComponent: React.ComponentType<BaseView.DayScaleLayoutProps>;
    /** A component that renders a timetable layout. */
    timeTableComponent: React.ComponentType<BaseView.TimeTableLayoutProps>;
    /** A component that renders a day scale empty cell. */
    dayScaleEmptyCellComponent?: React.ComponentType<BaseView.DayScaleEmptyCellProps>;
    /** The scrolling API callback */
    setScrollingStrategy: (scrollingStrategy: ScrollingStrategy) => void;
  }
  /** Describes a cell data configuration object. */
  export interface CellData extends BaseView.CellData {
    /** Indicates whether the cell’s date is not in the current month. */
    otherMonth: boolean;
  }
  /** Describes properties passed to a component that renders a month scale layout. */
  export interface DayScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: MonthView.CellData[][];
    /** A component that renders a month scale cell. */
    cellComponent: React.ComponentType<BaseView.DayScaleCellProps>;
    /** A component that renders a month scale row. */
    rowComponent: React.ComponentType<BaseView.RowProps>;
    /** A component that renders the grouping panel. */
    groupingPanelComponent?: React.ComponentType<GroupingPanel.HorizontalLayoutProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
  }
}

export interface MonthViewProps extends CommonViewProps {
  /** A component that renders a view layout. */
  layoutComponent: React.ComponentType<MonthView.LayoutProps>;
  /** A component that renders a month scale layout. */
  dayScaleLayoutComponent: React.ComponentType<MonthView.DayScaleLayoutProps>;
  /** A component that renders a timetable layout. */
  timeTableLayoutComponent: React.ComponentType<MonthView.TimeTableLayoutProps>;
  /** A component that renders a day scale empty cell. */
  dayScaleEmptyCellComponent?: React.ComponentType<BaseView.DayScaleEmptyCellProps>;
}
