import {
  FormatterFn, CellElementsMeta, ScrollingStrategy,
  Group, GroupOrientation,
} from '../index';
import { CurrentTimeIndicator } from '../current-time-indicator';
import { GroupingPanel } from '../grouping';
import { AllDayPanel } from './all-day-panel.types';

// tslint:disable: no-namespace
export interface CommonViewProps {
  /** The view's unique identifier. */
  name?: string;
  /** The view's name used in UI plugins. */
  displayName?: string;
  /** Multiplies the default view interval. */
  intervalCount?: number;
  /** A component that renders a day scale cell. */
  dayScaleCellComponent: React.ComponentType<BaseView.DayScaleCellProps>;
  /** A component that renders a day scale row.  */
  dayScaleRowComponent: React.ComponentType<BaseView.RowProps>;
  /** A component that renders a timetable cell. */
  timeTableCellComponent: React.ComponentType<BaseView.TimeTableCellProps>;
  /** A component that renders a timetable row. */
  timeTableRowComponent: React.ComponentType<BaseView.RowProps>;
  /** A component that renders the appointment layer. */
  appointmentLayerComponent: React.ComponentType<BaseView.AppointmentLayerProps>;
}

export namespace BaseView {
  /** Describes properties passed to a component that renders a vertical view layout. */
  export interface LayoutProps {
    /** The scrolling API callback */
    setScrollingStrategy: (scrollingStrategy: ScrollingStrategy) => void;
    /** A component that renders a day scale layout. */
    dayScaleComponent: React.ComponentType<BaseView.DayScaleLayoutProps>;
    /** A component that renders a timetable layout. */
    timeTableComponent: React.ComponentType<BaseView.TimeTableLayoutProps>;
  }
  /** Describes properties passed to a component that renders a timetable layout. */
  export interface TimeTableLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: BaseView.CellData[][];
    /** Specifies the all-day cells meta data. */
    allDayCellsData?: AllDayPanel.CellData[][];
    /** A component that renders a timetable cell. */
    cellComponent: React.ComponentType<BaseView.TimeTableCellProps>;
    /** A component that renders a timetable row. */
    rowComponent: React.ComponentType<BaseView.RowProps>;
    /** A component that renders an All Day panel cell. */
    allDayCellComponent?: React.ComponentType<AllDayPanel.CellProps>;
    /** A component that renders an All Day panel row. */
    allDayRowComponent?: React.ComponentType<AllDayPanel.RowProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
    /** A setCellElementsMeta callback */
    setCellElementsMeta: (cellElementsMeta: CellElementsMeta) => void;
  }
  /** Describes properties passed to a component that renders a timetable cell. */
  export interface TimeTableCellProps {
    /** Specifies the cell's start time. */
    startDate?: Date;
    /** Specifies the cell's end time. */
    endDate?: Date;
    /** Information about the cell's grouping. */
    groupingInfo?: Array<Group>;
    /** Scheduler's grouping orientation: either 'Vertical' or 'Horizontal'. */
    groupOrientation?: GroupOrientation;
    /** \@deprecated Specifies whether the cell has the right border. */
    hasRightBorder?: boolean;
    /** "true" if this cell is last in its group. */
    endOfGroup?: boolean;
    /** Indicates whether the cell is shaded. */
    isShaded?: boolean;
    // tslint:disable-next-line: max-line-length
    /*** Indicates the distance from the top edge of the containing element (usually, a timetable cell).
     * The distance is measured as a percentage of the element's height.
     * */
    currentTimeIndicatorPosition?: string;
    /** A function that handles a double click on the cell. */
    onDoubleClick?: (e: any) => void;
    /** A component that renders the current time indicator. */
    currentTimeIndicatorComponent?: React.ComponentType<CurrentTimeIndicator.IndicatorProps>;
    /** A React node used to render the timetable cell content. */
    children?: React.ReactNode;
  }
  /** Describes properties passed to a component that renders a day scale empty cell. */
  export interface DayScaleEmptyCellProps {
    /** A React node used to render the row content. */
    children?: React.ReactNode;
  }
  /** Describes properties passed to a component that renders a time scale layout. */
  export interface TimeScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: BaseView.CellData[][];
    /** Groups shown in the Scheduler. */
    groups?: Group[][];
    /** Scheduler's grouping orientation. */
    groupOrientation?: GroupOrientation;
    /** Specifies TimeScale's height in pixels. */
    height?: number;
    /** If `true`, the 'All Day' title will be displayed. */
    showAllDayTitle?: boolean;
    /** A component that renders a time scale label. */
    labelComponent: React.ComponentType<BaseView.TimeScaleLabelProps>;
    /** A component that renders a time scale tick. */
    tickCellComponent: React.ComponentType<BaseView.TimeScaleTickCellProps>;
    /** @internal */
    rowComponent: React.ComponentType<BaseView.RowProps>;
    /** A component that renders a title cell. */
    allDayTitleComponent?: React.ComponentType<AllDayPanel.TitleCellProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
  }
  /** Describes properties passed to a component that renders a time scale label. */
  export interface TimeScaleLabelProps {
    /** Specifies the label's time. */
    time?: Date;
    /** Information about the cell's grouping. */
    groupingInfo?: Array<Group>;
    /** "true" if this cell is last in its group. */
    endOfGroup?: boolean;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
  }
  /** Describes properties passed to a component that renders a time scale tick. */
  export interface TimeScaleTickCellProps {
    /** Specifies the cell's start time. */
    startDate?: Date;
    /** Specifies the cell's end time. */
    endDate?: Date;
    /** Information about the cell's grouping. */
    groupingInfo?: Array<Group>;
    /** "true" if this cell is last in its group. */
    endOfGroup?: boolean;
  }
  /** Describes properties passed to a component that renders a day scale layout. */
  export interface DayScaleLayoutProps {
    /** Specifies the cells meta data. */
    cellsData: BaseView.CellData[][];
    /** Indicates whether grouping by date is enabled. */
    groupedByDate?: boolean;
    /** A component that renders a day scale cell. */
    cellComponent: React.ComponentType<BaseView.DayScaleCellProps>;
    /** A component that renders a day scale row. */
    rowComponent: React.ComponentType<BaseView.RowProps>;
    /** A component that renders the grouping panel. */
    groupingPanelComponent?: React.ComponentType<GroupingPanel.HorizontalLayoutProps>;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
  }
  /** Describes properties passed to a component that renders a day scale cell. */
  export interface DayScaleCellProps {
    /** Specifies the cell's end time. */
    startDate: Date;
    /** Specifies the cell's start time. */
    endDate?: Date;
    /** Indicates whether the cell’s date is today. */
    today?: boolean;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
    /** Information about the cell's grouping. */
    groupingInfo?: Array<Group>;
    /** \@deprecated Specifies whether the cell has the right border. */
    hasRightBorder?: boolean;
    /** "true" if this cell is last in its group. */
    endOfGroup?: boolean;
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
    /** Specifies the cell's start time. */
    startDate: Date;
    /** Specifies the cell's end time. */
    endDate: Date;
    /** Indicates whether the cell’s date is today. */
    today: boolean;
  }
}
