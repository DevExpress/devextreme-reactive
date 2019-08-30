# AppointmentForm Plugin Reference

The AppointmentForm plugin renders a form that visualizes appointment's data and allows a user to modify this data.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { AppointmentForm } from '@devexpress/dx-react-scheduler';
```

## User reference

### Dependencies

- [EditingState](editing-state.md) [Optional]
- [Appointments](appointments.md) [Optional]
- [AppointmentTooltip](appointment-tooltip.md) [Optional]
- [EditRecurrenceMenu](edit-recurrence-menu.md) [Optional]
- [IntegratedEditing](integrated-editing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
visible? | boolean | | Specifies the appointment form's visibility.
onVisibilityChange? | (visible: boolean) => void | | Handles changes to the appointment form's visibility.
appointmentData? | [AppointmentModel](./scheduler.md#appointmentmodel) | | Specifies the appointment's data that the form displays.
onAppointmentDataChange? | (appointmentData: [AppointmentModel](./scheduler.md#appointmentmodel)) => void | | Handles changes to the appointment's data.
readOnly? | boolean | false | Specifies the appointment form is read-only.
messages? | [AppointmentForm.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.
overlayComponent | ComponentType&lt;[AppointmentForm.OverlayProps](#appointmentformoverlayprops)&gt; | | A component that renders the appointment form's overlay.
layoutComponent | ComponentType&lt;[AppointmentForm.LayoutProps](#appointmentformlayoutprops)&gt; | | A component that renders the appointment form's layout.
commandLayoutComponent | ComponentType&lt;[AppointmentForm.CommandLayoutProps](#appointmentformcommandlayoutprops)&gt; | | A component that renders the appointment form's layout for command buttons.
basicLayoutComponent | ComponentType&lt;[AppointmentForm.BasicLayoutProps](#appointmentformbasiclayoutprops)&gt; | | A component that renders the appointment form's layout for basic appointment editors.
recurrenceLayoutComponent | ComponentType&lt;[AppointmentForm.RecurrenceLayoutProps](#appointmentformrecurrencelayoutprops)&gt; | | A component that renders the appointment form's layout for recurrent appointment editors.
textEditorComponent | ComponentType&lt;[AppointmentForm.TextEditorProps](#appointmentformtexteditorprops)&gt; | | A component that renders the appointment form's text editor component.
dateEditorComponent | ComponentType&lt;[AppointmentForm.DateEditorProps](#appointmentformdateeditorprops)&gt; | | A component that renders the appointment form's date editor component.
labelComponent | ComponentType&lt;[AppointmentForm.LabelProps](#appointmentformlabelprops)&gt; | | A component that renders the appointment form's text label component.
booleanEditorComponent | ComponentType&lt;[AppointmentForm.BooleanEditorProps](#appointmentformbooleaneditorprops)&gt; | | A component that renders the appointment form's boolean editor component.
selectComponent | ComponentType&lt;[AppointmentForm.SelectProps](#appointmentformselectprops)&gt; | | A component that renders the appointment form's select component.
radioGroupComponent | ComponentType&lt;[AppointmentForm.RadioGroupProps](#appointmentformradiogroupprops)&gt; | | A component that renders the appointment form's radio group component.
weeklyRecurrenceSelectorComponent | ComponentType&lt;[AppointmentForm.WeeklyRecurrenceSelectorProps](#appointmentformweeklyrecurrenceselectorprops)&gt; | | A component that renders the appointment form's weekly recurrence selector component.

## Interfaces

### Option

Item in Select component's options displayed as one of its menu items.

Field | Type | Description
------|------|------------
id | string &#124; number | Option's identifier.
text | string | Displayed option's text.

### AppointmentForm.OverlayProps

Properties passed to a component that renders the appointment form's overlay.

Field | Type | Description
------|------|------------
visible? | boolean | Specifies whether the overlay is visible.
onHide | () => void | An event that initiates overlay hiding.
fullSize | boolean | Specifies whether the overlay is full-size.
target | RefObject | A React component instance or a DOM element that is used to position the window.
children | ReactNode | A React node used to render overlay content.

### AppointmentForm.LayoutProps

Properties passed to a component that renders the appointment form's layout.

Field | Type | Description
------|------|------------
commandLayoutComponent | ComponentType&lt;[AppointmentForm.CommandLayoutProps](#appointmentformcommandlayoutprops)&gt; | A component that renders the appointment form's layout for command buttons.
basicLayoutComponent | ComponentType&lt;[AppointmentForm.BasicLayoutProps](#appointmentformbasiclayoutprops)&gt; |  A component that renders the appointment form's layout for basic appointment editors.
recurrenceLayoutComponent | ComponentType&lt;[AppointmentForm.RecurrenceLayoutProps](#appointmentformrecurrencelayoutprops)&gt; | A component that renders the appointment form's layout for recurrent appointment editors.
isRecurrence | boolean | Specifies whether the layout should render editors for recurrent appointments.
children? | ReactNode | A React node to be rendered in the layout.

### AppointmentForm.CommandLayoutProps

Properties passed to a component that renders the appointment form's layout for command buttons.

Field | Type | Description
------|------|------------
commandButtonComponent | ComponentType&lt;[AppointmentForm.CommandButtonProps](#appointmentformcommandbuttonprops)&gt; | A component that renders a command button.
readOnly? | boolean | Specifies whether the appointment form is read-only.
fullSize | boolean | Specifies whether the command layout is full-size.
onCommitButtonClick | () => void | An event raised when the Commit button is clicked. The event handler should commit an appointment changes.
onCancelButtonClick | () => void | An event raised when the Cancel button is clicked. The event handler should close the appointment form.
onDeleteButtonClick | () => void | An event raised when the Delete button is clicked. The event handler should delete an appointment.
getMessage | (messageKey: string) => string | Returns a localization message by the message key.
children? | ReactNode | A React node to be rendered in the Command Layout.

### AppointmentForm.BasicLayoutProps

Properties passed to a component that renders the appointment form's layout for basic appointment editors.

Field | Type | Description
------|------|------------
readOnly? | boolean | Specifies whether the appointment form is read-only.
appointmentData | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment’s displayed metadata.
onFieldChange | (nextFieldValue: { [fieldName: string]: any }) => void | Handles appointment field value changes.
getMessage | (messageKey: string) => string | Returns a localization message by the message key.
locale | string &#124; Array&lt;string&gt; | Specifies the locale date format that is a string holding a BCP 47 language tag, or an array of such strings.
textEditorComponent | ComponentType&lt;[AppointmentForm.TextEditorProps](#appointmentformtexteditorprops)&gt; | A component that renders the appointment form's text editor component.
dateEditorComponent | ComponentType&lt;[AppointmentForm.DateEditorProps](#appointmentformdateeditorprops)&gt; | A component that renders the appointment form's date editor component.
booleanEditorComponent | ComponentType&lt;[AppointmentForm.BooleanEditorProps](#appointmentformbooleanteditorprops)&gt; | A component that renders the appointment form's boolean editor component.
selectComponent | ComponentType&lt;[AppointmentForm.SelectProps](#appointmentformselectprops)&gt; | A component that renders the appointment form's select component.
labelComponent | ComponentType&lt;[AppointmentForm.LabelProps](#appointmentformlabelprops)&gt; | A component that renders the appointment form's text label component.
children? | ReactNode | A React node to be rendered in the Basic Layout.

### AppointmentForm.RecurrenceLayoutProps

Properties passed to a component that renders the appointment form's layout for recurrent appointment editors.

Field | Type | Description
------|------|------------
readOnly? | boolean | Specifies whether the appointment form is read-only.
appointmentData | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment’s displayed metadata.
onFieldChange | (nextFieldValue: { [fieldName: string]: any }) => void | Handles appointment field value changes.
getMessage | (messageKey: string) => string | Returns a localization message by the message key.
locale | string &#124; Array&lt;string&gt; | Specifies the locale date format that is a string holding a BCP 47 language tag, or an array of such strings.
formatDate | [FormatterFn](./scheduler.md#formatterfn) | A function that formats dates depending on locale.
radioGroupComponent | ComponentType&lt;[AppointmentForm.RadioGroupProps](#appointmentformradiogroupprops)&gt; | A component that renders the appointment form's radio group component.
weeklyRecurrenceSelectorComponent | ComponentType&lt;[AppointmentForm.WeeklyRecurrenceSelectorProps](#appointmentformweeklyrecurrenceselectorprops)&gt; | A component that renders the appointment form's weekly recurrence selector component.
textEditorComponent | ComponentType&lt;[AppointmentForm.TextEditorProps](#appointmentformtexteditorprops)&gt; | A component that renders the appointment form's text editor component.
dateEditorComponent | ComponentType&lt;[AppointmentForm.DateEditorProps](#appointmentformdateeditorprops)&gt; | A component that renders the appointment form's date editor component.
selectComponent | ComponentType&lt;[AppointmentForm.SelectProps](#appointmentformselectprops)&gt; | A component that renders the appointment form's select component.
labelComponent | ComponentType&lt;[AppointmentForm.LabelProps](#appointmentformlabelprops)&gt; | A component that renders the appointment form's text label component.
children? | ReactNode | A React node to be rendered in the Basic Layout.

### AppointmentForm.BooleanEditorProps

Properties passed to a component that renders the appointment form's boolean editor component.

Field | Type | Description
------|------|------------
label? | string | The boolean editor’s label text.
readOnly? | boolean | Specifies whether the boolean editor is read-only.
value? | boolean | A value to be edited.
onValueChange | (nextValue: boolean) => void | Handles value changes.

### AppointmentForm.CommandButtonProps

Properties passed to a component that renders the appointment form's command button component.

Field | Type | Description
------|------|------------
id | 'saveButton' &#124; 'deleteButton' &#124; 'cancelButton' | The command button's identifier.
onExecute | () => void | An event that initiates the command execution.
getMessage | (messageKey: string) => string | Returns a localization message by the message key.

### AppointmentForm.DateEditorProps

Properties passed to a component that renders the appointment form's date editor component.

Field | Type | Description
------|------|------------
readOnly? | boolean | Specifies whether the date editor is read-only.
value? | string &#124; number &#124; Date | A value to be edited.
onValueChange | (nextValue: Date) => void | Handles value changes.
locale? | string &#124; Array&lt;string&gt; | Specifies the locale date format that is a string holding a BCP 47 language tag, or an array of such strings.

### AppointmentForm.LabelProps

Properties passed to a component that renders the appointment form's text label component.

Field | Type | Description
------|------|------------
type? | 'titleLabel' &#124; 'ordinaryLabel' | The label's type.
text? | string | The label's text.

### AppointmentForm.RadioGroupProps

Properties passed to a component that renders the appointment form's radio group component.

Field | Type | Description
------|------|------------
appointmentData | [AppointmentModel](./scheduler.md#appointmentmodel) | Specifies the appointment’s data that the form displays.
locale? | string &#124; Array&lt;string&gt; | Specifies the locale date format that is a string holding a BCP 47 language tag, or an array of such strings.
formatDate | [FormatterFn](./scheduler.md#formatterfn) | A function that formats dates depending on locale.
onFieldChange | (nextFieldValue: { [fieldName: string]: any }) => void | Handles appointment field value changes.
readOnly? | boolean | Specifies whether the radio group is read-only.
type? | 'endRepeat' &#124; 'monthlyRadioGroup' &#124; 'yearlyRadioGroup' | The radio group's type.
getMessage | (messageKey: string) => string | Returns a localization message by the message key.
textEditorComponent | ComponentType&lt;[AppointmentForm.TextEditorProps](#appointmentformtexteditorprops)&gt; | A component that renders the appointment form's text editor component.
dateEditorComponent | ComponentType&lt;[AppointmentForm.DateEditorProps](#appointmentformdateeditorprops)&gt; | A component that renders the appointment form's date editor component.
selectComponent | ComponentType&lt;[AppointmentForm.SelectProps](#appointmentformselectprops)&gt; | A component that renders the appointment form's select component.
labelComponent | ComponentType&lt;[AppointmentForm.LabelProps](#appointmentformlabelprops)&gt; | A component that renders the appointment form's text label component.

### AppointmentForm.SelectProps

Properties passed to a component that renders the appointment form's select component.

Field | Type | Description
------|------|------------
value? | string &#124; number | A value to be edited.
onValueChange | (nextValue: string &#124; number) => void | Handles value changes.
availableOptions? | Array&lt;[Option](#option)&gt; | Specifies the options for select menu items.
type? | 'outlinedSelect' &#124; 'filledSelect' | The select's type.
readOnly | boolean | Specifies whether the select is read-only.

### AppointmentForm.TextEditorProps

Properties passed to a component that renders the appointment form's text editor component.

Field | Type | Description
------|------|------------
placeholder | string | A placeholder displayed inside the text field.
id | 'titleTextEditor' &#124; 'noteTextEditor' &#124; 'ordinaryTextEditor' &#124; 'numberEditor' | The text editor's type identifier.
readOnly | boolean | Specifies whether the text editor is read-only.
value | string &#124; number | A value to be edited.
onValueChange | (nextValue: string) => void | Handles value changes.

### AppointmentForm.WeeklyRecurrenceSelectorProps

Properties passed to a component that renders the appointment form's text editor component.

Field | Type | Description
------|------|------------
rRule | string | Specifies the appointment recurrence rule.
readOnly | boolean | Specifies whether the weekly recurrence selector is read-only.
formatDate | [FormatterFn](./scheduler.md#formatterfn) | A function that formats dates depending on locale.
onFieldChange | (nextFieldValue: { [fieldName: string]: any }) => void | Handles value changes.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
allDayLabel? | string | 'All Day' | The all day editor's label text.
titleLabel? | string | 'Title' | The title editor's label text.
startDateLabel? | string | 'Start Date' | The start date editor's label text.
endDateLabel? | string | 'End Date' | The end date editor's label text.
commitCommand? | string | 'Save' | The commit button's text.
moreInformationLabel? | string | 'More Information' | The more information editor’s label text.
repeatLabel? | string | Repeat | The repeat editor’s label text.
additionalInformationLabel? | string | 'Additional Information' | The additional information editor’s label text.
notesLabel? | string | 'Notes' | The notes editor’s label text.
never? | string | 'Never' | The never repeat type label text.
daily? | string | 'Daily' | The daily repeat type label text.
weekly? | string | 'Weekly' | The weekly repeat type label text.
monthly? | string | 'Monthly' | The monthly repeat type label text.
yearly? | string | 'Yearly' | The yearly repeat type label text.
repeatEveryLabel? | string | 'Repeat every' | The 'repeat every' label text.
daysLabel? | string | 'day(s)' | The 'days' label text.
endRepeatLabel? | string | 'End repeat' | The 'end repeat' label text.
onLabel? | string | 'On' | The 'on' label text.
afterLabel? | string | 'After' | The 'after' label text.
occurrencesLabel? | string | 'occurrence(s)' | The 'occurrences' label text.
weeksOnLabel? | string | 'week(s) on:' | The 'weeks on' label text.
monthsLabel? | string | 'month(s)' | The 'months' label text.
ofEveryMonthLabel? | string | 'of every month' | The 'of every month' label text.
theLabel? | string | 'The' | The 'the' label text.
firstLabel? | string | 'First' | The 'first' label text.
secondLabel? | string | 'Second' | The 'second' label text.
thirdLabel? | string | 'Third' | The 'third' label text.
fourthLabel? | string | 'Fourth' | The 'fourth' label text.
lastLabel? | string | 'Last' | The 'last' label text.
yearsLabel? | string | 'year(s)' | The 'years' label text.
ofLabel? | string | 'of' | The 'of' label text.
everyLabel? | string | 'Every' | The 'every' label text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AppointmentForm.Popup | [AppointmentForm.PopupProps](#appointmentformpopupprops) | A component that renders the appointment form's popup.
AppointmentForm.Container | [AppointmentForm.ContainerProps](#appointmentformcontainerprops) | A component that renders the appointment form's container.
AppointmentForm.ScrollableArea | [AppointmentForm.ScrollableAreaProps](#appointmentformscrollableareaprops) | A component that renders the appointment form's scrollable area.
AppointmentForm.StaticArea | [AppointmentForm.StaticAreaProps](#appointmentformstaticareaprops) | A component that renders the appointment form's static area.

Additional properties are added to a component's root element.
