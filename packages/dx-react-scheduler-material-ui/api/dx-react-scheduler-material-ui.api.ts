// WARNING: Unsupported export: CellData
// WARNING: Unsupported export: LayoutProps
// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: RowProps
// WARNING: Unsupported export: TitleCellProps
// WARNING: Unsupported export: AppointmentLayerProps
// WARNING: Unsupported export: ContainerProps
// @public (undocumented)
module AllDayPanel {
}

// @public (undocumented)
interface AllDayPanelProps {
  appointmentLayerComponent?: React.ComponentType<AllDayPanelBase.AppointmentLayerProps>;
  cellComponent?: React.ComponentType<AllDayPanelBase.CellProps>;
  containerComponent?: React.ComponentType<AllDayPanelBase.ContainerProps>;
  layoutComponent?: React.ComponentType<AllDayPanelBase.LayoutProps>;
  messages?: AllDayPanelBase.LocalizationMessages;
  rowComponent?: React.ComponentType<AllDayPanelBase.RowProps>;
  titleCellComponent?: React.ComponentType<AllDayPanelBase.TitleCellProps>;
}

// WARNING: Unsupported export: PopupProps
// WARNING: Unsupported export: ContainerProps
// WARNING: Unsupported export: ScrollableAreaProps
// WARNING: Unsupported export: StaticAreaProps
// @public (undocumented)
module AppointmentForm {
}

// @public (undocumented)
interface AppointmentFormProps {
  appointmentData?: AppointmentModel;
  containerComponent?: React.ComponentType<AppointmentFormBase.ContainerProps>;
  messages?: AppointmentFormBase.LocalizationMessages;
  onAppointmentDataChange?: (appointmentData: AppointmentModel) => void;
  onVisibilityChange?: (visible: boolean) => void;
  popupComponent?: React.ComponentType<AppointmentFormBase.PopupProps>;
  readOnly?: boolean;
  scrollableAreaComponent?: React.ComponentType<AppointmentFormBase.ScrollableAreaProps>;
  staticAreaComponent?: React.ComponentType<AppointmentFormBase.StaticAreaProps>;
  visible?: boolean;
}

// WARNING: Unsupported export: AppointmentProps
// WARNING: Unsupported export: AppointmentContentProps
// @public (undocumented)
module Appointments {
}

// @public (undocumented)
interface AppointmentsProps {
  appointmentComponent?: React.ComponentType<AppointmentsBase.AppointmentProps>;
  appointmentContentComponent?: React.ComponentType<AppointmentsBase.AppointmentContentProps>;
}

// WARNING: Unsupported export: LayoutProps
// WARNING: Unsupported export: HeaderProps
// WARNING: Unsupported export: ContentProps
// WARNING: Unsupported export: CommandButtonProps
// @public (undocumented)
module AppointmentTooltip {
}

// @public (undocumented)
interface AppointmentTooltipProps {
  appointmentMeta?: AppointmentMeta;
  commandButtonComponent?: React.ComponentType<AppointmentTooltipBase.CommandButtonProps>;
  contentComponent?: React.ComponentType<AppointmentTooltipBase.ContentProps>;
  headerComponent?: React.ComponentType<AppointmentTooltipBase.HeaderProps>;
  layoutComponent?: React.ComponentType<AppointmentTooltipBase.LayoutProps>;
  onAppointmentMetaChange?: (appointmentMeta: AppointmentMeta) => void;
  onVisibilityChange?: (visible: boolean) => void;
  showCloseButton?: boolean;
  showDeleteButton?: boolean;
  showOpenButton?: boolean;
  visible?: boolean;
}

// WARNING: Unsupported export: RootProps
// WARNING: Unsupported export: OverlayProps
// WARNING: Unsupported export: OpenButtonProps
// WARNING: Unsupported export: NavigationButtonProps
// @public (undocumented)
module DateNavigator {
}

// @public (undocumented)
interface DateNavigatorProps {
  navigationButtonComponent?: React.ComponentType<DateNavigatorBase.NavigationButtonProps>;
  openButtonComponent?: React.ComponentType<DateNavigatorBase.OpenButtonProps>;
  overlayComponent?: React.ComponentType<DateNavigatorBase.OverlayProps>;
  rootComponent?: React.ComponentType<DateNavigatorBase.RootProps>;
}

// WARNING: Unsupported export: CellData
// WARNING: Unsupported export: LayoutProps
// WARNING: Unsupported export: TimeScaleLayoutProps
// WARNING: Unsupported export: TimeScaleCellProps
// WARNING: Unsupported export: DayScaleLayoutProps
// WARNING: Unsupported export: DayScaleCellProps
// WARNING: Unsupported export: DayScaleEmptyCellProps
// WARNING: Unsupported export: TimeTableLayoutProps
// WARNING: Unsupported export: TimeTableCellProps
// WARNING: Unsupported export: AppointmentLayerProps
// WARNING: Unsupported export: RowProps
// @public (undocumented)
module DayView {
}

// @public (undocumented)
interface DayViewProps {
  appointmentLayerComponent?: React.ComponentType<DayViewBase.AppointmentLayerProps>;
  cellDuration?: number;
  dayScaleCellComponent?: React.ComponentType<DayViewBase.DayScaleCellProps>;
  dayScaleEmptyCellComponent?: React.ComponentType<DayViewBase.DayScaleEmptyCellProps>;
  dayScaleLayoutComponent?: React.ComponentType<DayViewBase.DayScaleLayoutProps>;
  dayScaleRowComponent?: React.ComponentType<DayViewBase.RowProps>;
  endDayHour?: number;
  intervalCount?: number;
  layoutComponent?: React.ComponentType<DayViewBase.LayoutProps>;
  name?: string;
  startDayHour?: number;
  timeScaleCellComponent?: React.ComponentType<DayViewBase.TimeScaleCellProps>;
  timeScaleLayoutComponent?: React.ComponentType<DayViewBase.TimeScaleLayoutProps>;
  timeScaleRowComponent?: React.ComponentType<DayViewBase.RowProps>;
  timeTableCellComponent?: React.ComponentType<DayViewBase.TimeTableCellProps>;
  timeTableLayoutComponent?: React.ComponentType<DayViewBase.TimeTableLayoutProps>;
  timeTableRowComponent?: React.ComponentType<DayViewBase.RowProps>;
}

// WARNING: Unsupported export: DraftAppointmentProps
// WARNING: Unsupported export: SourceAppointmentProps
// WARNING: Unsupported export: ContainerProps
// @public (undocumented)
module DragDropProvider {
}

// @public (undocumented)
interface DragDropProviderProps {
  allowDrag?: (appointmentData: AppointmentModel) => boolean;
  containerComponent?: React.ComponentType<DragDropProviderBase.ContainerProps>;
  draftAppointmentComponent?: React.ComponentType<DragDropProviderBase.DraftAppointmentProps>;
  sourceAppointmentComponent?: React.ComponentType<DragDropProviderBase.SourceAppointmentProps>;
}

// WARNING: Unsupported export: CellData
// WARNING: Unsupported export: LayoutProps
// WARNING: Unsupported export: DayScaleLayoutProps
// WARNING: Unsupported export: DayScaleCellProps
// WARNING: Unsupported export: TimeTableLayoutProps
// WARNING: Unsupported export: TimeTableCellProps
// WARNING: Unsupported export: AppointmentLayerProps
// WARNING: Unsupported export: RowProps
// @public (undocumented)
module MonthView {
}

// @public (undocumented)
interface MonthViewProps {
  appointmentLayerComponent?: React.ComponentType<MonthViewBase.AppointmentLayerProps>;
  dayScaleCellComponent?: React.ComponentType<MonthViewBase.DayScaleCellProps>;
  dayScaleLayoutComponent?: React.ComponentType<MonthViewBase.DayScaleLayoutProps>;
  dayScaleRowComponent?: React.ComponentType<MonthViewBase.RowProps>;
  firstDayOfWeek?: number;
  intervalCount?: number;
  layoutComponent?: React.ComponentType<MonthViewBase.LayoutProps>;
  name?: string;
  timeTableCellComponent?: React.ComponentType<MonthViewBase.TimeTableCellProps>;
  timeTableLayoutComponent?: React.ComponentType<MonthViewBase.TimeTableLayoutProps>;
  timeTableRowComponent?: React.ComponentType<MonthViewBase.RowProps>;
}

// WARNING: Unsupported export: RootProps
// @public (undocumented)
module Scheduler {
}

// @public (undocumented)
interface SchedulerProps {
  data?: Array<AppointmentModel>;
  rootComponent?: React.ComponentType<SchedulerBase.RootProps>;
}

// WARNING: Unsupported export: RootProps
// WARNING: Unsupported export: FlexibleSpaceProps
// @public (undocumented)
module Toolbar {
}

// @public (undocumented)
interface ToolbarProps {
  flexibleSpaceComponent?: React.ComponentType<ToolbarBase.FlexibleSpaceProps>;
  rootComponent?: React.ComponentType<ToolbarBase.RootProps>;
}

// WARNING: Unsupported export: SwitcherProps
// @public (undocumented)
module ViewSwitcher {
}

// @public (undocumented)
interface ViewSwitcherProps {
  switcherComponent?: React.ComponentType<ViewSwitcherBase.SwitcherProps>;
}

// WARNING: Unsupported export: CellData
// WARNING: Unsupported export: LayoutProps
// WARNING: Unsupported export: TimeScaleLayoutProps
// WARNING: Unsupported export: TimeScaleCellProps
// WARNING: Unsupported export: DayScaleLayoutProps
// WARNING: Unsupported export: DayScaleCellProps
// WARNING: Unsupported export: DayScaleEmptyCellProps
// WARNING: Unsupported export: TimeTableLayoutProps
// WARNING: Unsupported export: TimeTableCellProps
// WARNING: Unsupported export: AppointmentLayerProps
// WARNING: Unsupported export: RowProps
// @public (undocumented)
module WeekView {
}

// @public (undocumented)
interface WeekViewProps {
  appointmentLayerComponent?: React.ComponentType<WeekViewBase.AppointmentLayerProps>;
  cellDuration?: number;
  dayScaleCellComponent?: React.ComponentType<WeekViewBase.DayScaleCellProps>;
  dayScaleEmptyCellComponent?: React.ComponentType<WeekViewBase.DayScaleEmptyCellProps>;
  dayScaleLayoutComponent?: React.ComponentType<WeekViewBase.DayScaleLayoutProps>;
  dayScaleRowComponent?: React.ComponentType<WeekViewBase.RowProps>;
  endDayHour?: number;
  excludedDays?: Array<number>;
  firstDayOfWeek?: number;
  intervalCount?: number;
  layoutComponent?: React.ComponentType<WeekViewBase.LayoutProps>;
  name?: string;
  startDayHour?: number;
  timeScaleCellComponent?: React.ComponentType<WeekViewBase.TimeScaleCellProps>;
  timeScaleLayoutComponent?: React.ComponentType<WeekViewBase.TimeScaleLayoutProps>;
  timeScaleRowComponent?: React.ComponentType<WeekViewBase.RowProps>;
  timeTableCellComponent?: React.ComponentType<WeekViewBase.TimeTableCellProps>;
  timeTableLayoutComponent?: React.ComponentType<WeekViewBase.TimeTableLayoutProps>;
  timeTableRowComponent?: React.ComponentType<WeekViewBase.RowProps>;
}

// (No @packagedocumentation comment for this package)
