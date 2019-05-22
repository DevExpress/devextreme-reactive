import { AppointmentModel } from '../index';

// tslint:disable-next-line:no-namespace
export namespace Scheduler {
  /** Describes properties passed to a component that renders the scheduler root layout. */
  export interface RootProps {
    /** A React node to be placed in the root layout. */
    children?: React.ReactNode;
  }
}

export interface SchedulerProps {
  /*** An array of appointment data objects. */
  data: AppointmentModel[];
  /** A component that renders the root layout. */
  rootComponent: React.ComponentType<Scheduler.RootProps>;
  /** The locale according to which dates should be formatted. */
  locale: string | string[];
}
