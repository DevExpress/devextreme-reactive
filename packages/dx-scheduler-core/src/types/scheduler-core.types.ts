export type CurrentViewType = string;
export type CurrentDate = Date;
export type FirstDayOfWeek = number | undefined;
export type DayCount = number;
export type StartDayHour = number;
export type EndDayHour = number;
export type CellDuration = number;
export type ViewName = string;
export type CurrentTime = Date | number | string;
export type StartViewDate = Date;
export type EndViewDate = Date;

export interface AppointmentModel {
  /** The start date. */
  startDate: Date | string | number;
  /** The end date. */
  endDate: Date | string | number;
  /** The title. */
  title?: string;
  /** The all day flag. */
  allDay?: boolean;
  /** The identifier. */
  id?: number | string;
  /** Any other properties. */
  [propertyName: string]: any;
}

export interface AppointmentCore {
  /** The start date. */
  start: Date | string | number;
  /** The end date. */
  end: Date | string | number;
  /** The all day flag. */
  allDay?: boolean;
  /** The all appointment data */
  dataItem: AppointmentModel;
}

export interface TimeScale {
  /** The start date. */
  start: Date;
  /** The end date. */
  end: Date;
}

export interface ViewCell {
  /** Specifies the cell start time. */
  startDate: Date;
  /** Specifies the cell end time. */
  endDate?: Date;
  /** Indicates whether the cell's date is not in the current month. */
  otherMonth?: boolean;
  /** Indicates whether the cell's date is today. */
  today?: boolean;
}
