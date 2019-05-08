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
