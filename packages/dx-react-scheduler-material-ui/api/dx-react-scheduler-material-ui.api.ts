// @public (undocumented)
namespace AllDayPanel {
  type CellData = AllDayPanel_2.CellData;
}

// @public (undocumented)
namespace AllDayPanel {
  type LayoutProps = AllDayPanel_2.LayoutProps;
}

// @public (undocumented)
namespace AllDayPanel {
  type CellProps = AllDayPanel_2.CellProps;
}

// @public (undocumented)
namespace AllDayPanel {
  type RowProps = AllDayPanel_2.RowProps;
}

// @public (undocumented)
namespace AllDayPanel {
  type TitleCellProps = AllDayPanel_2.TitleCellProps;
}

// @public (undocumented)
namespace AllDayPanel {
  type AppointmentLayerProps = AllDayPanel_2.AppointmentLayerProps;
}

// @public (undocumented)
namespace AllDayPanel {
  type ContainerProps = AllDayPanel_2.ContainerProps;
}

// @public
declare const AllDayPanel: React.ComponentType<AllDayPanelProps> & {
  Layout: React.ComponentType<React.ComponentType<AllDayPanel_2.LayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Cell: React.ComponentType<React.ComponentType<AllDayPanel_2.CellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<React.ComponentType<AllDayPanel_2.RowProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TitleCell: React.ComponentType<React.ComponentType<AllDayPanel_2.TitleCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  AppointmentLayer: React.ComponentType<React.ComponentType<AllDayPanel_2.AppointmentLayerProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Container: React.ComponentType<React.ComponentType<AllDayPanel_2.ContainerProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface AllDayPanelProps {
  appointmentLayerComponent?: React.ComponentType<AllDayPanel_2.AppointmentLayerProps>;
  cellComponent?: React.ComponentType<AllDayPanel_2.CellProps>;
  containerComponent?: React.ComponentType<AllDayPanel_2.ContainerProps>;
  layoutComponent?: React.ComponentType<AllDayPanel_2.LayoutProps>;
  messages?: AllDayPanel_2.LocalizationMessages;
  rowComponent?: React.ComponentType<AllDayPanel_2.RowProps>;
  titleCellComponent?: React.ComponentType<AllDayPanel_2.TitleCellProps>;
}

// @public (undocumented)
namespace AppointmentForm {
  type PopupProps = AppointmentForm_2.PopupProps;
}

// @public (undocumented)
namespace AppointmentForm {
  type ContainerProps = AppointmentForm_2.ContainerProps;
}

// @public (undocumented)
namespace AppointmentForm {
  type ScrollableAreaProps = AppointmentForm_2.ScrollableAreaProps;
}

// @public (undocumented)
namespace AppointmentForm {
  type StaticAreaProps = AppointmentForm_2.StaticAreaProps;
}

// @public
declare const AppointmentForm: React.ComponentType<AppointmentFormProps> & {
  Popup: React.ComponentType<AppointmentForm_2.PopupProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Container: React.ComponentType<AppointmentForm_2.ContainerProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  ScrollableArea: React.ComponentType<AppointmentForm_2.ScrollableAreaProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  StaticArea: React.ComponentType<AppointmentForm_2.StaticAreaProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface AppointmentFormProps {
  appointmentData?: AppointmentModel;
  containerComponent?: React.ComponentType<AppointmentForm_2.ContainerProps>;
  messages?: AppointmentForm_2.LocalizationMessages;
  onAppointmentDataChange?: (appointmentData: AppointmentModel) => void;
  onVisibilityChange?: (visible: boolean) => void;
  popupComponent?: React.ComponentType<AppointmentForm_2.PopupProps>;
  readOnly?: boolean;
  scrollableAreaComponent?: React.ComponentType<AppointmentForm_2.ScrollableAreaProps>;
  staticAreaComponent?: React.ComponentType<AppointmentForm_2.StaticAreaProps>;
  visible?: boolean;
}

// @public (undocumented)
namespace Appointments {
  type AppointmentProps = Appointments_2.AppointmentProps;
}

// @public (undocumented)
namespace Appointments {
  type AppointmentContentProps = Appointments_2.AppointmentContentProps;
}

// @public (undocumented)
namespace Appointments {
  type SplitIndicatorProps = Appointments_2.SplitIndicatorProps;
}

// @public (undocumented)
namespace Appointments {
  type ContainerProps = Appointments_2.ContainerProps;
}

// @public
declare const Appointments: React.ComponentType<AppointmentsProps> & {
  Appointment: React.ComponentType<Appointments_2.AppointmentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  AppointmentContent: React.ComponentType<Appointments_2.AppointmentContentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  SplitIndicator: React.ComponentType<Appointments_2.SplitIndicatorProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Container: React.ComponentType<Appointments_2.ContainerProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface AppointmentsProps {
  appointmentComponent?: React.ComponentType<Appointments_2.AppointmentProps>;
  appointmentContentComponent?: React.ComponentType<Appointments_2.AppointmentContentProps>;
  containerComponent?: React.ComponentType<Appointments_2.ContainerProps>;
  splitIndicatorComponent?: React.ComponentType<Appointments_2.SplitIndicatorProps>;
}

// @public (undocumented)
namespace AppointmentTooltip {
  type LayoutProps = AppointmentTooltip_2.LayoutProps;
}

// @public (undocumented)
namespace AppointmentTooltip {
  type HeaderProps = AppointmentTooltip_2.HeaderProps;
}

// @public (undocumented)
namespace AppointmentTooltip {
  type ContentProps = AppointmentTooltip_2.ContentProps;
}

// @public (undocumented)
namespace AppointmentTooltip {
  type CommandButtonProps = AppointmentTooltip_2.CommandButtonProps;
}

// @public
declare const AppointmentTooltip: React.ComponentType<AppointmentTooltipProps> & {
  Layout: React.ComponentType<React.ComponentType<AppointmentTooltip_2.LayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Header: React.ComponentType<React.ComponentType<AppointmentTooltip_2.HeaderProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Content: React.ComponentType<React.ComponentType<AppointmentTooltip_2.ContentProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  CommandButton: React.ComponentType<React.ComponentType<AppointmentTooltip_2.CommandButtonProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface AppointmentTooltipProps {
  appointmentMeta?: AppointmentMeta;
  commandButtonComponent?: React.ComponentType<AppointmentTooltip_2.CommandButtonProps>;
  contentComponent?: React.ComponentType<AppointmentTooltip_2.ContentProps>;
  headerComponent?: React.ComponentType<AppointmentTooltip_2.HeaderProps>;
  layoutComponent?: React.ComponentType<AppointmentTooltip_2.LayoutProps>;
  onAppointmentMetaChange?: (appointmentMeta: AppointmentMeta) => void;
  onVisibilityChange?: (visible: boolean) => void;
  showCloseButton?: boolean;
  showDeleteButton?: boolean;
  showOpenButton?: boolean;
  visible?: boolean;
}

// @public (undocumented)
namespace DateNavigator {
  type RootProps = DateNavigator_2.RootProps;
}

// @public (undocumented)
namespace DateNavigator {
  type OverlayProps = DateNavigator_2.OverlayProps;
}

// @public (undocumented)
namespace DateNavigator {
  type OpenButtonProps = DateNavigator_2.OpenButtonProps;
}

// @public (undocumented)
namespace DateNavigator {
  type NavigationButtonProps = DateNavigator_2.NavigationButtonProps;
}

// @public
declare const DateNavigator: React.ComponentType<DateNavigatorProps> & {
  Root: React.ComponentType<DateNavigator_2.RootProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Overlay: React.ComponentType<DateNavigator_2.OverlayProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  OpenButton: React.ComponentType<DateNavigator_2.OpenButtonProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  NavigationButton: React.ComponentType<DateNavigator_2.NavigationButtonProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface DateNavigatorProps {
  navigationButtonComponent?: React.ComponentType<DateNavigator_2.NavigationButtonProps>;
  openButtonComponent?: React.ComponentType<DateNavigator_2.OpenButtonProps>;
  overlayComponent?: React.ComponentType<DateNavigator_2.OverlayProps>;
  rootComponent?: React.ComponentType<DateNavigator_2.RootProps>;
}

// @public (undocumented)
namespace DayView {
  type CellData = DayView_2.CellData;
}

// @public (undocumented)
namespace DayView {
  type LayoutProps = DayView_2.LayoutProps;
}

// @public (undocumented)
namespace DayView {
  type TimeScaleLayoutProps = DayView_2.TimeScaleLayoutProps;
}

// @public (undocumented)
namespace DayView {
  type TimeScaleCellProps = DayView_2.TimeScaleCellProps;
}

// @public (undocumented)
namespace DayView {
  type DayScaleLayoutProps = DayView_2.DayScaleLayoutProps;
}

// @public (undocumented)
namespace DayView {
  type DayScaleCellProps = DayView_2.DayScaleCellProps;
}

// @public (undocumented)
namespace DayView {
  type DayScaleEmptyCellProps = DayView_2.DayScaleEmptyCellProps;
}

// @public (undocumented)
namespace DayView {
  type TimeTableLayoutProps = DayView_2.TimeTableLayoutProps;
}

// @public (undocumented)
namespace DayView {
  type TimeTableCellProps = DayView_2.TimeTableCellProps;
}

// @public (undocumented)
namespace DayView {
  type AppointmentLayerProps = DayView_2.AppointmentLayerProps;
}

// @public (undocumented)
namespace DayView {
  type RowProps = DayView_2.RowProps;
}

// @public
declare const DayView: React.ComponentType<DayViewProps> & {
  Layout: React.ComponentType<React.ComponentType<DayView_2.LayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeScaleLayout: React.ComponentType<React.ComponentType<DayView_2.TimeScaleLayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeScaleCell: React.ComponentType<React.ComponentType<DayView_2.TimeScaleCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  DayScaleLayout: React.ComponentType<React.ComponentType<DayView_2.DayScaleLayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  DayScaleCell: React.ComponentType<React.ComponentType<DayView_2.DayScaleCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  DayScaleEmptyCell: React.ComponentType<React.ComponentType<DayView_2.DayScaleEmptyCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeTableLayout: React.ComponentType<React.ComponentType<DayView_2.TimeTableLayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeTableCell: React.ComponentType<React.ComponentType<DayView_2.TimeTableCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<React.ComponentType<DayView_2.RowProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  AppointmentLayer: React.ComponentType<React.ComponentType<DayView_2.AppointmentLayerProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface DayViewProps {
  appointmentLayerComponent?: React.ComponentType<DayView_2.AppointmentLayerProps>;
  cellDuration?: number;
  dayScaleCellComponent?: React.ComponentType<DayView_2.DayScaleCellProps>;
  dayScaleEmptyCellComponent?: React.ComponentType<DayView_2.DayScaleEmptyCellProps>;
  dayScaleLayoutComponent?: React.ComponentType<DayView_2.DayScaleLayoutProps>;
  dayScaleRowComponent?: React.ComponentType<DayView_2.RowProps>;
  endDayHour?: number;
  intervalCount?: number;
  layoutComponent?: React.ComponentType<DayView_2.LayoutProps>;
  name?: string;
  startDayHour?: number;
  timeScaleCellComponent?: React.ComponentType<DayView_2.TimeScaleCellProps>;
  timeScaleLayoutComponent?: React.ComponentType<DayView_2.TimeScaleLayoutProps>;
  timeScaleRowComponent?: React.ComponentType<DayView_2.RowProps>;
  timeTableCellComponent?: React.ComponentType<DayView_2.TimeTableCellProps>;
  timeTableLayoutComponent?: React.ComponentType<DayView_2.TimeTableLayoutProps>;
  timeTableRowComponent?: React.ComponentType<DayView_2.RowProps>;
}

// @public (undocumented)
namespace DragDropProvider {
  type DraftAppointmentProps = DragDropProvider_2.DraftAppointmentProps;
}

// @public (undocumented)
namespace DragDropProvider {
  type SourceAppointmentProps = DragDropProvider_2.SourceAppointmentProps;
}

// @public (undocumented)
namespace DragDropProvider {
  type ResizeProps = DragDropProvider_2.ResizeProps;
}

// @public (undocumented)
namespace DragDropProvider {
  type ContainerProps = DragDropProvider_2.ContainerProps;
}

// @public
declare const DragDropProvider: React.ComponentType<DragDropProviderProps> & {
  DraftAppointment: React.ComponentType<DragDropProvider_2.DraftAppointmentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  SourceAppointment: React.ComponentType<DragDropProvider_2.SourceAppointmentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Resize: React.ComponentType<DragDropProvider_2.ResizeProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Container: React.ComponentType<DragDropProvider_2.ContainerProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface DragDropProviderProps {
  allowDrag?: (appointmentData: AppointmentModel) => boolean;
  allowResize?: (appointmentData: AppointmentModel) => boolean;
  containerComponent?: React.ComponentType<DragDropProvider_2.ContainerProps>;
  draftAppointmentComponent?: React.ComponentType<DragDropProvider_2.DraftAppointmentProps>;
  resizeComponent?: React.ComponentType<DragDropProvider_2.ResizeProps>;
  sourceAppointmentComponent?: React.ComponentType<DragDropProvider_2.SourceAppointmentProps>;
}

// @public (undocumented)
namespace MonthView {
  type CellData = MonthView_2.CellData;
}

// @public (undocumented)
namespace MonthView {
  type LayoutProps = MonthView_2.LayoutProps;
}

// @public (undocumented)
namespace MonthView {
  type DayScaleLayoutProps = MonthView_2.DayScaleLayoutProps;
}

// @public (undocumented)
namespace MonthView {
  type DayScaleCellProps = MonthView_2.DayScaleCellProps;
}

// @public (undocumented)
namespace MonthView {
  type TimeTableLayoutProps = MonthView_2.TimeTableLayoutProps;
}

// @public (undocumented)
namespace MonthView {
  type TimeTableCellProps = MonthView_2.TimeTableCellProps;
}

// @public (undocumented)
namespace MonthView {
  type AppointmentLayerProps = MonthView_2.AppointmentLayerProps;
}

// @public (undocumented)
namespace MonthView {
  type RowProps = MonthView_2.RowProps;
}

// @public
declare const MonthView: React.ComponentType<MonthViewProps> & {
  Layout: React.ComponentType<React.ComponentType<MonthView_2.LayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  DayScaleLayout: React.ComponentType<React.ComponentType<MonthView_2.DayScaleLayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  DayScaleCell: React.ComponentType<React.ComponentType<MonthView_2.DayScaleCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeTableLayout: React.ComponentType<React.ComponentType<MonthView_2.TimeTableLayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeTableCell: React.ComponentType<React.ComponentType<MonthView_2.TimeTableCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<React.ComponentType<MonthView_2.RowProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  AppointmentLayer: React.ComponentType<React.ComponentType<MonthView_2.AppointmentLayerProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface MonthViewProps {
  appointmentLayerComponent?: React.ComponentType<MonthView_2.AppointmentLayerProps>;
  dayScaleCellComponent?: React.ComponentType<MonthView_2.DayScaleCellProps>;
  dayScaleLayoutComponent?: React.ComponentType<MonthView_2.DayScaleLayoutProps>;
  dayScaleRowComponent?: React.ComponentType<MonthView_2.RowProps>;
  firstDayOfWeek?: number;
  intervalCount?: number;
  layoutComponent?: React.ComponentType<MonthView_2.LayoutProps>;
  name?: string;
  timeTableCellComponent?: React.ComponentType<MonthView_2.TimeTableCellProps>;
  timeTableLayoutComponent?: React.ComponentType<MonthView_2.TimeTableLayoutProps>;
  timeTableRowComponent?: React.ComponentType<MonthView_2.RowProps>;
}

// @public (undocumented)
namespace Scheduler {
  type RootProps = Scheduler_2.RootProps;
}

// @public
declare const Scheduler: React.ComponentType<SchedulerProps> & {
  Root: React.ComponentType<Scheduler_2.RootProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface SchedulerProps {
  data?: Array<AppointmentModel>;
  rootComponent?: React.ComponentType<Scheduler_2.RootProps>;
}

// @public (undocumented)
namespace Toolbar {
  type RootProps = Toolbar_2.RootProps;
}

// @public (undocumented)
namespace Toolbar {
  type FlexibleSpaceProps = Toolbar_2.FlexibleSpaceProps;
}

// @public
declare const Toolbar: React.ComponentType<ToolbarProps> & {
  Root: React.ComponentType<Toolbar_2.RootProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  FlexibleSpace: React.ComponentType<Toolbar_2.FlexibleSpaceProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface ToolbarProps {
  flexibleSpaceComponent?: React.ComponentType<Toolbar_2.FlexibleSpaceProps>;
  rootComponent?: React.ComponentType<Toolbar_2.RootProps>;
}

// @public (undocumented)
namespace ViewSwitcher {
  type SwitcherProps = ViewSwitcher_2.SwitcherProps;
}

// @public
declare const ViewSwitcher: React.ComponentType<ViewSwitcherProps> & {
  Switcher: React.ComponentType<ViewSwitcher_2.SwitcherProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface ViewSwitcherProps {
  switcherComponent?: React.ComponentType<ViewSwitcher_2.SwitcherProps>;
}

// @public (undocumented)
namespace WeekView {
  type CellData = WeekView_2.CellData;
}

// @public (undocumented)
namespace WeekView {
  type LayoutProps = WeekView_2.LayoutProps;
}

// @public (undocumented)
namespace WeekView {
  type TimeScaleLayoutProps = WeekView_2.TimeScaleLayoutProps;
}

// @public (undocumented)
namespace WeekView {
  type TimeScaleCellProps = WeekView_2.TimeScaleCellProps;
}

// @public (undocumented)
namespace WeekView {
  type DayScaleLayoutProps = WeekView_2.DayScaleLayoutProps;
}

// @public (undocumented)
namespace WeekView {
  type DayScaleCellProps = WeekView_2.DayScaleCellProps;
}

// @public (undocumented)
namespace WeekView {
  type DayScaleEmptyCellProps = WeekView_2.DayScaleEmptyCellProps;
}

// @public (undocumented)
namespace WeekView {
  type TimeTableLayoutProps = WeekView_2.TimeTableLayoutProps;
}

// @public (undocumented)
namespace WeekView {
  type TimeTableCellProps = WeekView_2.TimeTableCellProps;
}

// @public (undocumented)
namespace WeekView {
  type AppointmentLayerProps = WeekView_2.AppointmentLayerProps;
}

// @public (undocumented)
namespace WeekView {
  type RowProps = WeekView_2.RowProps;
}

// @public
declare const WeekView: React.ComponentType<WeekViewProps> & {
  Layout: React.ComponentType<React.ComponentType<WeekView_2.LayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeScaleLayout: React.ComponentType<React.ComponentType<WeekView_2.TimeScaleLayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeScaleCell: React.ComponentType<React.ComponentType<WeekView_2.TimeScaleCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  DayScaleLayout: React.ComponentType<React.ComponentType<WeekView_2.DayScaleLayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  DayScaleCell: React.ComponentType<React.ComponentType<WeekView_2.DayScaleCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  DayScaleEmptyCell: React.ComponentType<React.ComponentType<WeekView_2.DayScaleEmptyCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeTableLayout: React.ComponentType<React.ComponentType<WeekView_2.TimeTableLayoutProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TimeTableCell: React.ComponentType<React.ComponentType<WeekView_2.TimeTableCellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<React.ComponentType<WeekView_2.RowProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  AppointmentLayer: React.ComponentType<React.ComponentType<WeekView_2.AppointmentLayerProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface WeekViewProps {
  appointmentLayerComponent?: React.ComponentType<WeekView_2.AppointmentLayerProps>;
  cellDuration?: number;
  dayScaleCellComponent?: React.ComponentType<WeekView_2.DayScaleCellProps>;
  dayScaleEmptyCellComponent?: React.ComponentType<WeekView_2.DayScaleEmptyCellProps>;
  dayScaleLayoutComponent?: React.ComponentType<WeekView_2.DayScaleLayoutProps>;
  dayScaleRowComponent?: React.ComponentType<WeekView_2.RowProps>;
  endDayHour?: number;
  excludedDays?: Array<number>;
  firstDayOfWeek?: number;
  intervalCount?: number;
  layoutComponent?: React.ComponentType<WeekView_2.LayoutProps>;
  name?: string;
  startDayHour?: number;
  timeScaleCellComponent?: React.ComponentType<WeekView_2.TimeScaleCellProps>;
  timeScaleLayoutComponent?: React.ComponentType<WeekView_2.TimeScaleLayoutProps>;
  timeScaleRowComponent?: React.ComponentType<WeekView_2.RowProps>;
  timeTableCellComponent?: React.ComponentType<WeekView_2.TimeTableCellProps>;
  timeTableLayoutComponent?: React.ComponentType<WeekView_2.TimeTableLayoutProps>;
  timeTableRowComponent?: React.ComponentType<WeekView_2.RowProps>;
}


// (No @packageDocumentation comment for this package)
