import { AppointmentModel, FormatterFn } from '../index';

/* tslint:disable no-namespace max-line-length */
export namespace AppointmentForm {
  /** @internal */
  export interface ContainerProps {
    /** A React Ref that should be passed into ref property. */
    ref: React.RefObject<unknown>;
  }
  /** Properties passed to a component that renders an Appointment Form overlay. */
  export interface OverlayProps {
    /** Specifies whether the overlay is visible. */
    visible: boolean;
    /** An event that initiates overlay hiding. */
    onHide: () => void;
    /** Specifies whether the overlay is full-size. */
    fullSize: boolean;
    /** A React component instance or a DOM element that is used to position the window. */
    target: React.RefObject<unknown>;
    /** A React node used to render overlay content. */
    children: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form's layout. */
  export interface LayoutProps {
    /** A component that renders the appointment form's layout for command buttons. */
    commandLayoutComponent: React.ComponentType<AppointmentForm.CommandLayoutProps>;
    /** A component that renders the appointment form's layout for basic appointment editors. */
    basicLayoutComponent: React.ComponentType<AppointmentForm.BasicLayoutProps>;
    /** A component that renders the appointment form's layout for recurrent appointment editors. */
    recurrenceLayoutComponent: React.ComponentType<AppointmentForm.RecurrenceLayoutProps>;
    /** Specifies whether the layout should render editors for recurrent appointments. */
    isRecurrence: boolean;
    /** A React node to be rendered in the layout. */
    children?: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form's layout for command buttons. */
  export interface CommandLayoutProps {
    /** Specifies whether the appointment form is read-only. */
    readOnly?: boolean;
    /** Specifies whether the command layout is full-size. */
    fullSize: boolean;
    /** Specifies whether to show the SaveButton. */
    showSaveButton?: boolean;
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
    /** A React node to be rendered in Command Layout. */
    children?: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form's layout for basic appointment editors. */
  export interface BasicLayoutProps {
    /* Specifies whether the layout is full-size. */
    fullSize: boolean;
    /** The appointment’s displayed metadata. */
    appointmentData: AppointmentModel;
    /** Handles appointment field value changes. */
    onFieldChange: (change: any) => void;
    /** Returns a localization message by the message key. */
    getMessage: (messageKey: string) => string;
    /** Specifies whether the appointment form is read-only. */
    readOnly?: boolean;
    /** Specifies the locale date format that is a string holding a BCP 47 language tag, or an array of such strings. */
    locale: string | string[];
    /** A component that renders the appointment form's text editor component. */
    textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
    /** A component that renders the appointment form's date editor component. */
    dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
    /** A component that renders the appointment form's boolean editor component. */
    booleanEditorComponent: React.ComponentType<AppointmentForm.BooleanEditorProps>;
    /** A component that renders the appointment form's select component. */
    selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
    /** A component that renders the appointment form's text label component. */
    labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
    /** A React node to be rendered in the Basic Layout. */
    children?: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form's layout for recurrent appointment editors. */
  export interface RecurrenceLayoutProps {
    /** The appointment’s displayed metadata. */
    appointmentData: AppointmentModel;
    /** Handles appointment field value changes. */
    onFieldChange: (nextFieldValue: { [fieldName: string]: any }) => void;
    /** Returns a localization message by the message key. */
    getMessage: (messageKey: string) => string;
    /** Specifies the appointment form is read-only. */
    readOnly?: boolean;
    /** A function that formats dates depending on locale. */
    formatDate: FormatterFn;
    /** Specifies the locale date format that is a string holding a BCP 47 language tag, or an array of such strings. */
    locale: string | string[];
    /** A component that renders the appointment form's radio group component. */
    radioGroupComponent: React.ComponentType<AppointmentForm.RadioGroupProps>;
    /** A component that renders the appointment form's weekly recurrence selector component component. */
    weeklyRecurrenceSelectorComponent: React.ComponentType<AppointmentForm.WeeklyRecurrenceSelectorProps>;
    /** A component that renders the appointment form's text editor component. */
    textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
    /** A component that renders the appointment form's date editor component. */
    dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
    /** A component that renders the appointment form's select component. */
    selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
    /** A component that renders the appointment form's text label component. */
    labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
    /**  A React node to be rendered in the Recurrence Layout. */
    children?: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form's text editor component. */
  export interface TextEditorProps {
    /** A value to be edited. */
    value: string | number;
    /** A placeholder displayed inside the text field. */
    placeholder: string;
    /** Specifies whether the text editor is read-only. */
    readOnly: boolean;
    /** Handles value changes. */
    onValueChange: (nextValue: string) => void;
    /** The text editor's type identifier. */
    type: 'titleTextEditor' | 'multilineTextEditor' | 'ordinaryTextEditor' | 'numberEditor';
  }
  /** Properties passed to a component that renders the appointment form's date editor component */
  export interface DateEditorProps {
    /** Specifies the date editor is read-only. */
    readOnly?: boolean;
    /** A value to be edited. */
    value?: string | number;
    /** Handles value changes. */
    onValueChange: (nextValue: Date) => void;
    /** Specifies the locale date format that is a string holding a BCP 47 language tag, or an array of such strings. */
    locale?: string | string[];
  }
  /** Properties passed to a component that renders the appointment form's boolean editor component */
  export interface BooleanEditorProps {
    /** The boolean editor’s label text. */
    label?: string;
    /** A value to be edited. */
    value?: boolean;
    /** Handles value changes. */
    onValueChange: (nextValue: boolean) => void;
    /** Specifies the boolean editor is read-only. */
    readOnly?: boolean;
  }
  /** Properties passed to a component that renders the appointment form's select component */
  export interface SelectProps {
    /** A value to be edited. */
    value: string | number;
    /** Handles value changes. */
    onValueChange: (nextValue: string | number) => void;
    /** Specifies the options for select menu items. */
    availableOptions?: Array<object>;
    /** Specifies the date editor is read-only. */
    readOnly?: boolean;
    /** The text editor's type identifier. */
    type: 'outlinedSelect' | 'filledSelect';
  }
  /** Properties passed to a component that renders a command button. */
  export interface CommandButtonProps {
    /** The command button's identifier. */
    id: 'saveButton' | 'deleteButton' | 'cancelButton';
    /** An event that initiates the command execution. */
    onExecute: () => void;
    /** Returns a localization message by the message key. */
    getMessage?: (messageKey: string) => string;
  }
  /** Properties passed to acomponent that renders the appointment form's text label component */
  export interface LabelProps {
    /** The label's type. */
    type?: 'titleLabel' | 'ordinaryLabel';
    /** The label's text. */
    text?: string;
  }
  /** Properties passed to a component that renders the appointment form's radio group component. */
  export interface RadioGroupProps {
    /** Specifies the appointment’s data that the form displays. */
    appointmentData: AppointmentModel;
    /** Specifies the locale date format that is a string holding a BCP 47 language tag, or an array of such strings. */
    locale?: string | string[];
    /** A function that formats dates depending on locale. */
    formatDate: FormatterFn;
    /** Handles appointment field value changes. */
    onFieldChange: (nextFieldValue: { [fieldName: string]: any }) => void;
    /** Specifies the date editor is read-only. */
    readOnly?: boolean;
    /** The radio group's type. */
    type: 'endRepeat' | 'monthlyRadioGroup' | 'yearlyRadioGroup';
    /*** Returns a specified localization message. */
    getMessage?: (messageKey: string) => string;
    /** A component that render the appointment form's text editor component */
    textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
    /** A component that render the appointment form's date editor component */
    dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
    /** A component that render the appointment form's select component */
    selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
    /** A component that render the appointment form's text label component */
    labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
  }
  /** Properties passed to a component that renders the appointment form's weekly recurrence selector component. */
  export interface WeeklyRecurrenceSelectorProps {
    /** A function that formats dates depending on locale. */
    formatDate: FormatterFn;
    /** Specifies the appointment recurrence rule. */
    rRule: string;
    /** Specifies the date editor is read-only. */
    readOnly: boolean;
    /** Handles appointment field value changes. */
    onFieldChange: (nextFieldValue: { [fieldName: string]: any }) => void;
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
    /** The more information editor’s label text. */
    moreInformationLabel?: string;
    /** The repeat editor’s label text. */
    repeatLabel?: string;
    /** The additional information editor’s label text. */
    additionalInformationLabel?: string;
    /** The notes editor’s label text. */
    notesLabel?: string;
    /** The never repeat type label text. */
    never?: string;
    /** The daily repeat type label text. */
    daily?: string;
    /** The weekly repeat type label text. */
    weekly?: string;
    /** The monthly repeat type label text. */
    monthly?: string;
    /** The yearly repeat type label text. */
    yearly?: string;
    /** The 'repeat every' label text. */
    repeatEveryLabel?: string;
    /** The 'days' label text. */
    daysLabel?: string;
    /** The 'end repeat' label text. */
    endRepeatLabel?: string;
    /** The 'on' label text. */
    onLabel?: string;
    /** The 'after' label text. */
    afterLabel?: string;
    /** The 'occurrences' label text. */
    occurrencesLabel?: string;
    /** The 'weeks on' label text. */
    weeksOnLabel?: string;
    /** The 'months' label text. */
    monthsLabel?: string;
    /** The 'of every month' label text. */
    ofEveryMonthLabel?: string;
    /** The 'the' label text. */
    theLabel?: string;
    /** The 'first' label text. */
    firstLabel?: string;
    /** The 'second' label text. */
    secondLabel?: string;
    /** The 'third' label text. */
    thirdLabel?: string;
    /** The 'fourth' label text. */
    fourthLabel?: string;
    /** The 'last' label text. */
    lastLabel?: string;
    /** The 'years' label text. */
    yearsLabel?: string;
    /** The 'of' label text. */
    ofLabel?: string;
    /** The 'every' label text. */
    everyLabel?: string;
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
  /** A component that renders the appointment form's overlay. */
  overlayComponent: React.ComponentType<AppointmentForm.OverlayProps>;
  /** A component that renders the appointment form's layout. */
  layoutComponent: React.ComponentType<AppointmentForm.LayoutProps>;
  /** A component that renders the appointment form's layout for command buttons. */
  commandLayoutComponent: React.ComponentType<AppointmentForm.CommandLayoutProps>;
  /** A component that renders the appointment form's layout for basic appointment editors. */
  basicLayoutComponent: React.ComponentType<AppointmentForm.BasicLayoutProps>;
  /** A component that renders the appointment form's layout for recurrent appointment editors. */
  recurrenceLayoutComponent: React.ComponentType<AppointmentForm.RecurrenceLayoutProps>;
  /** A component that render the appointment form's command button */
  commandButtonComponent: React.ComponentType<AppointmentForm.CommandButtonProps>;
  /** A component that renders the appointment form's text editor component. */
  textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
  /** A component that renders the appointment form's text label component. */
  labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
  /** A component that renders the appointment form's date editor component. */
  dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
  /** A component that renders the appointment form's boolean editor component. */
  booleanEditorComponent: React.ComponentType<AppointmentForm.BooleanEditorProps>;
  /** A component that renders the appointment form's select component. */
  selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
  /** A component that renders the appointment form's radio group component. */
  radioGroupComponent: React.ComponentType<AppointmentForm.RadioGroupProps>;
  /** A component that renders the appointment form's weekly recurrence selector component. */
  weeklyRecurrenceSelectorComponent: React.ComponentType<AppointmentForm.WeeklyRecurrenceSelectorProps>;
  /** An object that specifies localization messages. */
  messages?: AppointmentForm.LocalizationMessages;
}

/** @internal */
export type AppointmentFormState = {
  visible: boolean;
  appointmentData: AppointmentModel;
  isPreviouslyFullSize: boolean;
};
