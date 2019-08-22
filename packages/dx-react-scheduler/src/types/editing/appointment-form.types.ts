import { AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace AppointmentForm {
  /** @internal */
  export interface ContainerProps {
    /** A React Ref that should be passed into ref property. */
    ref: React.RefObject<unknown>;
  }
  /** Describes properties passed to a component that renders an Appointment Form overlay. */
  export interface OverlayProps {
    /** Specifies whether the overlay is visible. */
    visible: boolean;
    /** An event that initiates overlay hiding. */
    onHide: () => void;
    /** Specifies whether the overlay has full size */
    fullSize: boolean;
    /** A React component instance or a DOM element that is used to position the window. */
    target: React.RefObject<unknown>;
    /** A React node used to render overlay content. */
    children: React.ReactNode;
  }
  /** A component that render the appointment form's layout */
  export interface LayoutProps {
    /** A component that render the appointment form's layout for command buttons */
    commandLayoutComponent: React.ComponentType<AppointmentForm.CommandLayoutProps>;
    /** A component that render the appointment form's layout for basic part of editors */
    basicLayoutComponent: React.ComponentType<AppointmentForm.BasicLayoutProps>;
    /** A component that render the appointment form's layout for recurrence part of editors */
    recurrenceLayoutComponent: React.ComponentType<AppointmentForm.RecurrenceLayoutProps>;
    /** Specifies that recurrence editor part should be rendered */
    isRecurring: boolean;
    /** A React node used to render layout content. */
    children: React.ReactNode;
  }
  /** A component that render the appointment form's layout for command buttons */
  export interface CommandLayoutProps {
    
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
  /** @internal */
  containerComponent: React.ComponentType<AppointmentForm.ContainerProps>;
  /** A component that render the appointment form's overlay component */
  overlayComponent: React.ComponentType<AppointmentForm.OverlayProps>;
  /** A component that render the appointment form's layout */
  layoutComponent: React.ComponentType<AppointmentForm.LayoutProps>;
  /** A component that render the appointment form's layout for command buttons */
  commandLayoutComponent: React.ComponentType<AppointmentForm.CommandLayoutProps>;
  /** A component that render the appointment form's layout for basic part of editors */
  basicLayoutComponent: React.ComponentType<AppointmentForm.BasicLayoutProps>;
  /** A component that render the appointment form's layout for recurrence part of editors */
  recurrenceLayoutComponent: React.ComponentType<AppointmentForm.RecurrenceLayoutProps>;
  /** A component that render the appointment form's command button */
  commandButtonComponent: React.ComponentType<AppointmentForm.CommandButtonProps>;
  /** A component that render the appointment form's text editor component */
  textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
  /** A component that render the appointment form's text label component */
  labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
  /** A component that render the appointment form's date editor component */
  dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
  /** A component that render the appointment form's boolean editor component */
  booleanEditorComponent: React.ComponentType<AppointmentForm.BooleanEditorProps>;
  /** A component that render the appointment form's select component */
  selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
  /** A component that render the appointment form's radio group component */
  radioGroupComponent: React.ComponentType<AppointmentForm.RadioGroupProps>;
  /** A component that render the appointment form's button group component */
  buttonGroupComponent: React.ComponentType<AppointmentForm.ButtonGroupProps>;
  /** An object that specifies localization messages. */
  messages?: AppointmentForm.LocalizationMessages;
}

/** @internal */
export type AppointmentFormState = {
  visible: boolean;
  appointmentData: AppointmentModel;
};
