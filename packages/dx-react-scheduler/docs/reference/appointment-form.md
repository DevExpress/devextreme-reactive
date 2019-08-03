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
- [EditingMenu](editing-menu.md) [Optional]
- [IntegratedEditing](integrated-editing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
visible? | boolean | | Specifies the appointment form's visibility.
onVisibilityChange? | (visible: boolean) => void | | Handles changes to the appointment form's visibility.
appointmentData? | [AppointmentModel](./scheduler.md#appointmentmodel) | | Specifies the appointment's data that the form displays.
onAppointmentDataChange? | (appointmentData: [AppointmentModel](./scheduler.md#appointmentmodel)) => void | | Handles changes to the appointment's data.
readOnly? | boolean | false | Specifies the appointment form is read-only.
popupComponent | ComponentType&lt;[AppointmentForm.PopupProps](#appointmentformpopupprops)&gt; | | A component that renders the appointment form's popup.
containerComponent | ComponentType&lt;[AppointmentForm.ContainerProps](#appointmentformcontainerprops)&gt; | | A component that renders the appointment form's container.
scrollableAreaComponent | ComponentType&lt;[AppointmentForm.ScrollableAreaProps](#appointmentformscrollableareaprops)&gt; | | A component that renders the appointment form's scrollable area.
staticAreaComponent | ComponentType&lt;[AppointmentForm.StaticAreaProps](#appointmentformstaticareaprops)&gt; | | A component that renders the appointment form's static area.
messages? | [AppointmentForm.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### AppointmentForm.PopupProps

Properties passed to a component that renders the appointment form's popup.

Field | Type | Description
------|------|------------
visible? | boolean | Specifies whether the popup is visible.
children | ReactNode | A React node used to render the popup content.

### AppointmentForm.ContainerProps

Properties passed to a component that renders the appointment form's container.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the container content.

### AppointmentForm.ScrollableAreaProps

Properties passed to a component that renders the appointment form's scrollable area.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the scrollable area content.

### AppointmentForm.StaticAreaProps

Properties passed to a component that renders the appointment form's static area.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the static area content.

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
AppointmentForm.Popup | [AppointmentForm.PopupProps](#appointmentformpopupprops) | A component that renders the appointment form's popup.
AppointmentForm.Container | [AppointmentForm.ContainerProps](#appointmentformcontainerprops) | A component that renders the appointment form's container.
AppointmentForm.ScrollableArea | [AppointmentForm.ScrollableAreaProps](#appointmentformscrollableareaprops) | A component that renders the appointment form's scrollable area.
AppointmentForm.StaticArea | [AppointmentForm.StaticAreaProps](#appointmentformstaticareaprops) | A component that renders the appointment form's static area.

Additional properties are added to a component's root element.
