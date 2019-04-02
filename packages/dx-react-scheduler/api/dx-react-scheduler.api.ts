// @public (undocumented)
namespace AllDayPanel {
  interface CellData {
    endDate: Date;
    startDate: Date;
  }
}

// @public (undocumented)
namespace AllDayPanel {
  interface LayoutProps {
    allDayPanelRef: (ref: React.ReactInstance) => void;
    cellComponent: React.ComponentType<AllDayPanel.CellProps>;
    cellsData: Array<Array<AllDayPanel.CellData>>;
    rowComponent: React.ComponentType<AllDayPanel.RowProps>;
  }
}

// @public (undocumented)
namespace AllDayPanel {
  interface CellProps {
    endDate: Date;
    startDate: Date;
  }
}

// @public (undocumented)
namespace AllDayPanel {
  interface RowProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace AllDayPanel {
  interface TitleCellProps {
    getMessage: (messageKey: string) => string;
  }
}

// @public (undocumented)
namespace AllDayPanel {
  interface AppointmentLayerProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace AllDayPanel {
  interface ContainerProps {
    children: React.ReactNode;
  }
}

// @public (undocumented)
namespace AllDayPanel {
  // (undocumented)
  interface LocalizationMessages {
    allDay?: string;
  }
}

// @public
declare const AllDayPanel: React.ComponentType<AllDayPanelProps>;

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
namespace AppointmentForm {
  interface PopupProps {
    children: React.ReactNode;
    visible?: boolean;
  }
}

// @public (undocumented)
namespace AppointmentForm {
  interface ContainerProps {
    children: React.ReactNode;
  }
}

// @public (undocumented)
namespace AppointmentForm {
  interface ScrollableAreaProps {
    children: React.ReactNode;
  }
}

// @public (undocumented)
namespace AppointmentForm {
  interface StaticAreaProps {
    children: React.ReactNode;
  }
}

// @public (undocumented)
namespace AppointmentForm {
  // (undocumented)
  interface LocalizationMessages {
    allDayLabel?: string;
    cancelCommand?: string;
    commitCommand?: string;
    endDateLabel?: string;
    startDateLabel?: string;
    titleLabel?: string;
  }
}

// @public
declare const AppointmentForm: React.ComponentType<AppointmentFormProps>;

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
  title?: string;
}

// @public (undocumented)
namespace Appointments {
  interface AppointmentProps {
    children: React.ReactNode;
    data: object;
    draggable: boolean;
    onClick?: (e: object) => void;
    onDoubleClick?: (e: object) => void;
    style: object;
  }
}

// @public (undocumented)
namespace Appointments {
  interface AppointmentContentProps {
    children: React.ReactNode;
    data: object;
  }
}

// @public
declare const Appointments: React.ComponentType<AppointmentsProps>;

// @public (undocumented)
interface AppointmentsProps {
  appointmentComponent: React.ComponentType<Appointments.AppointmentProps>;
  appointmentContentComponent: React.ComponentType<Appointments.AppointmentContentProps>;
}

// @public (undocumented)
namespace AppointmentTooltip {
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
namespace AppointmentTooltip {
  interface HeaderProps {
    appointmentData?: AppointmentModel;
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace AppointmentTooltip {
  interface ContentProps {
    appointmentData?: AppointmentModel;
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace AppointmentTooltip {
  interface CommandButtonProps {
    id?: `open` | `delete` | `close`;
    onExecute?: () => void;
  }
}

// @public
declare const AppointmentTooltip: React.ComponentType<AppointmentTooltipProps>;

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
  changed?: { // (undocumented)
 [key: string]: object };
  deleted?: number | string;
}

// @public (undocumented)
namespace DateNavigator {
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
namespace DateNavigator {
  interface OverlayProps {
    children: React.ReactNode;
    onHide: () => void;
    target?: React.ReactInstance;
    visible?: boolean;
  }
}

// @public (undocumented)
namespace DateNavigator {
  interface OpenButtonProps {
    onVisibilityToggle: () => void;
    text?: string;
  }
}

// @public (undocumented)
namespace DateNavigator {
  interface NavigationButtonProps {
    onClick?: (e: object) => void;
    type: 'forward' | 'back';
  }
}

// @public
declare const DateNavigator: React.ComponentType<DateNavigatorProps>;

// @public (undocumented)
interface DateNavigatorProps {
  navigationButtonComponent: React.ComponentType<DateNavigator.NavigationButtonProps>;
  openButtonComponent: React.ComponentType<DateNavigator.OpenButtonProps>;
  overlayComponent: React.ComponentType<DateNavigator.OverlayProps>;
  rootComponent: React.ComponentType<DateNavigator.RootProps>;
}

// @public (undocumented)
namespace DayView {
  interface CellData {
    endDate: Date;
    startDate: Date;
    today: boolean;
  }
}

// @public (undocumented)
namespace DayView {
  interface LayoutProps {
    dayScaleComponent: React.ComponentType<DayView.DayScaleLayoutProps>;
    dayScaleEmptyCellComponent: React.ComponentType<DayView.DayScaleEmptyCellProps>;
    timeScaleComponent: React.ComponentType<DayView.TimeScaleLayoutProps>;
    timeTableComponent: React.ComponentType<DayView.TimeTableLayoutProps>;
  }
}

// @public (undocumented)
namespace DayView {
  interface TimeScaleLayoutProps {
    cellComponent: React.ComponentType<DayView.TimeScaleCellProps>;
    cellsData: Array<Array<DayView.CellData>>;
    rowComponent: React.ComponentType<DayView.RowProps>;
  }
}

// @public (undocumented)
namespace DayView {
  interface TimeScaleCellProps {
    endDate: Date;
    startDate?: Date;
  }
}

// @public (undocumented)
namespace DayView {
  interface DayScaleLayoutProps {
    cellComponent: React.ComponentType<DayView.DayScaleCellProps>;
    cellsData: Array<Array<DayView.CellData>>;
    rowComponent: React.ComponentType<DayView.RowProps>;
  }
}

// @public (undocumented)
namespace DayView {
  interface DayScaleCellProps {
    endDate?: Date;
    startDate: Date;
    today?: boolean;
  }
}

// @public (undocumented)
namespace DayView {
  interface DayScaleEmptyCellProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace DayView {
  interface TimeTableLayoutProps {
    cellComponent: React.ComponentType<DayView.TimeTableCellProps>;
    cellsData: Array<Array<DayView.CellData>>;
    rowComponent: React.ComponentType<DayView.RowProps>;
    tableRef: (ref: React.ReactInstance) => void;
  }
}

// @public (undocumented)
namespace DayView {
  interface TimeTableCellProps {
    children?: React.ReactNode;
    endDate?: Date;
    startDate?: Date;
  }
}

// @public (undocumented)
namespace DayView {
  interface AppointmentLayerProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace DayView {
  interface RowProps {
    children?: React.ReactNode;
  }
}

// @public
declare const DayView: React.ComponentType<DayViewProps>;

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
namespace DragDropProvider {
  interface DraftAppointmentProps {
    data: AppointmentModel;
    style: object;
    type: string;
  }
}

// @public (undocumented)
namespace DragDropProvider {
  interface SourceAppointmentProps {
    data: AppointmentModel;
    style: object;
    type: string;
  }
}

// @public (undocumented)
namespace DragDropProvider {
  interface ContainerProps {
    children: React.ReactNode;
  }
}

// @public
declare const DragDropProvider: React.ComponentType<DragDropProviderProps>;

// @public (undocumented)
interface DragDropProviderProps {
  allowDrag?: (appointmentData: AppointmentModel) => boolean;
  containerComponent: React.ComponentType<DragDropProvider.ContainerProps>;
  draftAppointmentComponent: React.ComponentType<DragDropProvider.DraftAppointmentProps>;
  sourceAppointmentComponent: React.ComponentType<DragDropProvider.SourceAppointmentProps>;
}

// @public
declare const EditingState: React.ComponentType<EditingStateProps>;

// @public (undocumented)
interface EditingStateProps {
  addedAppointment?: object;
  appointmentChanges?: { // (undocumented)
 [key: string]: object };
  defaultAddedAppointment?: object;
  defaultAppointmentChanges?: { // (undocumented)
 [key: string]: object };
  defaultEditingAppointmentId?: number | string;
  editingAppointmentId?: number | string;
  onAddedAppointmentChange?: (addedAppointment: object) => void;
  onAppointmentChangesChange?: (appointmentChanges: { // (undocumented)
 [key: string]: any }) => void;
  onCommitChanges: (changes: ChangeSet) => void;
  onEditingAppointmentIdChange?: (editingAppointmentId: number | string) => void;
}

// @public (undocumented)
namespace MonthView {
  interface CellData {
    endDate: Date;
    otherMonth: boolean;
    startDate: Date;
    today: boolean;
  }
}

// @public (undocumented)
namespace MonthView {
  interface LayoutProps {
    dayScaleComponent: React.ComponentType<MonthView.DayScaleLayoutProps>;
    timeTableComponent: React.ComponentType<MonthView.TimeTableLayoutProps>;
  }
}

// @public (undocumented)
namespace MonthView {
  interface DayScaleLayoutProps {
    cellComponent: React.ComponentType<MonthView.DayScaleCellProps>;
    cellsData: Array<Array<MonthView.CellData>>;
    rowComponent: React.ComponentType<MonthView.RowProps>;
  }
}

// @public (undocumented)
namespace MonthView {
  interface DayScaleCellProps {
    endDate?: Date;
    startDate: Date;
  }
}

// @public (undocumented)
namespace MonthView {
  interface TimeTableLayoutProps {
    cellComponent: React.ComponentType<MonthView.TimeTableCellProps>;
    cellsData: Array<Array<MonthView.CellData>>;
    rowComponent: React.ComponentType<MonthView.RowProps>;
    tableRef: (ref: React.ReactInstance) => void;
  }
}

// @public (undocumented)
namespace MonthView {
  interface TimeTableCellProps {
    endDate?: Date;
    otherMonth?: boolean;
    startDate: Date;
    today?: boolean;
  }
}

// @public (undocumented)
namespace MonthView {
  interface AppointmentLayerProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace MonthView {
  interface RowProps {
    children?: React.ReactNode;
  }
}

// @public
declare const MonthView: React.ComponentType<MonthViewProps>;

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
namespace Scheduler {
  interface RootProps {
    children?: React.ReactNode;
  }
}

// @public
declare const Scheduler: React.ComponentType<SchedulerProps>;

// @public (undocumented)
interface SchedulerProps {
  data: Array<AppointmentModel>;
  rootComponent: React.ComponentType<Scheduler.RootProps>;
}

// @public (undocumented)
namespace Toolbar {
  interface RootProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace Toolbar {
  interface FlexibleSpaceProps {
    children?: React.ReactNode;
  }
}

// @public
declare const Toolbar: React.ComponentType<ToolbarProps>;

// @public (undocumented)
interface ToolbarProps {
  flexibleSpaceComponent: React.ComponentType<Toolbar.FlexibleSpaceProps>;
  rootComponent: React.ComponentType<Toolbar.RootProps>;
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

// @public (undocumented)
namespace ViewSwitcher {
  interface SwitcherProps {
    availableViewNames: Array<string>;
    currentViewName: string;
    onChange: (nextViewName: string) => void;
  }
}

// @public
declare const ViewSwitcher: React.ComponentType<ViewSwitcherProps>;

// @public (undocumented)
interface ViewSwitcherProps {
  switcherComponent: React.ComponentType<ViewSwitcher.SwitcherProps>;
}

// @public (undocumented)
namespace WeekView {
  interface CellData {
    endDate: Date;
    startDate: Date;
    today: boolean;
  }
}

// @public (undocumented)
namespace WeekView {
  interface LayoutProps {
    dayScaleComponent: React.ComponentType<WeekView.DayScaleLayoutProps>;
    dayScaleEmptyCellComponent: React.ComponentType<WeekView.DayScaleEmptyCellProps>;
    timeScaleComponent: React.ComponentType<WeekView.TimeScaleLayoutProps>;
    timeTableComponent: React.ComponentType<WeekView.TimeTableLayoutProps>;
  }
}

// @public (undocumented)
namespace WeekView {
  interface TimeScaleLayoutProps {
    cellComponent: React.ComponentType<WeekView.TimeScaleCellProps>;
    cellsData: Array<Array<WeekView.CellData>>;
    rowComponent: React.ComponentType<WeekView.RowProps>;
  }
}

// @public (undocumented)
namespace WeekView {
  interface TimeScaleCellProps {
    endDate: Date;
    startDate?: Date;
  }
}

// @public (undocumented)
namespace WeekView {
  interface DayScaleLayoutProps {
    cellComponent: React.ComponentType<WeekView.DayScaleCellProps>;
    cellsData: Array<Array<WeekView.CellData>>;
    rowComponent: React.ComponentType<WeekView.RowProps>;
  }
}

// @public (undocumented)
namespace WeekView {
  interface DayScaleCellProps {
    endDate?: Date;
    startDate: Date;
    today?: boolean;
  }
}

// @public (undocumented)
namespace WeekView {
  interface DayScaleEmptyCellProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace WeekView {
  interface TimeTableLayoutProps {
    cellComponent: React.ComponentType<WeekView.TimeTableCellProps>;
    cellsData: Array<Array<WeekView.CellData>>;
    rowComponent: React.ComponentType<WeekView.RowProps>;
    tableRef: (ref: React.ReactInstance) => void;
  }
}

// @public (undocumented)
namespace WeekView {
  interface TimeTableCellProps {
    children?: React.ReactNode;
    endDate?: Date;
    startDate?: Date;
  }
}

// @public (undocumented)
namespace WeekView {
  interface AppointmentLayerProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
namespace WeekView {
  interface RowProps {
    children?: React.ReactNode;
  }
}

// @public
declare const WeekView: React.ComponentType<WeekViewProps>;

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


// (No @packageDocumentation comment for this package)
