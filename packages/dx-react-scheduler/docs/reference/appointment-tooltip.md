# AppointmentTooltip Plugin Reference

The `AppointmentTooltip` plugin allows you to display information about an appointment in a tooltip.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler';
```

## User reference

### Dependencies

- [Appointments](appointments.md)
- [EditingState](editing-state.md) [Optional]
- [EditRecurrenceMenu](edit-recurrence-menu.md) [Optional]
- [IntegratedEditing](integrated-editing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
showOpenButton? | boolean | false | Specifies the Open button's visibility.
showCloseButton? | boolean | false | Specifies the Close button's visibility.
showDeleteButton? | boolean | false | Specifies the Delete button's visibility.
visible? | boolean | | Specifies the tooltip's visibility.
appointmentMeta? | [AppointmentMeta](#appointmentmeta) | | The appointment's displayed metadata.
onVisibilityChange? | (visible: boolean) => void | | Handles the tooltip's visibility chages.
onAppointmentMetaChange? | (appointmentMeta: [AppointmentMeta](#appointmentmeta)) => void | | Handles the meta data changes.
layoutComponent | ComponentType&lt;[AppointmentTooltip.LayoutProps](#appointmenttooltiplayoutprops)&gt; | | A component that renders the tooltip layout.
headerComponent | ComponentType&lt;[AppointmentTooltip.HeaderProps](#appointmenttooltipheaderprops)&gt; | | A component that renders the header.
contentComponent | ComponentType&lt;[AppointmentTooltip.ContentProps](#appointmenttooltipcontentprops)&gt; | | A component that renders the tooltip content.
commandButtonComponent | ComponentType&lt;[AppointmentTooltip.CommandButtonProps](#appointmenttooltipcommandbuttonprops)&gt; | | A component that renders a command button.

## Interfaces

### AppointmentMeta

An appointment's meta data object.

Field | Type | Description
------|------|------------
target | ReactInstance | A React component instance or a DOM element that is used to position the tooltip.
data | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment's displayed metadata.

### AppointmentTooltip.LayoutProps

Describes properties passed to a component that renders a tooltip layout.

Field | Type | Description
------|------|------------
showOpenButton | boolean | Specifies the Open button's visibility.
showCloseButton | boolean | Specifies the Close button's visibility.
showDeleteButton | boolean | Specifies the Delete button's visibility.
commandButtonIds | Array&lt;string&gt; | A command button's identifier list.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the locale.
onOpenButtonClick? | () => void | An event raised when the Open button is clicked. The event handler should open the appointment form.
onDeleteButtonClick? | () => void | An event raised when the Open button is clicked. The event handler should delete an appointment.
appointmentMeta? | [AppointmentMeta](#appointmentmeta) | The appointment's displayed metadata.
visible? | boolean | Specifies the tooltip's visibility.
onHide? | () => void | An event that hides the tooltip.
headerComponent | ComponentType&lt;[AppointmentTooltip.HeaderProps](#appointmenttooltipheaderprops)&gt; | A component that renders the tooltip header.
contentComponent | ComponentType&lt;[AppointmentTooltip.ContentProps](#appointmenttooltipcontentprops)&gt; | A component that renders the tooltip content.
commandButtonComponent | ComponentType&lt;[AppointmentTooltip.CommandButtonProps](#appointmenttooltipcommandbuttonprops)&gt; | A component that renders a command button.

### AppointmentTooltip.HeaderProps

Describes properties passed to a component that renders the tooltip header.

Field | Type | Description
------|------|------------
appointmentData? | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment's displayed metadata.
children? | ReactNode | A React node used to render the tooltip header.

### AppointmentTooltip.ContentProps

Describes properties passed to a component that renders the tooltip content.

Field | Type | Description
------|------|------------
appointmentData? | [AppointmentModel](./scheduler.md#appointmentmodel) | The appointment's displayed metadata.
children? | ReactNode | A React node used to render the tooltip content.

### AppointmentTooltip.CommandButtonProps

Describes properties passed to a component that renders a command button.

Field | Type | Description
------|------|------------
id? | `open` &#124; `delete` &#124; `close` | The command identifier.
onExecute? | () => void | An event that executes the command.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AppointmentTooltip.Layout | [AppointmentTooltip.LayoutProps](#appointmenttooltiplayoutprops) | A component that renders the tooltip layout.
AppointmentTooltip.Header | [AppointmentTooltip.HeaderProps](#appointmenttooltipheaderprops) | A component that renders the tooltip header.
AppointmentTooltip.Content | [AppointmentTooltip.ContentProps](#appointmenttooltipcontentprops) | A component that renders the tooltip content.
AppointmentTooltip.CommandButton | [AppointmentTooltip.CommandButtonProps](#appointmenttooltipcommandbuttonprops) | A component that renders a command button.

Additional properties are added to a component's root element.
