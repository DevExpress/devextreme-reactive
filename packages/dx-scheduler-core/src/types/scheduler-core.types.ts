export type CurrentViewType = string;

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
