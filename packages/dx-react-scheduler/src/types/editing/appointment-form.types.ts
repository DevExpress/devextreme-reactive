import { AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace AppointmentForm {
  /** Properties passed to a component that renders the appointment form’s popup. */
  export interface PopupProps {
    /** Specifies whether the popup is visible. */
    visible?: boolean;
    /** A React node used to render the popup content. */
    children: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form’s container. */
  export interface ContainerProps {
    /** A React node used to render the container content. */
    children: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form’s scrollable area. */
  export interface ScrollableAreaProps {
    children: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form’s static area. */
  export interface StaticAreaProps {
    /** A React node used to render the static area content. */
    children: React.ReactNode;
  }
  /** Localization Messages */
  export interface LocalizationMessages {
    /** The all day editor’s label text. */
    allDayLabel?: string;
    /** The title editor’s label text. */
    titleLabel?: string;
    /** The start date editor’s label text. */
    startDateLabel?: string;
    /** The end date editor’s label text. */
    endDateLabel?: string;
    /** The commit button’s text. */
    commitCommand?: string;
    /** The cancel button’s text. */
    cancelCommand?: string;
  }
}

export interface AppointmentFormProps {
  /** Specifies the appointment form’s visibility. */
  visible?: boolean;
  /** Handles changes to the appointment form’s visibility. */
  onVisibilityChange?: (visible: boolean) => void;
  /** Specifies the appointment’s data that the form displays. */
  appointmentData?: AppointmentModel;
  /** Handles changes to the appointment’s data. */
  onAppointmentDataChange?: (appointmentData: AppointmentModel) => void;
  /** Specifies the appointment form is read-only. */
  readOnly?: boolean;
  /** A component that renders the appointment form’s popup. */
  popupComponent: React.ComponentType<AppointmentForm.PopupProps>;
  /** A component that renders the appointment form’s container. */
  containerComponent: React.ComponentType<AppointmentForm.ContainerProps>;
  /** A component that renders the appointment form’s scrollable area. */
  scrollableAreaComponent: React.ComponentType<AppointmentForm.ScrollableAreaProps>;
  /** A component that renders the appointment form’s static area. */
  staticAreaComponent: React.ComponentType<AppointmentForm.StaticAreaProps>;
  /** An object that specifies localization messages. */
  messages?: AppointmentForm.LocalizationMessages;
  /** @internal */
  startDateComponent: React.ComponentType<any>;
  /** @internal */
  endDateComponent: React.ComponentType<any>;
  /** @internal */
  titleComponent: React.ComponentType<any>;
  /** @internal */
  commandButtonComponent: React.ComponentType<any>;
  /** @internal */
  allDayComponent: React.ComponentType<any>;

  saveButtonComponent: React.ComponentType<any>;

  deleteButtonComponent: React.ComponentType<any>;

  closeButtonComponent: React.ComponentType<any>;

  rootComponent: React.ComponentType<any>;

  scheduler: string;
}

/** @internal */
export type AppointmentFormState = {
  visible: boolean;
  appointmentData: AppointmentModel;
  recurrenceEditing: string;
};
