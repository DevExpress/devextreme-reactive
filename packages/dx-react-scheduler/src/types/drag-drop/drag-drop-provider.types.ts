import { SchedulerDateTime } from '@devexpress/dx-scheduler-core';
import { AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace DragDropProvider {
  /** Describes properties of the component that renders a container for the appointment being dragged. */
  export interface ContainerProps {
    /** Represents the appointment being dragged. */
    children: React.ReactNode;
  }
  /** Describes properties of the component that renders the appointment being dragged. */
  export interface DraftAppointmentProps {
    /** Specifies the appointment’s data. */
    data: AppointmentModel;
    /** Configures the appointment’s geometry and position. */
    style: React.CSSProperties;
    /** Specifies the appointment’s type. */
    type: string;
    /***
     * true if the appointment is continued from
     * the previous day/week/month/year.
     * */
    fromPrev: boolean;
    /** true if the appointment continues on the next day/week/month/year. */
    toNext: boolean;
    /** Indicates whether the appointment is shaded. */
    isShaded?: boolean;
  }
  /** Describes properties of the component that renders a copy of the appointment being dragged in its previous location. */
  export interface SourceAppointmentProps {
    /** Specifies the appointment’s data. */
    data: AppointmentModel;
    /** Specifies the appointment’s type. */
    type: string;
    /** Indicates whether the appointment is shaded. */
    isShaded?: boolean;
  }
  /** Describes properties of the component that renders a handle used to resize the appointment. */
  export interface ResizeProps {
    /** Specifies the handle’s position in the appointment. */
    position: 'start' | 'end';
    /** Specifies whether the appointment is vertical or horizontal. */
    appointmentType: 'vertical' | 'horizontal';
  }
}

export interface DragDropProviderProps {
  /** A function that specifies draggable appointments. */
  allowDrag?: (appointmentData: AppointmentModel) => boolean;
  /** A function that specifies resizable appointments. */
  allowResize?: (appointmentData: AppointmentModel) => boolean;
  /** Specifies the scroll speed when an appointment is resized or dragged and dropped. */
  scrollSpeed?: number;
  /** A component that renders the appointment being dragged. */
  draftAppointmentComponent: React.ComponentType<DragDropProvider.DraftAppointmentProps>;
  /** A component that renders a copy of the appointment being dragged in its previous location. */
  sourceAppointmentComponent: React.ComponentType<DragDropProvider.SourceAppointmentProps  & { forwardedRef: React.Ref<unknown>}>;
  /** A component that renders a handle used to resize the appointment. */
  resizeComponent: React.ComponentType<DragDropProvider.ResizeProps  & { forwardedRef?: React.Ref<unknown>}>;
  /***
   * A component that renders a container for the appointment being dragged.
   * */
  containerComponent: React.ComponentType<DragDropProvider.ContainerProps>;
}

/** @internal */
export type DragDropProviderState = {
  startTime: SchedulerDateTime | null,
  endTime: SchedulerDateTime | null,
  payload: any,
  isOutside: boolean,
  appointmentGroupingInfo: any,
  allowDrag?: (appointmentData: AppointmentModel) => boolean,
  allowResize?: (appointmentData: AppointmentModel) => boolean,
  appointmentContentTemplateKey: number,
  appointmentTopTemplateKey: number,
  appointmentBottomTemplateKey: number,
};
