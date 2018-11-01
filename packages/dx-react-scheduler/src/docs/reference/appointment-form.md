# AppointmentForm Plugin Reference

The AppointmentForm plugin allows a user to show more information about current appointment also user can edit appointment by using the AppointmentForm plugin.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

## User reference

### Dependencies

- [EditingState](editing-state.md) [Optional]
- [Appointments](appointments.md) [Optional]
- [AppointmentTooltip](appointment-tooltip.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
popupComponent | ComponentType&lt;[AppointmentForm.PopupProps](#appointmentformpopupprops)&gt; | | A component that renders the appointment form popup.
containerComponent | ComponentType&lt;[AppointmentForm.ContainerProps](#appointmentformcontainerprops)&gt; | | A component that renders the appointment form container.
scrollableAreaComponent | ComponentType&lt;[AppointmentForm.ScrollableAreaProps](#appointmentformscrollableareaprops)&gt; | | A component that renders the appointment form container with scroll bar.
staticAreaComponent | ComponentType&lt;[AppointmentForm.StaticAreaProps](#appointmentformstaticareaprops)&gt; | | A component that renders the appointment form container without scroll bar.
visible? | boolean | | The property specifies the appointment form's visibility.
onVisibilityChange? | (visible: boolean) => void | | Handles change the `AppointmentForm` visibility.
appointmentData? | object | | The property specifies the appointment data that displays in form.
onAppointmentDataChange? | (appointmentData: object) => void | | Handles change the `appointmentData`.
readOnly? | boolean | false | The property specifies the appointment form's read only mode.
messages? | [AppointmentForm.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### AppointmentForm.PopupProps

Describes properties passed to a component that renders the appointment form popup.

Field | Type | Description
------|------|------------
visible? | boolean | Specifies whether the popup is visible.
children | ReactNode | A React node used to render popup content.

### AppointmentForm.ContainerProps

Describes properties passed to a component that renders the appointment form container.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render container content.

### AppointmentForm.ScrollableAreaProps

Describes properties passed to a component that renders the appointment form scrollable area.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render scrollable area content.

### AppointmentForm.StaticAreaProps

Describes properties passed to a component that renders the appointment form static area.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render static area content.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
allDayLabel? | string | 'All Day' | The all day editor's label text.
titleLabel? | string | 'Title' | The title editor's label text.
startDateLabel? | string | 'Start Date' | The start date editor's label text.
endDateLabel? | string | 'End Date' | The end date editor's label text.
commitCommand? | string | 'Save' | The commit button's text.
cancelCommand? | string | 'Cancel' | The cancel button's text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AppointmentForm.Popup | [AppointmentForm.PopupProps](#appointmentformpopupprops) | A component that renders the appointment form popup.
AppointmentForm.Container | [AppointmentForm.ContainerProps](#appointmentformcontainerprops) | A component that renders the appointment form container.
AppointmentForm.ScrollableArea | [AppointmentForm.ScrollableAreaProps](#appointmentformscrollableareaprops) | A component that renders a appointment form container with scroll bar.
AppointmentForm.StaticArea | [AppointmentForm.StaticAreaProps](#appointmentformstaticareaprops) | A component that renders the appointment form container without scroll bar.

Additional properties are added to a component's root element.
