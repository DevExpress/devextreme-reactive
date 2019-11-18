import { AppointmentModel } from './scheduler-core.types';
import { ViewCellData } from './all-day-panel.types';

/** @internal */
export type IsCellShadedFn = (
  params: { startDate: Date; endDate: Date; otherMonth?: boolean },
  currentTime: number,
  shadePastCells: boolean,
) => boolean;

/** @internal */
export type IsShadedAppointment = (
  params: { data: AppointmentModel; },
  currentTime: number,
  shadePastAppointments: boolean,
) => boolean;

/** @internal */
export type GetCurrentTimeIndicatorTopFn = (
  cellData: ViewCellData,
  currentTime: number,
 ) => string | undefined;
