import { AppointmentModel } from './scheduler-core.types';

/** An appointment's meta data object. */
export interface AppointmentMeta {
  /** A React component instance or a DOM element that is used to position the tooltip. */
  target: React.ReactInstance;
  /** The appointment's displayed metadata. */
  data: AppointmentModel;
}
