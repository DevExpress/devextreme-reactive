// @public (undocumented)
module AllDayPanel {
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

  interface LayoutProps {
    allDayPanelRef: (ref: React.ReactInstance) => void;
    cellComponent: React.ComponentType<AllDayPanel.CellProps>;
    cellsData: Array<Array<AllDayPanel.CellData>>;
    rowComponent: React.ComponentType<AllDayPanel.RowProps>;
  }

  // (undocumented)
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
  layoutComponent: React.ComponentType<AllDayPanel.LayoutProps>;
  messages?: AllDayPanel.LocalizationMessages;
  rowComponent: React.ComponentType<AllDayPanel.RowProps>;
  titleCellComponent: React.ComponentType<AllDayPanel.TitleCellProps>;
}

// @public (undocumented)
module AppointmentForm {
  interface ContainerProps {
    children: React.ReactNode;
  }

  // (undocumented)
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
  // (undocumented)
  title?: string;
}

// @public (undocumented)
module Appointments {
  interface AppointmentContentProps {
    children: React.ReactNode;
    data: object;
  }

  interface AppointmentProps {
    children: React.ReactNode;
    data: object;
    onClick?: (e: object) => void;
    onDoubleClick?: (e: object) => void;
    style: object;
  }

}

// @public (undocumented)
interface AppointmentsProps {
  appointmentComponent: React.ComponentType<Appointments.AppointmentProps>;
  appointmentContentComponent: React.ComponentType<Appointments.AppointmentContentProps>;
}

// @public (undocumented)
module AppointmentTooltip {
  interface CommandButtonProps {
    id?: `open` | `delete` | `close`;
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
  added?: AppointmentModel;
  changed?: {
    [key: string]: object
  }
  deleted?: number | string;
}

// @public (undocumented)
module DateNavigator {
  interface NavigationButtonProps {
    onClick?: (e: object) => void;
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
    onNavigate: (direction: 'forward' | 'back') => void;
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
module DayView {
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
    cellComponent: React.ComponentType<DayView.DayScaleCellProps>;
    cellsData: Array<Array<DayView.CellData>>;
    rowComponent: React.ComponentType<DayView.RowProps>;
  }

  interface LayoutProps {
    dayScaleComponent: React.ComponentType<DayView.DayScaleLayoutProps>;
    dayScaleEmptyCellComponent: React.ComponentType<DayView.DayScaleEmptyCellProps>;
    timeScaleComponent: React.ComponentType<DayView.TimeScaleLayoutProps>;
    timeTableComponent: React.ComponentType<DayView.TimeTableLayoutProps>;
  }

  interface RowProps {
    children?: React.ReactNode;
  }

  interface TimeScaleCellProps {
    endDate: Date;
    startDate?: Date;
  }

  interface TimeScaleLayoutProps {
    cellComponent: React.ComponentType<DayView.TimeScaleCellProps>;
    cellsData: Array<Array<DayView.CellData>>;
    rowComponent: React.ComponentType<DayView.RowProps>;
  }

  interface TimeTableCellProps {
    children?: React.ReactNode;
    endDate?: Date;
    startDate?: Date;
  }

  interface TimeTableLayoutProps {
    cellComponent: React.ComponentType<DayView.TimeTableCellProps>;
    cellsData: Array<Array<DayView.CellData>>;
    rowComponent: React.ComponentType<DayView.RowProps>;
    tableRef: (ref: React.ReactInstance) => void;
  }

}

// @public (undocumented)
interface DayViewProps {
  appointmentLayerComponent: React.ComponentType<DayView.AppointmentLayerProps>;
  cellDuration?: number;
  dayScaleCellComponent: React.ComponentType<DayView.DayScaleCellProps>;
  dayScaleEmptyCellComponent: React.ComponentType<DayView.DayScaleEmptyCellProps>;
  dayScaleLayoutComponent: React.ComponentType<DayView.DayScaleLayoutProps>;
  dayScaleRowComponent: React.ComponentType<DayView.RowProps>;
  endDayHour?: number;
  intervalCount?: number;
  layoutComponent: React.ComponentType<DayView.LayoutProps>;
  name?: string;
  startDayHour?: number;
  timeScaleCellComponent: React.ComponentType<DayView.TimeScaleCellProps>;
  timeScaleLayoutComponent: React.ComponentType<DayView.TimeScaleLayoutProps>;
  timeScaleRowComponent: React.ComponentType<DayView.RowProps>;
  timeTableCellComponent: React.ComponentType<DayView.TimeTableCellProps>;
  timeTableLayoutComponent: React.ComponentType<DayView.TimeTableLayoutProps>;
  timeTableRowComponent: React.ComponentType<DayView.RowProps>;
}

// @public (undocumented)
interface EditingStateProps {
  addedAppointment?: object;
  appointmentChanges?: {
    [key: string]: object
  }
  defaultAddedAppointment?: object;
  defaultAppointmentChanges?: {
    [key: string]: object
  }
  defaultEditingAppointmentId?: number | string;
  editingAppointmentId?: number | string;
  onAddedAppointmentChange?: (addedAppointment: object) => void;
  onAppointmentChangesChange?: (appointmentChanges: { [key: string]: any }) => void;
  onCommitChanges: (changes: ChangeSet) => void;
  onEditingAppointmentIdChange?: (editingAppointmentId: number | string) => void;
}

// @public (undocumented)
module MonthView {
  interface AppointmentLayerProps {
    children?: React.ReactNode;
  }

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

  interface DayScaleLayoutProps {
    cellComponent: React.ComponentType<MonthView.DayScaleCellProps>;
    cellsData: Array<Array<MonthView.CellData>>;
    rowComponent: React.ComponentType<MonthView.RowProps>;
  }

  interface LayoutProps {
    dayScaleComponent: React.ComponentType<MonthView.DayScaleLayoutProps>;
    timeTableComponent: React.ComponentType<MonthView.TimeTableLayoutProps>;
  }

  interface RowProps {
    children?: React.ReactNode;
  }

  interface TimeTableCellProps {
    endDate?: Date;
    otherMonth?: boolean;
    startDate: Date;
    today?: boolean;
  }

  interface TimeTableLayoutProps {
    cellComponent: React.ComponentType<MonthView.TimeTableCellProps>;
    cellsData: Array<Array<MonthView.CellData>>;
    rowComponent: React.ComponentType<MonthView.RowProps>;
    tableRef: (ref: React.ReactInstance) => void;
  }

}

// @public (undocumented)
interface MonthViewProps {
  appointmentLayerComponent: React.ComponentType<MonthView.AppointmentLayerProps>;
  dayScaleCellComponent: React.ComponentType<MonthView.DayScaleCellProps>;
  dayScaleLayoutComponent: React.ComponentType<MonthView.DayScaleLayoutProps>;
  dayScaleRowComponent: React.ComponentType<MonthView.RowProps>;
  firstDayOfWeek?: number;
  intervalCount?: number;
  layoutComponent: React.ComponentType<MonthView.LayoutProps>;
  name?: string;
  timeTableCellComponent: React.ComponentType<MonthView.TimeTableCellProps>;
  timeTableLayoutComponent: React.ComponentType<MonthView.TimeTableLayoutProps>;
  timeTableRowComponent: React.ComponentType<MonthView.RowProps>;
}

// @public (undocumented)
module Scheduler {
  interface RootProps {
    children?: React.ReactNode;
  }

}

// @public (undocumented)
interface SchedulerProps {
  data: Array<AppointmentModel>;
  rootComponent: React.ComponentType<Scheduler.RootProps>;
}

// @public (undocumented)
module Toolbar {
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
interface ViewStateProps {
  currentDate?: number | string | Date;
  currentViewName?: string;
  defaultCurrentDate?: number | string | Date;
  defaultCurrentViewName?: string;
  onCurrentDateChange?: (currentDate: Date) => void;
  onCurrentViewNameChange?: (viewName: string) => void;
}

// @public (undocumented)
module ViewSwitcher {
  interface SwitcherProps {
    availableViewNames: Array<string>;
    currentViewName: string;
    onChange: (nextViewName: string) => void;
  }

}

// @public (undocumented)
interface ViewSwitcherProps {
  switcherComponent: React.ComponentType<ViewSwitcher.SwitcherProps>;
}

// @public (undocumented)
module WeekView {
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
    cellComponent: React.ComponentType<WeekView.DayScaleCellProps>;
    cellsData: Array<Array<WeekView.CellData>>;
    rowComponent: React.ComponentType<WeekView.RowProps>;
  }

  interface LayoutProps {
    dayScaleComponent: React.ComponentType<WeekView.DayScaleLayoutProps>;
    dayScaleEmptyCellComponent: React.ComponentType<WeekView.DayScaleEmptyCellProps>;
    timeScaleComponent: React.ComponentType<WeekView.TimeScaleLayoutProps>;
    timeTableComponent: React.ComponentType<WeekView.TimeTableLayoutProps>;
  }

  interface RowProps {
    children?: React.ReactNode;
  }

  interface TimeScaleCellProps {
    endDate: Date;
    startDate?: Date;
  }

  interface TimeScaleLayoutProps {
    cellComponent: React.ComponentType<WeekView.TimeScaleCellProps>;
    cellsData: Array<Array<WeekView.CellData>>;
    rowComponent: React.ComponentType<WeekView.RowProps>;
  }

  interface TimeTableCellProps {
    children?: React.ReactNode;
    endDate?: Date;
    startDate?: Date;
  }

  interface TimeTableLayoutProps {
    cellComponent: React.ComponentType<WeekView.TimeTableCellProps>;
    cellsData: Array<Array<WeekView.CellData>>;
    rowComponent: React.ComponentType<WeekView.RowProps>;
    tableRef: (ref: React.ReactInstance) => void;
  }

}

// @public (undocumented)
interface WeekViewProps {
  appointmentLayerComponent: React.ComponentType<WeekView.AppointmentLayerProps>;
  cellDuration?: number;
  dayScaleCellComponent: React.ComponentType<WeekView.DayScaleCellProps>;
  dayScaleEmptyCellComponent: React.ComponentType<WeekView.DayScaleEmptyCellProps>;
  dayScaleLayoutComponent: React.ComponentType<WeekView.DayScaleLayoutProps>;
  dayScaleRowComponent: React.ComponentType<WeekView.RowProps>;
  endDayHour?: number;
  excludedDays?: Array<number>;
  firstDayOfWeek?: number;
  intervalCount?: number;
  layoutComponent: React.ComponentType<WeekView.LayoutProps>;
  name?: string;
  startDayHour?: number;
  timeScaleCellComponent: React.ComponentType<WeekView.TimeScaleCellProps>;
  timeScaleLayoutComponent: React.ComponentType<WeekView.TimeScaleLayoutProps>;
  timeScaleRowComponent: React.ComponentType<WeekView.RowProps>;
  timeTableCellComponent: React.ComponentType<WeekView.TimeTableCellProps>;
  timeTableLayoutComponent: React.ComponentType<WeekView.TimeTableLayoutProps>;
  timeTableRowComponent: React.ComponentType<WeekView.RowProps>;
}

// WARNING: Unsupported export: EditingState
// WARNING: Unsupported export: ViewState
// (No @packagedocumentation comment for this package)
