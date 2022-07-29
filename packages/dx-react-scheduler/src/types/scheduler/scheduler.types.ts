import { AppointmentModel } from '../index';

// tslint:disable-next-line:no-namespace
export namespace Scheduler {
  /** Describes properties passed to a component that renders the scheduler root layout. */
  export interface RootProps {
    /** A React node to be placed in the root layout. */
    children?: React.ReactNode;
    /** The Scheduler's height. */
    height: number | 'auto';
  }
}

export type SchedulerProps = React.PropsWithChildren<{
  /*** An array of appointment data objects. */
  data: AppointmentModel[];
  /** A component that renders the root layout. */
  rootComponent: React.ComponentType<Scheduler.RootProps>;
  /** The locale according to which dates should be formatted. */
  locale: string | string[];
  /***
   * The scheduler's height. If the value is 'auto',
   * the height equals that of the container component.
   * **/
  height: number | 'auto';
  /** A number between 0 (Sunday) and 6 (Saturday) that specifies the first day of the week. */
  firstDayOfWeek: number;
}>;
