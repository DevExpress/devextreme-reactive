// @public (undocumented)
declare type Action = ([fieldName]?: any) => void;

// @public (undocumented)
declare type AddedAppointmentDataPayload = {
  // (undocumented)
  appointmentData: AppointmentModel | {};
};

// @public (undocumented)
declare type AllDayCell = {
  // (undocumented)
  startDate: Date | string | number;
  // (undocumented)
  endDate: Date | string | number;
};

// @public (undocumented)
declare const AllDayPanel: React.ComponentType<AllDayPanelProps>;

// @public (undocumented)
namespace AllDayPanel {
  interface AppointmentLayerProps {
    children?: React.ReactNode;
  }
  interface CellData {
    endDate: Date;
    startDate: Date;
  }
  interface CellProps {
    endDate: Date;
    startDate: Date;
  }
  interface ContainerProps {
    children: React.ReactNode;
  }
  interface LayoutProps {
    allDayPanelRef: (ref: React.ReactInstance) => void;
    cellComponent: React.ComponentType<AllDayPanel.CellProps>;
    cellsData: AllDayCell[];
    rowComponent: React.ComponentType<AllDayPanel.RowProps>;
  }
  interface LocalizationMessages {
    allDay?: string;
  }
  interface RowProps {
    children?: React.ReactNode;
  }
  interface TitleCellProps {
    getMessage: (messageKey: string) => string;
  }
}

// @public (undocumented)
interface AllDayPanelProps {
  appointmentLayerComponent: React.ComponentType<AllDayPanel.AppointmentLayerProps>;
  cellComponent: React.ComponentType<AllDayPanel.CellProps>;
  containerComponent: React.ComponentType<AllDayPanel.ContainerProps>;
  layoutComponent: React.ComponentType<AllDayPanel.LayoutProps>;
  messages?: AllDayPanel.LocalizationMessages;
  rowComponent: React.ComponentType<AllDayPanel.RowProps>;
  titleCellComponent: React.ComponentType<AllDayPanel.TitleCellProps>;
}

// @public (undocumented)
interface AllDayPanelState {
  // (undocumented)
  tableRef: HTMLElement | null;
}

// @public (undocumented)
declare type AllDayRects = PureComputed<[Appointment[], Date, Date, number[], ViewCell[][], Element[][]], ElementRect[]>;

// @public (undocumented)
interface Appointment {
  allDay?: boolean;
  dataItem: AppointmentModel;
  end: Date | string | number;
  exDate?: string;
  rRule?: string;
  start: Date | string | number;
}

// @public (undocumented)
declare type AppointmentBoundaries = {
  // (undocumented)
  appointmentStartTime?: Date;
  // (undocumented)
  appointmentEndTime?: Date;
  // (undocumented)
  offsetTimeTop?: number;
};

// @public (undocumented)
declare type AppointmentChanges = {
  // (undocumented)
  [key: string]: object;
};

// @public (undocumented)
declare type AppointmentDataPayload = {
  // (undocumented)
  appointmentData: AppointmentModel;
};

// @public (undocumented)
declare type AppointmentDate = Date | number | string;

// @public
declare const AppointmentForm: React.ComponentType<AppointmentFormProps>;

// @public (undocumented)
namespace AppointmentForm {
  interface ContainerProps {
    children: React.ReactNode;
  }
  interface LocalizationMessages {
    allDayLabel?: string;
    cancelCommand?: string;
    commitCommand?: string;
    endDateLabel?: string;
    startDateLabel?: string;
    titleLabel?: string;
  }
  interface PopupProps {
    children: React.ReactNode;
    visible?: boolean;
  }
  interface ScrollableAreaProps {
    // (undocumented)
    children: React.ReactNode;
  }
  interface StaticAreaProps {
    children: React.ReactNode;
  }
}

// @public (undocumented)
interface AppointmentFormProps {
  appointmentData?: AppointmentModel;
  containerComponent: React.ComponentType<AppointmentForm.ContainerProps>;
  messages?: AppointmentForm.LocalizationMessages;
  onAppointmentDataChange?: (appointmentData: AppointmentModel) => void;
  onVisibilityChange?: (visible: boolean) => void;
  popupComponent: React.ComponentType<AppointmentForm.PopupProps>;
  readOnly?: boolean;
  scrollableAreaComponent: React.ComponentType<AppointmentForm.ScrollableAreaProps>;
  staticAreaComponent: React.ComponentType<AppointmentForm.StaticAreaProps>;
  visible?: boolean;
}

// @public (undocumented)
declare type AppointmentGroup = {
  // (undocumented)
  items: GroupItem[];
  // (undocumented)
  reduceValue: number;
};

// @public (undocumented)
declare type AppointmentId = number | string;

// @public
interface AppointmentMeta {
  data: AppointmentModel;
  target: React.ReactInstance;
}

// @public
interface AppointmentModel {
  [propertyName: string]: any;
  allDay?: boolean;
  endDate: Date | string | number;
  id?: number | string;
  startDate: Date | string | number;
  title?: string;
}

// @public (undocumented)
interface AppointmentMoment {
  // (undocumented)
  [propertyName: string]: any;
  // (undocumented)
  allDay?: boolean;
  // (undocumented)
  end: default.Moment;
  // (undocumented)
  id?: number | string;
  // (undocumented)
  start: default.Moment;
  // (undocumented)
  title?: string;
}

// @public
declare const Appointments: React.ComponentType<AppointmentsProps>;

// @public (undocumented)
namespace Appointments {
    interface AppointmentContentProps {
        children?: React.ReactNode;
        data: AppointmentModel;
        formatDate: (date: Date, options: any) => string;
        recurringIconComponent: React.ComponentType<any>;
        type: 'vertical' | 'horizontal';
    }
    interface AppointmentProps {
        children: React.ReactNode;
        data: AppointmentModel;
        draggable: boolean;
        onClick?: (e: any) => void;
        onDoubleClick?: (e: any) => void;
    }
    interface ContainerProps {
        style: any;
    }
    interface SplitIndicatorProps {
        appointmentType: 'vertical' | 'horizontal';
        position: 'start' | 'end';
    }
}

// @public (undocumented)
interface AppointmentsProps {
    appointmentComponent: React.ComponentType<Appointments.AppointmentProps>;
    appointmentContentComponent: React.ComponentType<Appointments.AppointmentContentProps>;
    containerComponent: React.ComponentType<Appointments.ContainerProps>;
    recurringIconComponent: React.ComponentType<any>;
    splitIndicatorComponent: React.ComponentType<Appointments.SplitIndicatorProps>;
}

// @public
declare const AppointmentTooltip: React.ComponentType<AppointmentTooltipProps>;

// @public (undocumented)
namespace AppointmentTooltip {
  interface CommandButtonProps {
    id?: 'open' | 'delete' | 'close';
    onExecute?: () => void;
  }
  interface ContentProps {
    appointmentData?: AppointmentModel;
    children?: React.ReactNode;
  }
  interface HeaderProps {
    appointmentData?: AppointmentModel;
    children?: React.ReactNode;
  }
  interface LayoutProps {
    appointmentMeta?: AppointmentMeta;
    commandButtonComponent: React.ComponentType<AppointmentTooltip.CommandButtonProps>;
    commandButtonIds: Array<string>;
    contentComponent: React.ComponentType<AppointmentTooltip.ContentProps>;
    headerComponent: React.ComponentType<AppointmentTooltip.HeaderProps>;
    onDeleteButtonClick?: () => void;
    onHide?: () => void;
    onOpenButtonClick?: () => void;
    showCloseButton: boolean;
    showDeleteButton: boolean;
    showOpenButton: boolean;
    visible?: boolean;
  }
}

// @public (undocumented)
interface AppointmentTooltipProps {
  appointmentMeta?: AppointmentMeta;
  commandButtonComponent: React.ComponentType<AppointmentTooltip.CommandButtonProps>;
  contentComponent: React.ComponentType<AppointmentTooltip.ContentProps>;
  headerComponent: React.ComponentType<AppointmentTooltip.HeaderProps>;
  layoutComponent: React.ComponentType<AppointmentTooltip.LayoutProps>;
  onAppointmentMetaChange?: (appointmentMeta: AppointmentMeta) => void;
  onVisibilityChange?: (visible: boolean) => void;
  showCloseButton?: boolean;
  showDeleteButton?: boolean;
  showOpenButton?: boolean;
  visible?: boolean;
}

// @public (undocumented)
interface AppointmentUnwrappedGroup extends GroupItem {
  // (undocumented)
  fromPrev: boolean;
  // (undocumented)
  reduceValue: number;
  // (undocumented)
  toNext: boolean;
}

// @public (undocumented)
declare type CalculateAllDayDateIntervalsFn = PureComputed<[Appointment[], Date, Date, number[]], AppointmentMoment[]>;

// @public (undocumented)
declare type CalculateAppointmentTimeBoundaries = PureComputed<[AppointmentModel, ViewCell | AllDayCell, string, number, number, number], AppointmentBoundaries>;

// @public (undocumented)
declare type CalculateFirstDateOfWeekFn = PureComputed<[Date, number, number[]], Date>;

// @public (undocumented)
declare type CalculateMonthDateIntervalsFn = PureComputed<[Appointment[], Date, Date], AppointmentMoment[]>;

// @public (undocumented)
declare type CalculateRectByDateIntervalsFn = PureComputed<[any, AppointmentMoment[], (...args: any) => any, any], ElementRect[]>;

// @public (undocumented)
declare type CalculateWeekDateIntervalsFn = PureComputed<[Appointment[], Date, Date, number[]], AppointmentMoment[]>;

// @public (undocumented)
declare type CellByDate = {
  // (undocumented)
  index: AppointmentId;
  // (undocumented)
  startDate: CurrentTime;
};

// @public (undocumented)
declare type CellElement = React.ReactInstance;

// @public (undocumented)
interface CellRect extends Rect {
  // (undocumented)
  parentRect: ParentRect;
}

// @public (undocumented)
interface ChangeCurrentDatePayload {
  // (undocumented)
  amount: number;
  // (undocumented)
  direction: string;
  // (undocumented)
  nextDate: Date;
  // (undocumented)
  step: 'day' | 'week' | 'month';
}

// @public (undocumented)
declare type Changes = {
  // (undocumented)
  change: AppointmentModel | {};
};

// @public
interface ChangeSet {
  added?: {
    // (undocumented)
    [key: string]: object;
  };
  changed?: {
    // (undocumented)
    [key: string]: object;
  };
  deleted?: number | string;
}

// @public (undocumented)
declare type ClientOffset = {
  // (undocumented)
  x: number;
  // (undocumented)
  y: number;
};

// @public (undocumented)
declare type ComputedHelperFn = PureComputed<[any, string, (...args: any[]) => any, any]>;

// @public (undocumented)
interface Coordinates {
  // (undocumented)
  left: number;
  // (undocumented)
  top: number;
  // (undocumented)
  width: number;
}

// @public (undocumented)
declare type CurrentTime = Date | number | string;

// @public
declare const DateNavigator: React.ComponentType<DateNavigatorProps>;

// @public (undocumented)
namespace DateNavigator {
    interface NavigationButtonProps {
        onClick?: (e: any) => void;
        type: 'forward' | 'back';
    }
    interface OpenButtonProps {
        onVisibilityToggle: () => void;
        text?: string;
    }
    interface OverlayProps {
        children: React.ReactNode;
        onHide: () => void;
        target?: React.ReactInstance;
        visible?: boolean;
    }
    interface RootProps {
        navigationButtonComponent: React.ComponentType<DateNavigator.NavigationButtonProps>;
        navigatorText?: string;
        onNavigate: (direction: 'forward' | 'back' | undefined, nextDate: string | Date | number) => any;
        onVisibilityToggle: () => void;
        openButtonComponent: React.ComponentType<DateNavigator.OpenButtonProps>;
        rootRef: (ref: React.ReactInstance) => void;
    }
}

// @public (undocumented)
interface DateNavigatorProps {
    navigationButtonComponent: React.ComponentType<DateNavigator.NavigationButtonProps>;
    openButtonComponent: React.ComponentType<DateNavigator.OpenButtonProps>;
    overlayComponent: React.ComponentType<DateNavigator.OverlayProps>;
    rootComponent: React.ComponentType<DateNavigator.RootProps>;
}

// @public (undocumented)
declare type DateTimeFormatInstanceFn = (locale: string | string[], formatOptions: Intl.DateTimeFormatOptions) => Intl.DateTimeFormat;

// @public (undocumented)
declare type DayBoundaryPredicateFn = PureComputed<[AppointmentMoment, Date, Date, number[]], boolean>;

// @public (undocumented)
declare type DayScaleFn = PureComputed<[Date, number, number, number[]], Date[]>;

// @public
declare const DayView: React.ComponentType<VerticalViewProps>;

// @public
declare const DragDropProvider: React.ComponentType<DragDropProviderProps>;

// @public (undocumented)
namespace DragDropProvider {
    interface ContainerProps {
        children: React.ReactNode;
    }
    interface DraftAppointmentProps {
        data: AppointmentModel;
        fromPrev: boolean;
        style: React.CSSProperties;
        toNext: boolean;
        type: string;
    }
    interface ResizeProps {
        appointmentType: 'vertical' | 'horizontal';
        position: 'start' | 'end';
    }
    interface SourceAppointmentProps {
        data: AppointmentModel;
        type: string;
    }
}

// @public (undocumented)
interface DragDropProviderProps {
    allowDrag?: (appointmentData: AppointmentModel) => boolean;
    allowResize?: (appointmentData: AppointmentModel) => boolean;
    containerComponent: React.ComponentType<DragDropProvider.ContainerProps>;
    draftAppointmentComponent: React.ComponentType<DragDropProvider.DraftAppointmentProps>;
    resizeComponent: React.ComponentType<DragDropProvider.ResizeProps>;
    sourceAppointmentComponent: React.ComponentType<DragDropProvider.SourceAppointmentProps>;
}

// @public (undocumented)
declare type EditAppointmentPayload = {
  // (undocumented)
  appointmentId: AppointmentId;
};

// @public
declare const EditingState: React.ComponentType<EditingStateProps>;

// @public (undocumented)
interface EditingStateProps {
  addedAppointment?: object;
  appointmentChanges?: {
    // (undocumented)
    [key: string]: object;
  };
  defaultAddedAppointment?: object;
  defaultAppointmentChanges?: {
    // (undocumented)
    [key: string]: object;
  };
  defaultEditingAppointmentId?: number | string;
  editingAppointmentId?: number | string;
  onAddedAppointmentChange?: (addedAppointment: object) => void;
  onAppointmentChangesChange?: (appointmentChanges: {
    // (undocumented)
    [key: string]: any;
  }) => void;
  onCommitChanges: (changes: ChangeSet) => void;
  onEditingAppointmentIdChange?: (editingAppointmentId: number | string) => void;
}

// @public (undocumented)
interface ElementRect extends Rect {
  // (undocumented)
  dataItem: AppointmentModel;
  // (undocumented)
  fromPrev: boolean;
  // (undocumented)
  toNext: boolean;
  // (undocumented)
  type: string;
}

// @public (undocumented)
declare type EndDate = Date | number | string;

// @public (undocumented)
declare type FormatDateTimeGetterFn = (locale: string | string[]) => FormatterFn;

// @public (undocumented)
declare type FormatterFn = (nextDate: Date | string | number | undefined, nextOptions: Intl.DateTimeFormatOptions) => string;

// @public (undocumented)
declare type GetAllDayCellIndexByDateFn = PureComputed<[ViewCellData[][], AppointmentDate, boolean], number>;

// @public (undocumented)
declare type GetCellByDateFn = PureComputed<[ViewCellData[][], AppointmentDate, boolean], CellByDate>;

// @public (undocumented)
declare type GetCellRectHorizontalFn = PureComputed<[AppointmentDate, ViewCellData[][], CellElement[][], boolean, boolean], CellRect>;

// @public (undocumented)
declare type GetCellRectVerticalFn = PureComputed<[AppointmentDate, ViewCellData[][], number, CellElement[], boolean], VerticalCellRect>;

// @public (undocumented)
declare type GetHorizontalRectByDatesFn = PureComputed<[AppointmentDate, EndDate, HorizontalPayload], HorizontalCellRect>;

// @public (undocumented)
declare type GetMonthCellIndexByDateFn = PureComputed<[ViewCellData[][], AppointmentDate, boolean], AppointmentId>;

// @public (undocumented)
declare type GetVerticalRectByDatesFn = PureComputed<[AppointmentDate, EndDate, VerticalPayload], VerticalCellRectByDate>;

// @public (undocumented)
interface GroupItem {
  // (undocumented)
  dataItem: AppointmentModel;
  // (undocumented)
  end: default.Moment;
  // (undocumented)
  offset: number;
  // (undocumented)
  start: default.Moment;
}

// @public (undocumented)
interface HorizontalCellRect extends Rect {
  // (undocumented)
  parentWidth: number;
}

// @public (undocumented)
interface HorizontalPayload {
  // (undocumented)
  cellElements: CellElement[][];
  // (undocumented)
  multiline: boolean;
  // (undocumented)
  viewCellsData: ViewCellData[][];
}

// @public (undocumented)
declare type HorizontalRects = PureComputed<[Appointment[], Date, Date, ViewCell[][], Element[][]], ElementRect[]>;

// @public (undocumented)
namespace HorizontalView {
  interface DayScaleLayoutProps {
    cellComponent: React.ComponentType<MonthView.DayScaleCellProps>;
    cellsData: MonthView.CellData[][];
    rowComponent: React.ComponentType<MonthView.RowProps>;
  }
  // (undocumented)
  interface LayoutProps {
    dayScaleComponent: React.ComponentType<HorizontalView.DayScaleLayoutProps>;
    // (undocumented)
    layoutHeaderRef: React.RefObject<HTMLElement>;
    layoutRef: React.RefObject<HTMLElement>;
    timeTableComponent: React.ComponentType<HorizontalView.TimeTableLayoutProps>;
  }
  interface TimeTableLayoutProps {
    cellComponent: React.ComponentType<MonthView.TimeTableCellProps>;
    cellsData: MonthView.CellData[][];
    rowComponent: React.ComponentType<MonthView.RowProps>;
    tableRef: (ref: React.ReactInstance) => void;
  }
}

// @public (undocumented)
declare type Interval = [default.Moment, default.Moment];

// @public
interface MonthCellData {
  endDate: Date;
  otherMonth: boolean;
  startDate: Date;
  today: boolean;
}

// @public (undocumented)
declare type MonthCellsDataComputedFn = PureComputed<[Date, number, number, Date | number], MonthCellData[][]>;

// @public
declare const MonthView: React.ComponentType<MonthViewProps>;

// @public (undocumented)
namespace MonthView {
  interface CellData {
    endDate: Date;
    otherMonth: boolean;
    startDate: Date;
    today: boolean;
  }
  interface DayScaleCellProps {
    endDate?: Date;
    startDate: Date;
  }
  interface RowProps {
    children?: React.ReactNode;
  }
  interface TimeTableCellProps {
    endDate?: Date;
    otherMonth?: boolean;
    startDate?: Date;
    today?: boolean;
  }
}

// @public (undocumented)
interface MonthViewProps extends MonthViewPropsType {
  layoutComponent: React.ComponentType<HorizontalView.LayoutProps>;
}

// @public (undocumented)
type MonthViewPropsType = Pick<VerticalViewProps, Exclude<keyof VerticalViewProps, 'timeScaleLayoutComponent' | 'timeScaleRowComponent' | 'timeScaleCellComponent' | 'layoutComponent'>> & Pick<WeekViewProps, 'firstDayOfWeek'>;

// @public (undocumented)
interface ParentRect extends Coordinates {
  // (undocumented)
  height?: number;
}

// @public (undocumented)
interface Rect extends Coordinates {
  // (undocumented)
  height: number;
}

// @public (undocumented)
declare type RectCalculatorBaseFn = PureComputed<[AppointmentUnwrappedGroup, (...args: any) => any, object], any>;

// @public (undocumented)
declare type ReduceAppointmentByDayBoundsFn = PureComputed<[AppointmentMoment, Date, Date], AppointmentMoment>;

// @public
declare const Scheduler: React.ComponentType<SchedulerProps>;

// @public (undocumented)
namespace Scheduler {
  interface RootProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
interface SchedulerProps {
  data: AppointmentModel[];
  locale: string;
  rootComponent: React.ComponentType<Scheduler.RootProps>;
}

// @public (undocumented)
declare type SliceAppointmentByWeekFn = PureComputed<[TimeBounds, AppointmentMoment, number], AppointmentMoment[]>;

// @public (undocumented)
declare type SliceAppointmentsByBoundariesFn = PureComputed<[AppointmentMoment, Date, Date, number[]], AppointmentMoment[]>;

// @public (undocumented)
declare type StartDate = Date | number | string;

// @public (undocumented)
declare type TimeBoundariesByDrag = PureComputed<[AppointmentModel, AppointmentModel, string, number, number, number], AppointmentBoundaries>;

// @public (undocumented)
declare type TimeBoundariesByResize = PureComputed<[AppointmentModel, AppointmentModel, string, number, number], AppointmentBoundaries>;

// @public (undocumented)
declare type TimeBounds = {
  // (undocumented)
  left: default.Moment;
  // (undocumented)
  right: default.Moment;
};

// @public (undocumented)
interface TimeScale {
  // (undocumented)
  end: Date;
  // (undocumented)
  start: Date;
}

// @public (undocumented)
declare type TimeScaleFn = PureComputed<[Date, number, number, number, number, number[]], TimeScale[]>;

// @public (undocumented)
declare type TimeType = 'seconds' | 'minutes' | 'hours';

// @public
declare const Toolbar: React.ComponentType<ToolbarProps>;

// @public (undocumented)
namespace Toolbar {
  // (undocumented)
  interface FlexibleSpaceProps {
    children?: React.ReactNode;
  }
  interface RootProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
interface ToolbarProps {
  flexibleSpaceComponent: React.ComponentType<Toolbar.FlexibleSpaceProps>;
  rootComponent: React.ComponentType<Toolbar.RootProps>;
}

// @public (undocumented)
interface VerticalCellRect extends Coordinates {
  // (undocumented)
  parentRect: ParentRect;
  // (undocumented)
  topOffset: number;
}

// @public (undocumented)
interface VerticalCellRectByDate extends Coordinates {
  // (undocumented)
  height: number;
  // (undocumented)
  parentWidth: number;
}

// @public (undocumented)
declare type VerticalPayload = {
  // (undocumented)
  viewCellsData: ViewCellData[][];
  // (undocumented)
  cellDuration: number;
  // (undocumented)
  cellElements: CellElement[];
};

// @public (undocumented)
declare type VerticalRects = PureComputed<[Appointment[], Date, Date, number[], ViewCell[][], number, Element[][]], ElementRect[]>;

// @public (undocumented)
namespace VerticalView {
  interface AppointmentLayerProps {
    children?: React.ReactNode;
  }
  interface CellData {
    endDate: Date;
    startDate: Date;
    today: boolean;
  }
  interface DayScaleCellProps {
    endDate?: Date;
    startDate: Date;
    today?: boolean;
  }
  interface DayScaleEmptyCellProps {
    children?: React.ReactNode;
  }
  interface DayScaleLayoutProps {
    cellComponent: React.ComponentType<VerticalView.DayScaleCellProps>;
    cellsData: VerticalView.CellData[][];
    formatDate: (date: Date, options: any) => string;
    rowComponent: React.ComponentType<VerticalView.RowProps>;
  }
  interface LayoutProps {
    dayScaleComponent: React.ComponentType<VerticalView.DayScaleLayoutProps>;
    dayScaleEmptyCellComponent: React.ComponentType<VerticalView.DayScaleEmptyCellProps>;
    // (undocumented)
    layoutHeaderRef: React.RefObject<HTMLElement>;
    // (undocumented)
    layoutRef: React.RefObject<HTMLElement>;
    timeScaleComponent: React.ComponentType<VerticalView.TimeScaleLayoutProps>;
    timeTableComponent: React.ComponentType<VerticalView.TimeTableLayoutProps>;
  }
  interface RowProps {
    children?: React.ReactNode;
  }
  interface TimeScaleCellProps {
    endDate: Date;
    startDate: Date;
  }
  interface TimeScaleLayoutProps {
    cellComponent: React.ComponentType<VerticalView.TimeScaleCellProps>;
    cellsData: VerticalView.CellData[][];
    formatDate: (date: Date, options: any) => string;
    rowComponent: React.ComponentType<VerticalView.RowProps>;
  }
  interface TimeTableCellProps {
    children?: React.ReactNode;
    endDate?: Date;
    startDate?: Date;
  }
  interface TimeTableLayoutProps {
    cellComponent: React.ComponentType<VerticalView.TimeTableCellProps>;
    cellsData: VerticalView.CellData[][];
    formatDate: (date: Date, options: any) => string;
    rowComponent: React.ComponentType<VerticalView.RowProps>;
    tableRef: (ref: React.ReactInstance) => void;
  }
}

// @public (undocumented)
interface VerticalViewProps {
  appointmentLayerComponent: React.ComponentType<VerticalView.AppointmentLayerProps>;
  cellDuration?: number;
  dayScaleCellComponent: React.ComponentType<VerticalView.DayScaleCellProps>;
  dayScaleEmptyCellComponent: React.ComponentType<VerticalView.DayScaleEmptyCellProps>;
  dayScaleLayoutComponent: React.ComponentType<VerticalView.DayScaleLayoutProps>;
  dayScaleRowComponent: React.ComponentType<VerticalView.RowProps>;
  endDayHour?: number;
  intervalCount?: number;
  layoutComponent: React.ComponentType<VerticalView.LayoutProps>;
  name?: string;
  startDayHour?: number;
  timeScaleCellComponent: React.ComponentType<VerticalView.TimeScaleCellProps>;
  timeScaleLayoutComponent: React.ComponentType<VerticalView.TimeScaleLayoutProps>;
  timeScaleRowComponent: React.ComponentType<VerticalView.RowProps>;
  timeTableCellComponent: React.ComponentType<VerticalView.TimeTableCellProps>;
  timeTableLayoutComponent: React.ComponentType<VerticalView.TimeTableLayoutProps>;
  timeTableRowComponent: React.ComponentType<VerticalView.RowProps>;
}

// @public (undocumented)
declare type ViewBoundTextFn = PureComputed<[Date, Date, string, Date, number, FormatterFn], string>;

// @public
interface ViewCell {
  endDate?: Date;
  otherMonth?: boolean;
  startDate: Date;
  today?: boolean;
}

// @public (undocumented)
declare type ViewCellData = {
  // (undocumented)
  startDate: Date;
  // (undocumented)
  endDate: Date;
};

// @public (undocumented)
declare type ViewCellsDataFn = PureComputed<[Date, number | undefined, number | undefined, number[], number, number, number, CurrentTime], ViewCell[][]>;

// @public (undocumented)
declare type ViewPredicateFn = PureComputed<[AppointmentMoment, Date, Date, number[]?, boolean?], boolean>;

// @public
declare const ViewState: React.ComponentType<ViewStateProps>;

// @public (undocumented)
interface ViewStateProps {
  currentDate?: number | string | Date;
  currentViewName?: string;
  defaultCurrentDate?: number | string | Date;
  defaultCurrentViewName?: string;
  onCurrentDateChange?: (currentDate: Date) => void;
  onCurrentViewNameChange?: (viewName: string) => void;
}

// @public
declare const ViewSwitcher: React.ComponentType<ViewSwitcherProps>;

// @public (undocumented)
namespace ViewSwitcher {
  interface SwitcherProps {
    // (undocumented)
    availableViewNames: string[];
    currentViewName: string;
    // (undocumented)
    onChange: (payload?: any) => void;
  }
}

// @public (undocumented)
interface ViewSwitcherProps {
  // (undocumented)
  switcherComponent: React.ComponentType<ViewSwitcher.SwitcherProps>;
}

// @public
declare const WeekView: React.ComponentType<WeekViewProps>;

// @public (undocumented)
interface WeekViewProps extends VerticalViewProps {
  excludedDays?: number[];
  firstDayOfWeek?: number;
}


// (No @packageDocumentation comment for this package)
