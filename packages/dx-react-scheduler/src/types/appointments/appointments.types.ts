import { AppointmentModel } from "@devexpress/dx-scheduler-core/src";

// tslint:disable-next-line:no-namespace
export namespace Appointments {
  /** Properties passed to a component that renders an appointment. */
  export interface AppointmentProps {
    /** A React node used to render the appointment content. */
    children: React.ReactNode;
    /** An object that specifies the appointment data. */
    data: AppointmentModel;
    /** Specifies whether the appointment is draggable. */
    draggable: boolean;
    /** A function that handles a click on the appointment. */
    onClick?: (e: any) => void;
    /** A function that handles a double click on the appointment. */
    onDoubleClick?: (e: any) => void;
  }
  /** Properties passed to a component that renders the appointment content. */
  export interface AppointmentContentProps {
    /** A React node used to render the appointment content. */
    children?: React.ReactNode;
    /** An object that represents appointment data. */
    data: AppointmentModel;
    /** A component that renders an icon for recurring appointments. */
    recurringIconComponent: React.ComponentType<any>
    /** Specifies whether the appointment is vertical or horizontal. */
    type: 'vertical' | 'horizontal';
    /** A function that formats dates according to the locale. */
    formatDate: (date: Date, options: any) => string;
  }
  /** Properties passed to a component that renders an element which indicates the appointment is divided. */
  export interface SplitIndicatorProps {
    /** Specifies whether the element is rendered at the start or end of the divided appointment. */
    position: 'start' | 'end';
    /** Specifies whether the appointment is vertical or horizontal. */
    appointmentType: 'vertical' | 'horizontal';
  }
  /** Properties passed to a component that renders a container for the appointment. */
  export interface ContainerProps {
    /** An object that configures the appointment’s geometry and position. */
    style: any;
  }
}

export interface AppointmentsProps {
  /**	A component that renders an appointment. */
  appointmentComponent: React.ComponentType<Appointments.AppointmentProps>;
  /** A component that renders the appointment content. */
  appointmentContentComponent: React.ComponentType<Appointments.AppointmentContentProps>;
  /** A component that renders an element which indicates the appointment is divided. */
  splitIndicatorComponent: React.ComponentType<Appointments.SplitIndicatorProps>;
  /** A component that renders an icon for recurring appointments. */
  recurringIconComponent: React.ComponentType<any>;
  /** A component that renders a container for the appointment. */
  containerComponent: React.ComponentType<Appointments.ContainerProps>;
}
