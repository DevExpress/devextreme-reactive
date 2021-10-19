import {
  AppointmentModel, FormatterFn, ValidResourceInstance, ValidResource, SelectOption,
} from '../index';

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
    /** An event raised when the overlay hides. */
    onHide: () => void;
    /** Specifies whether the overlay is full-size. */
    fullSize: boolean;
    /** A React component instance or a DOM element that is used to position the overlay. */
    target: React.RefObject<unknown>;
    /** A React node used to render the overlay content. */
    children: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form's layout. */
  export interface LayoutProps {
    /** A component that renders a layout for command buttons. */
    commandLayoutComponent: React.ComponentType<AppointmentForm.CommandLayoutProps>;
    /** A component that renders a layout for editors that edit basic appointment data. */
    basicLayoutComponent: React.ComponentType<AppointmentForm.BasicLayoutProps>;
    /** A component that renders a layout for editors that specify the appointment's recurrence. */
    recurrenceLayoutComponent: React.ComponentType<AppointmentForm.RecurrenceLayoutProps>;
    /** Specifies whether recurrence editors should be rendered. */
    isRecurrence: boolean;
    /** A React node used to render additional components to the layout. */
    children?: React.ReactNode;
  }
  /** Properties passed to a component that renders a layout for command buttons. */
  export interface CommandLayoutProps {
    /** Specifies whether the appointment form is read-only. */
    readOnly?: boolean;
    /** Specifies whether the command layout is full-size. */
    fullSize: boolean;
    /** Specifies whether to disable the Save button. */
    disableSaveButton?: boolean;
    /** Specifies whether to hide the Delete button. */
    hideDeleteButton?: boolean;
    /** An event raised when the Commit button is clicked. The event handler should commit an appointment changes. */
    onCommitButtonClick: () => void;
    /** An event raised when the Cancel button is clicked. The event handler should close the appointment form. */
    onCancelButtonClick: () => void;
    /** An event raised when the Delete button is clicked. The event handler should delete an appointment. */
    onDeleteButtonClick: () => void;
    /** Uses a localization message's key to retrieve the message. */
    getMessage: (messageKey: string) => string;
    /** A component that renders a command button. */
    commandButtonComponent: React.ComponentType<AppointmentForm.CommandButtonProps>;
    /** A React node used to render additional components to the Command layout. */
    children?: React.ReactNode;
  }
  /** Properties passed to a component that renders a layout for editors that edit basic appointment data. */
  export interface BasicLayoutProps {
    /* Specifies whether the layout is full-size. */
    fullSize: boolean;
    /** The appointment's data. */
    appointmentData: AppointmentModel;
    /** The appointment's resource items. */
    appointmentResources: Array<ValidResourceInstance>;
    /** The all resources that were defined. */
    resources: Array<ValidResource>;
    /** An event that is raised when a field value in the appointment form is changed. */
    onFieldChange: (change: any) => void;
    /** Uses a localization message's key to retrieve the message. */
    getMessage: (messageKey: string) => string;
    /** Specifies whether the appointment form is read-only. */
    readOnly?: boolean;
    /** Specifies the locale as an IETF BCP 47 language tag or an array of such tags. The locale is used to format date-time values. */
    locale: string | string[];
    /** A component that renders a text editor. */
    textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
    /** A component that renders a date-time editor. */
    dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
    /** A component that renders an editor of Boolean values. */
    booleanEditorComponent: React.ComponentType<AppointmentForm.BooleanEditorProps>;
    /** A component that renders an options menu. */
    selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
    /** A component that renders a resource editor. */
    resourceEditorComponent: React.ComponentType<AppointmentForm.ResourceEditorProps>;
    /** A component that renders a text label. */
    labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
    /** A React node used to render additional components to the Basic Layout. */
    children?: React.ReactNode;
  }
  /** Properties passed to a component that renders the appointment form's layout for editors that edit the appointment's recurrence. */
  export interface RecurrenceLayoutProps {
    /* Specifies whether the layout is visible. */
    visible: boolean;
    /** The appointment's data. */
    appointmentData: AppointmentModel;
    /** An event that is raised when a field value in the appointment form is changed. */
    onFieldChange: (nextFieldValue: { [fieldName: string]: any }) => void;
    /** Uses a localization message's key to retrieve the message. */
    getMessage: (messageKey: string) => string;
    /** Specifies the appointment form is read-only. */
    readOnly?: boolean;
    /** A function that formats dates based on the locale. */
    formatDate: FormatterFn;
    /** Specifies the locale as an IETF BCP 47 language tag or an array of such tags. The locale is used to format date-time values. */
    locale: string | string[];
    /** A number between 0 (Sunday) and 6 (Saturday) that specifies the first day of the week. */
    firstDayOfWeek: number;
    /** A component that renders a radio group. */
    radioGroupComponent: React.ComponentType<AppointmentForm.RadioGroupProps>;
    /** A component that renders a weekly recurrence selector. */
    weeklyRecurrenceSelectorComponent: React.ComponentType<AppointmentForm.WeeklyRecurrenceSelectorProps>;
    /** A component that renders a text editor. */
    textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
    /** A component that renders a date-time editor. */
    dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
    /** A component that renders an options menu. */
    selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
    /** A component that renders a text label. */
    labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
    /**  A React node used to render additional components to the Recurrence Layout. */
    children?: React.ReactNode;
  }
  /** Properties passed to a component that renders a text editor on the appointment form. */
  export interface TextEditorProps {
    /** The editor's value. */
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
  /** Properties passed to a component that renders a date-time editor on the appointment form. */
  export interface DateEditorProps {
    /** Specifies the date editor is read-only. */
    readOnly?: boolean;
    /** The editor's value. */
    value?: string | number;
    /** When true, users cannot edit the time. */
    excludeTime?: boolean;
    /** Handles value changes. */
    onValueChange: (nextValue: Date) => void;
    /** Specifies the locale as an IETF BCP 47 language tag or an array of such tags. The locale is used to format date-time values. */
    locale?: string | string[];
  }
  /** Properties passed to a component that renders a Boolean value editor on the appointment form. */
  export interface BooleanEditorProps {
    /** The editor's text label. */
    label?: string;
    /** The editor's value. */
    value?: boolean;
    /** Handles value changes. */
    onValueChange: (nextValue: boolean) => void;
    /** Specifies the editor is read-only. */
    readOnly?: boolean;
  }
  /** Properties passed to a component that renders a menu of options on the appointment form. */
  export interface SelectProps {
    /** The selected option. */
    value: string | number;
    /** Handles value changes. */
    onValueChange: (nextValue: string | number) => void;
    /** Specifies available menu options. */
    availableOptions?: Array<SelectOption>;
    /** Specifies whether the menu is read-only. */
    readOnly?: boolean;
    /** The menu's type. */
    type: 'outlinedSelect' | 'filledSelect';
  }
  /** A component that renders a resource editor. */
  export interface ResourceEditorProps {
    /** The appointment's resource items. */
    appointmentResources: Array<ValidResourceInstance>;
    /** A resource being edited. */
    resource: ValidResource;
    /** Handles value changes. */
    onResourceChange: (nextValue: string | number | Array<string | number>) => void;
    /** Specifies whether the menu is read-only. */
    readOnly?: boolean;
  }
  /** Properties passed to a component that renders a command button on the appointment form. */
  export interface CommandButtonProps {
    /** The command button's identifier. */
    id: 'saveButton' | 'deleteButton' | 'cancelButton';
    /** An event that initiates the command execution. */
    onExecute: () => void;
    /** Uses a localization message's key to retrieve the message. */
    getMessage?: (messageKey: string) => string;
  }
  /** Properties passed to a component that renders a text label on the appointment form. */
  export interface LabelProps {
    /** The label's type. */
    type?: 'titleLabel' | 'ordinaryLabel';
    /** The label's text. */
    text?: string;
  }
  /** Properties passed to a component that renders a radio group on the appointment form. */
  export interface RadioGroupProps {
    /** The appointment's data. */
    appointmentData: AppointmentModel;
    /** Specifies the locale as an IETF BCP 47 language tag or an array of such tags. The locale is used to format date-time values. */
    locale?: string | string[];
    /** A function that formats dates based on the locale. */
    formatDate: FormatterFn;
    /** A number between 0 (Sunday) and 6 (Saturday) that specifies the first day of the week. */
    firstDayOfWeek: number;
    /** An event that is raised when a field value in the appointment form is changed. */
    onFieldChange: (nextFieldValue: { [fieldName: string]: any }) => void;
    /** Specifies the date editor is read-only. */
    readOnly?: boolean;
    /** The radio group's type. */
    type: 'endRepeat' | 'monthlyRadioGroup' | 'yearlyRadioGroup';
    /** Uses a localization message's key to retrieve the message. */
    getMessage?: (messageKey: string) => string;
    /** A component that renders a text editor. */
    textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
    /** A component that renders a date-time editor. */
    dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
    /** A component that renders an options menu. */
    selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
    /** A component that renders a text label. */
    labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
  }
  /** Properties passed to a component that renders a weekly recurrence selector on the appointment form. */
  export interface WeeklyRecurrenceSelectorProps {
    /** A function that formats dates based on the locale. */
    formatDate: FormatterFn;
    /** A number between 0 (Sunday) and 6 (Saturday) that specifies the first day of the week. */
    firstDayOfWeek: number;
    /** Specifies the recurrence rule. */
    rRule: string;
    /** Specifies whether the weekly recurrence selector is read-only. */
    readOnly: boolean;
    /** Handles appointment field value changes. */
    onFieldChange: (nextFieldValue: { [fieldName: string]: any }) => void;
  }
  /** Localization Messages */
  export interface LocalizationMessages {
    /** The "All Day" editor's label text. */
    allDayLabel?: string;
    /** The "Title" editor's label text. */
    titleLabel?: string;
    /** The commit button's text. */
    commitCommand?: string;
    /** The "Repeat" editor’s label text. */
    repeatLabel?: string;
    /** The "Notes" editor’s label text. */
    notesLabel?: string;
    /** The "Never" label text. */
    never?: string;
    /** The "Daily" label text. */
    daily?: string;
    /** The "Weekly" label text. */
    weekly?: string;
    /** The "Monthly" label text. */
    monthly?: string;
    /** The "Yearly" label text. */
    yearly?: string;
    /** The "Repeat every" label text. */
    repeatEveryLabel?: string;
    /** The "day(s)" label text. */
    daysLabel?: string;
    /** The "End repeat" label text. */
    endRepeatLabel?: string;
    /** The "On" label text. */
    onLabel?: string;
    /** The "After" label text. */
    afterLabel?: string;
    /** The "Occurrences" label text. */
    occurrencesLabel?: string;
    /** The "week(s) on:" label text. */
    weeksOnLabel?: string;
    /** The "month(s)" label text. */
    monthsLabel?: string;
    /** The "of every month" label text. */
    ofEveryMonthLabel?: string;
    /** The "The" label text. */
    theLabel?: string;
    /** The "First" label text. */
    firstLabel?: string;
    /** The "Second" label text. */
    secondLabel?: string;
    /** The "Third" label text. */
    thirdLabel?: string;
    /** The "Fourth" label text. */
    fourthLabel?: string;
    /** The "Last" label text. */
    lastLabel?: string;
    /** The "year(s)" label text. */
    yearsLabel?: string;
    /** The "of" label text. */
    ofLabel?: string;
    /** The "Every" label text. */
    everyLabel?: string;
    /** The "Details" label text. */
    detailsLabel?: string;
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
  /** A component that renders a layout for command buttons. */
  commandLayoutComponent: React.ComponentType<AppointmentForm.CommandLayoutProps>;
  /** A component that renders a layout for editors that edit basic appointment data. */
  basicLayoutComponent: React.ComponentType<AppointmentForm.BasicLayoutProps>;
  /** A component that renders a layout for editors that specify the appointment's recurrence. */
  recurrenceLayoutComponent: React.ComponentType<AppointmentForm.RecurrenceLayoutProps>;
  /** A component that renders a command button. */
  commandButtonComponent: React.ComponentType<AppointmentForm.CommandButtonProps>;
  /** A component that renders a text editor. */
  textEditorComponent: React.ComponentType<AppointmentForm.TextEditorProps>;
  /** A component that renders a text label. */
  labelComponent: React.ComponentType<AppointmentForm.LabelProps>;
  /** A component that renders a date-time editor. */
  dateEditorComponent: React.ComponentType<AppointmentForm.DateEditorProps>;
  /** A component that renders an editor of Boolean values. */
  booleanEditorComponent: React.ComponentType<AppointmentForm.BooleanEditorProps>;
  /** A component that renders an options menu. */
  selectComponent: React.ComponentType<AppointmentForm.SelectProps>;
  /** A component that renders a resource editor. */
  resourceEditorComponent: React.ComponentType<AppointmentForm.ResourceEditorProps>;
  /** A component that renders a radio group. */
  radioGroupComponent: React.ComponentType<AppointmentForm.RadioGroupProps>;
  /** A component that renders a weekly recurrence selector. */
  weeklyRecurrenceSelectorComponent: React.ComponentType<AppointmentForm.WeeklyRecurrenceSelectorProps>;
  /** An object that specifies localization messages. */
  messages?: AppointmentForm.LocalizationMessages;
}

/** @internal */
export type AppointmentFormState = {
  visible: boolean;
  appointmentData: AppointmentModel;
  previousAppointment: AppointmentModel;
};
