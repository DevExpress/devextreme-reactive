import { AppointmentModel, FormatterFn } from '../index';

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
    /** Specifies whether the layout should render recurrence part of editors */
    isRecurrence: boolean;
    /** A React node should be added as additional. */
    children?: React.ReactNode;
  }
  /** A component that render the appointment form's layout for command buttons */
  export interface CommandLayoutProps {
    /** Specifies the appointment form is read-only. */
    readOnly?: boolean;
    /** Specifies whether the command layout has full size */
    fullSize: boolean;
    /** A React node should be added as additional. */
    children?: React.ReactNode;
    /** An event raised when the Commit button is clicked. The event handler should commit an appointment changes. */
    onCommitButtonClick: () => void;
    /** An event raised when the Cancel button is clicked. The event handler should close the appointment form. */
    onCancelButtonClick: () => void;
    /** An event raised when the Delete button is clicked. The event handler should delete an appointment. */
    onDeleteButtonClick: () => void;
    /** Returns a localization message by the message key. */
    getMessage: (messageKey: string) => string;
    /** A component that renders a command button. */
    commandButtonComponent: React.ComponentType<AppointmentForm.CommandButtonProps>;
  }
  /** A component that render the appointment form's layout for basic part of editors */
  export interface BasicLayoutProps {
    /** The appointment’s displayed metadata. */
    appointmentData: AppointmentModel;
    /** Handles appointment field value changes. */
    onFieldChange: (change: any) => void;
    /** Returns a localization message by the message key. */
    getMessage: (messageKey: string) => string;
    /** Specifies the appointment form is read-only. */
    readOnly?: boolean;
    /** A component that render the appointment form's text editor component */
    textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
    /** A component that render the appointment form's date editor component */
    dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
    /** A component that render the appointment form's boolean editor component */
    booleanEditorComponent: React.ComponentType<AppointmentForm.BooleanEditorProps>;
    /** A component that render the appointment form's select component */
    selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
    /** A component that render the appointment form's text label component */
    labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
    /** A React node should be added as additional. */
    children?: React.ReactNode;
  }
  export interface RecurrenceLayoutProps {
    /** The appointment’s displayed metadata. */
    appointmentData: AppointmentModel;
    /** Handles appointment field value changes. */
    onFieldChange: (change: any) => void;
    /** Returns a localization message by the message key. */
    getMessage: (messageKey: string) => string;
    /** Specifies the appointment form is read-only. */
    readOnly?: boolean;
    /** A function that formats dates according to the locale. */
    formatDate: FormatterFn;
    /** A component that render the appointment form's radio group component */
    radioGroupComponent: React.ComponentType<AppointmentForm.RadioGroupProps>;
    /** A component that render the appointment form's button group component */
    buttonGroupComponent: React.ComponentType<AppointmentForm.ButtonGroupProps>;
    /** A component that render the appointment form's text editor component */
    textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
    /** A component that render the appointment form's date editor component */
    dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
    /** A component that render the appointment form's select component */
    selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
    /** A component that render the appointment form's text label component */
    labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
    /** A React node should be added as additional. */
    children?: React.ReactNode;
  }
  /** A component that render the appointment form's text editor component */
  export interface TextEditorProps {
    /** A value to be edited. */
    value: string | number;
    /** A placeholder that displayed inside text field */
    placeholder: string;
    /** Specifies the text editor is read-only. */
    readOnly: boolean;
    /** Handles value changes. */
    onValueChange: (nextValue: string) => void;
    /** The text editor's type identifier. */
    id: 'titleTextEditor' | 'noteTextEditor' | 'ordinaryTextEditor' | 'numberEditor';
  }
  /** A component that render the appointment form's date editor component */
  export interface DateEditorProps {
    /** Specifies the date editor is read-only. */
    readOnly: boolean;
    /** A value to be edited. */
    value: string | number;
    /** Handles value changes. */
    onValueChange: (nextValue: string) => void;
  }
  /** A component that render the appointment form's boolean editor component */
  export interface BooleanEditorProps {
    /** The boolean editor’s label text. */
    label: string;
    /** A value to be edited. */
    value: string | number;
    /** Handles value changes. */
    onValueChange: (nextValue: string) => void;
    /** Specifies the date editor is read-only. */
    readOnly: boolean;
  }
  /** A component that render the appointment form's select component */
  export interface SelectProps {
    /** A value to be edited. */
    value: string | number;
    /** Handles value changes. */
    onValueChange: (nextValue: string) => void;
    /** Specifies the options are available for chose */
    availableOptions: Array<string>;
    /** Specifies the date editor is read-only. */
    readOnly: boolean;
    /** The text editor's type identifier. */
    id: 'titleTextEditor' | 'noteTextEditor' | 'ordinaryTextEditor' | 'numberEditor';
  }
  /** A component that renders a command button. */
  export interface CommandButtonProps {
    /** The command identifier. */
    id: 'saveButton' | 'deleteButton' | 'closeButton';
    /** An event initiating the command execution. */
    onExecute: () => void;
    /*** Returns a specified localization message. */
    getMessage?: (messageKey: string) => string;
  }
  /** A component that render the appointment form's text label component */
  export interface LabelProps {
    /** The label type identifier. */
    id: 'titleLabel' | 'ordinaryLabel';
    text: string;
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
