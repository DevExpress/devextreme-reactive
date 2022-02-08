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
commandLayoutComponent | ComponentType&lt;[AppointmentForm.CommandLayoutProps](#appointmentformcommandlayoutprops)&gt; | | A component that renders a layout for command buttons.
basicLayoutComponent | ComponentType&lt;[AppointmentForm.BasicLayoutProps](#appointmentformbasiclayoutprops)&gt; | | A component that renders a layout for editors that edit basic appoinement data.
recurrenceLayoutComponent | ComponentType&lt;[AppointmentForm.RecurrenceLayoutProps](#appointmentformrecurrencelayoutprops)&gt; | | A component that renders a layout for editors that specify the appointment's recurrence.
commandButtonComponent | ComponentType&lt;[AppointmentForm.CommandButtonProps](#appointmentformcommandbuttonprops)&gt; | | A component that renders a command button.
textEditorComponent | ComponentType&lt;[AppointmentForm.TextEditorProps](#appointmentformtexteditorprops)&gt; | | A component that renders a text editor.
dateEditorComponent | ComponentType&lt;[AppointmentForm.DateEditorProps](#appointmentformdateeditorprops)&gt; | | A component that renders a date-time editor.
labelComponent | ComponentType&lt;[AppointmentForm.LabelProps](#appointmentformlabelprops)&gt; | | A component that renders a text label.
booleanEditorComponent | ComponentType&lt;[AppointmentForm.BooleanEditorProps](#appointmentformbooleaneditorprops)&gt; | | A component that renders an editor of Boolean values.
selectComponent | ComponentType&lt;[AppointmentForm.SelectProps](#appointmentformselectprops)&gt; | | A component that renders an options menu.
radioGroupComponent | ComponentType&lt;[AppointmentForm.RadioGroupProps](#appointmentformradiogroupprops)&gt; | | A component that renders a radio group.
resourceEditorComponent | ComponentType&lt;[AppointmentForm.ResourceEditorProps](#appointmentformresourceeditorprops)&gt; | | A component that renders a resource editor.
weeklyRecurrenceSelectorComponent | ComponentType&lt;[AppointmentForm.WeeklyRecurrenceSelectorProps](#appointmentformweeklyrecurrenceselectorprops)&gt; | | A component that renders a weekly recurrence selector.

## Interfaces

### SelectOption

An option in the Select editor.

Field | Type | Description
------|------|------------
id | string &#124; number | The option's id.
text | string | The option's text.

### AppointmentForm.OverlayProps

Properties passed to a component that renders the appointment form's overlay.

Field | Type | Description
------|------|------------
visible? | boolean | Specifies whether the overlay is visible.
onHide | () => void | An event raised when the overlay hides.
fullSize | boolean | Specifies whether the overlay is full-size.
target | RefObject | A React component instance or a DOM element that is used to position the overlay.
children | ReactNode | A React node used to render the overlay content.

### AppointmentForm.LayoutProps

Properties passed to a component that renders the appointment form's layout.

Field | Type | Description
------|------|------------
commandLayoutComponent | ComponentType&lt;[AppointmentForm.CommandLayoutProps](#appointmentformcommandlayoutprops)&gt; | A component that renders a layout for command buttons.
basicLayoutComponent | ComponentType&lt;[AppointmentForm.BasicLayoutProps](#appointmentformbasiclayoutprops)&gt; |  A component that renders a layout for editors that edit basic appoinement data.
recurrenceLayoutComponent | ComponentType&lt;[AppointmentForm.RecurrenceLayoutProps](#appointmentformrecurrencelayoutprops)&gt; | A component that renders a layout for editors that specify the appointment's recurrence.
isRecurrence | boolean | Specifies whether recurrence editors should be rendered.
children? | ReactNode | A React node used to render additional components to the layout.

### AppointmentForm.CommandLayoutProps

Properties passed to a component that renders a layout for command buttons.

Field | Type | Description
------|------|------------
readOnly? | boolean | Specifies whether the appointment form is read-only.
fullSize | boolean | Specifies whether the command layout is full-size.
disableSaveButton? | boolean | Specifies whether to disable the Save button.
hideDeleteButton? | boolean | Specifies whether to hide the Delete button.
onCommitButtonClick | () => void | An event raised when the Commit button is clicked. The event handler should commit appointment changes.
onCancelButtonClick | () => void | An event raised when the Cancel button is clicked. The event handler should close the appointment form.
onDeleteButtonClick | () => void | An event raised when the Delete button is clicked. The event handler should delete an appointment.
getMessage | (messageKey: string) => string | Uses a localization message's key to retrieve the message.
commandButtonComponent | ComponentType&lt;[AppointmentForm.CommandButtonProps](#appointmentformcommandbuttonprops)&gt; | A component that renders a command button.
children? | ReactNode | A React node used to render additional components to the Command layout.

### AppointmentForm.BasicLayoutProps

Properties passed to a component that renders a layout for editors that edit basic appointment data.

Field | Type | Description
------|------|------------
readOnly? | boolean | Specifies whether the appointment form is read-only.
appointmentData | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment's data.
appointmentResources | Array&lt;[ValidResourceInstance](./resources.md#validresourceinstance)&gt; | The appointment's resource instances.
resources | Array&lt;[ValidResource](./resources.md#validresource)&gt; | All resources.
onFieldChange | (nextFieldValue: { [fieldName: string]: any }) => void | An event that is raised when a field value in the appointment form is changed.
getMessage | (messageKey: string) => string | Uses a localization message's key to retrieve the message.
locale | string &#124; Array&lt;string&gt; | Specifies the locale as an IETF BCP 47 language tag or an array of such tags. The locale is used to format date-time values.
fullSize | boolean | Specifies whether the layout is full-size.
textEditorComponent | ComponentType&lt;[AppointmentForm.TextEditorProps](#appointmentformtexteditorprops)&gt; | A component that renders a text editor.
dateEditorComponent | ComponentType&lt;[AppointmentForm.DateEditorProps](#appointmentformdateeditorprops)&gt; | A component that renders a date-time editor.
booleanEditorComponent | ComponentType&lt;[AppointmentForm.BooleanEditorProps](#appointmentformbooleanteditorprops)&gt; | A component that renders an editor of Boolean values.
selectComponent | ComponentType&lt;[AppointmentForm.SelectProps](#appointmentformselectprops)&gt; | A component that renders an options menu.
labelComponent | ComponentType&lt;[AppointmentForm.LabelProps](#appointmentformlabelprops)&gt; | A component that renders a text label.
resourceEditorComponent | ComponentType&lt;[AppointmentForm.ResourceEditorProps](#appointmentformresourceeditorprops)&gt; | | A component that renders a resource editor.
children? | ReactNode | A React node used to render additional components to the Basic Layout.

### AppointmentForm.RecurrenceLayoutProps

Properties passed to a component that renders the appointment form's layout for editors that edit the appointment's recurrence.

Field | Type | Description
------|------|------------
readOnly? | boolean | Specifies whether the appointment form is read-only.
visible | boolean | Specifies whether the layout is visible.
appointmentData | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment's data.
onFieldChange | (nextFieldValue: { [fieldName: string]: any }) => void | An event that is raised when a field value in the appointment form is changed.
getMessage | (messageKey: string) => string | Uses a localization message's key to retrieve the message.
locale | string &#124; Array&lt;string&gt; | Specifies the locale as an IETF BCP 47 language tag or an array of such tags. The locale is used to format date-time values.
firstDayOfWeek | number | A number between 0 (Sunday) and 6 (Saturday) that specifies the first day of the week.
formatDate | [FormatterFn](./scheduler.md#formatterfn) | A function that formats dates based on the locale.
radioGroupComponent | ComponentType&lt;[AppointmentForm.RadioGroupProps](#appointmentformradiogroupprops)&gt; | A component that renders a radio group.
weeklyRecurrenceSelectorComponent | ComponentType&lt;[AppointmentForm.WeeklyRecurrenceSelectorProps](#appointmentformweeklyrecurrenceselectorprops)&gt; | A component that renders a weekly recurrence selector.
textEditorComponent | ComponentType&lt;[AppointmentForm.TextEditorProps](#appointmentformtexteditorprops)&gt; | A component that renders a text editor.
dateEditorComponent | ComponentType&lt;[AppointmentForm.DateEditorProps](#appointmentformdateeditorprops)&gt; | A component that renders a date-time editor.
selectComponent | ComponentType&lt;[AppointmentForm.SelectProps](#appointmentformselectprops)&gt; | A component that renders an options menu.
labelComponent | ComponentType&lt;[AppointmentForm.LabelProps](#appointmentformlabelprops)&gt; | A component that renders a text label.
children? | ReactNode | A React node used to render additional components to the Recurrence Layout.

### AppointmentForm.BooleanEditorProps

Properties passed to a component that renders a Boolean value editor on the appointment form.

Field | Type | Description
------|------|------------
label? | string | The editor's text label.
readOnly? | boolean | Specifies whether the editor is read-only.
value? | boolean | The editor's value.
onValueChange | (nextValue: boolean) => void | Handles value changes.

### AppointmentForm.CommandButtonProps

Properties passed to a component that renders a command button on the appointment form.

Field | Type | Description
------|------|------------
id | `saveButton` &#124; `deleteButton` &#124; `cancelButton` | The command button's identifier.
onExecute | () => void | An event that initiates the command execution.
getMessage | (messageKey: string) => string | Uses a localization message's key to retrieve the message.

### AppointmentForm.DateEditorProps

Properties passed to a component that renders a date-time editor on the appointment form.

Field | Type | Description
------|------|------------
readOnly? | boolean | Specifies whether the date editor is read-only.
value? | string &#124; number &#124; Date | The editor's value.
excludeTime? | boolean | When true, users cannot edit the time.
onValueChange | (nextValue: Date) => void | Handles value changes.
locale? | string &#124; Array&lt;string&gt; | Specifies the locale as an IETF BCP 47 language tag or an array of such tags. The locale is used to format date-time values.

### AppointmentForm.LabelProps

Properties passed to a component that renders a text label on the appointment form.

Field | Type | Description
------|------|------------
type? | `titleLabel` &#124; `ordinaryLabel` | The label's type.
text? | string | The label's text.

### AppointmentForm.RadioGroupProps

Properties passed to a component that renders a radio group on the appointment form.

Field | Type | Description
------|------|------------
appointmentData | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment's data.
firstDayOfWeek | number | A number between 0 (Sunday) and 6 (Saturday) that specifies the first day of the week.
locale? | string &#124; Array&lt;string&gt; | Specifies the locale as an IETF BCP 47 language tag or an array of such tags. The locale is used to format date-time values.
formatDate | [FormatterFn](./scheduler.md#formatterfn) | A function that formats dates based on the locale.
onFieldChange | (nextFieldValue: { [fieldName: string]: any }) => void | An event that is raised when a field value in the appointment form is changed.
readOnly? | boolean | Specifies whether the radio group is read-only.
type? | `endRepeat` &#124; `monthlyRadioGroup` &#124; `yearlyRadioGroup` | The radio group's type.
getMessage | (messageKey: string) => string | Uses a localization message's key to retrieve the message.
textEditorComponent | ComponentType&lt;[AppointmentForm.TextEditorProps](#appointmentformtexteditorprops)&gt; | A component that renders a text editor.
dateEditorComponent | ComponentType&lt;[AppointmentForm.DateEditorProps](#appointmentformdateeditorprops)&gt; | A component that renders a date-time editor.
selectComponent | ComponentType&lt;[AppointmentForm.SelectProps](#appointmentformselectprops)&gt; | A component that renders an options menu.
labelComponent | ComponentType&lt;[AppointmentForm.LabelProps](#appointmentformlabelprops)&gt; | A component that renders a text label.

### AppointmentForm.SelectProps

Properties passed to a component that renders a menu of options on the appointment form.

Field | Type | Description
------|------|------------
value? | string &#124; number | The selected option.
onValueChange | (nextValue: string &#124; number) => void | Handles value changes.
availableOptions? | Array&lt;[SelectOption](#selectoption)&gt; | Specifies available menu options.
type? | `outlinedSelect` &#124; `filledSelect` | The menu's type.
readOnly | boolean | Specifies whether the menu is read-only.

### AppointmentForm.ResourceEditorProps

Properties passed to a component that renders a resource editor on the appointment form.

Field | Type | Description
------|------|------------
appointmentResources? | Array&lt;[ValidResourceInstance](./resources.md#validresourceinstance)&gt; | The appointment's resource instances.
resource? | [ValidResource](./resources.md#validresource) | A resource being edited.
onResourceChange? | ({ [fieldName: string]: string &#124; number }) => void | A function that is called when the resource is edited.
readOnly? | boolean | Specifies whether the resource editor is read-only.

### AppointmentForm.TextEditorProps

Properties passed to a component that renders a text editor on the appointment form.

Field | Type | Description
------|------|------------
placeholder | string | A placeholder displayed inside the text field.
type | `titleTextEditor` &#124; `noteTextEditor` &#124; `ordinaryTextEditor` &#124; `numberEditor` | The text editor's type.
readOnly | boolean | Specifies whether the text editor is read-only.
value | string &#124; number | The editor's value.
onValueChange | (nextValue: string) => void | Handles value changes.

### AppointmentForm.WeeklyRecurrenceSelectorProps

Properties passed to a component that renders a weekly recurrence selector on the appointment form.

Field | Type | Description
------|------|------------
rRule | string | Specifies the recurrence rule.
firstDayOfWeek | number | A number between 0 (Sunday) and 6 (Saturday) that specifies the first day of the week.
readOnly | boolean | Specifies whether the weekly recurrence selector is read-only.
formatDate | [FormatterFn](./scheduler.md#formatterfn) | A function that formats dates based on the locale.
onValueChange | (nextFieldValue: { [fieldName: string]: any }) => void | Handles value changes.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
detailsLabel? | string | `Details` | The "Details" label text.
allDayLabel? | string | `All Day` | The "All Day" editor's label text.
titleLabel? | string | `Title` | The "Title" editor's label text.
commitCommand? | string | `Save` | The commit button's text.
moreInformationLabel? | string | `More Information` | The "More Information" editor’s label text.
repeatLabel? | string | `Repeat` | The "Repeat" editor’s label text.
notesLabel? | string | `Notes` | The "Notes" editor’s label text.
never? | string | `Never` | The "Never" label text.
daily? | string | `Daily` | The "Daily" label text.
weekly? | string | `Weekly` | The "Weekly" label text.
monthly? | string | `Monthly` | The "Monthly" label text.
yearly? | string | `Yearly` | The "Yearly" label text.
repeatEveryLabel? | string | `Repeat every` | The "Repeat every" label text.
daysLabel? | string | `day(s)` | The "day(s)" label text.
endRepeatLabel? | string | `End repeat` | The "End repeat" label text.
onLabel? | string | `On` | The "On" label text.
afterLabel? | string | `After` | The "After" label text.
occurrencesLabel? | string | `occurrence(s)` | The "Occurrences" label text.
weeksOnLabel? | string | `week(s) on:` | The "week(s) on:" label text.
monthsLabel? | string | `month(s)` | The "month(s)" label text.
ofEveryMonthLabel? | string | `of every month` | The "of every month" label text.
theLabel? | string | `The` | The "The" label text.
firstLabel? | string | `First` | The "First" label text.
secondLabel? | string | `Second` | The "Second" label text.
thirdLabel? | string | `Third` | The "Third" label text.
fourthLabel? | string | `Fourth` | The "Fourth" label text.
lastLabel? | string | `Last` | The "Last" label text.
yearsLabel? | string | `year(s)` | The "year(s)" label text.
ofLabel? | string | `of` | The "of" label text.
everyLabel? | string | `Every` | The "Every" label text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AppointmentForm.Overlay |  [AppointmentForm.OverlayProps](#appointmentformoverlayprops) | A component that renders the appointment form's overlay.
AppointmentForm.Layout | [AppointmentForm.LayoutProps](#appointmentformlayoutprops) | A component that renders the appointment form's layout.
AppointmentForm.CommandLayout | [AppointmentForm.CommandLayoutProps](#appointmentformcommandlayoutprops) | A component that renders a layout for command buttons.
AppointmentForm.BasicLayout | [AppointmentForm.BasicLayoutProps](#appointmentformbasiclayoutprops) | A component that renders a layout for editors that edit basic appointment data.
AppointmentForm.RecurrenceLayout | [AppointmentForm.RecurrenceLayoutProps](#appointmentformrecurrencelayoutprops) | A component that renders a layout for editors that specify the appointment's recurrence.
AppointmentForm.TextEditor | [AppointmentForm.TextEditorProps](#appointmentformtexteditorprops) | A component that renders a text editor.
AppointmentForm.DateEditor | [AppointmentForm.DateEditorProps](#appointmentformdateeditorprops) | A component that renders a date-time editor.
AppointmentForm.Label | [AppointmentForm.LabelProps](#appointmentformlabelprops) | A component that renders a text label.
AppointmentForm.BooleanEditor | [AppointmentForm.BooleanEditorProps](#appointmentformbooleaneditorprops) | A component that renders a Boolean value editor.
AppointmentForm.Select | [AppointmentForm.SelectProps](#appointmentformselectprops) | A component that renders an options menu.
AppointmentForm.RadioGroup | [AppointmentForm.RadioGroupProps](#appointmentformradiogroupprops) | A component that renders a radio group.
AppointmentForm.WeeklyRecurrenceSelector | [AppointmentForm.WeeklyRecurrenceSelectorProps](#appointmentformweeklyrecurrenceselectorprops) | A component that renders a weekly recurrence selector.

Additional properties are added to a component's root element.
