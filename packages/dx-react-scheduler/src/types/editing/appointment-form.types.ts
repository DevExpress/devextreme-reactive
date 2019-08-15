import { AppointmentModel } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace AppointmentForm {
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
  /** A component that render the appointment form's root component */
  rootComponent: React.ComponentType<any>;
  /** A component that render the appointment form's layout */
  layoutComponent: React.ComponentType<AppointmentForm.LayoutProps>;
  /** A component that render the appointment form's layout for command buttons */
  commandLayoutComponent: React.ComponentType<AppointmentForm.CommandLayoutProps>;
  /** A component that render the appointment form's layout for basic part */
  basicLayoutComponent: React.ComponentType<AppointmentForm.BasicLayoutProps>;
  /** A component that render the appointment form's layout for recurrence part */
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
