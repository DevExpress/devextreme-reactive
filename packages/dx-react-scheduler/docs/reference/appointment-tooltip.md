# AppointmentTooltip Plugin Reference

The AppointmentTooltip plugin allows to display a short information about appointment in tooltip form.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler';
```

## User reference

### Dependencies

- [Appointments](appointments.md)
- [EditingState](editing-state.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
showOpenButton | boolean | false | Allow to display the tooltip open button.
showCloseButton | boolean | false | Allow to display the tooltip close button.
showDeleteButton | boolean | false | Allow to display the tooltip delete button.
visible | boolean | | Specifies the appointment tooltip visibility.
appointmentMeta | [AppointmentMeta](#appointmentmeta) | | Specifies the appointment tooltip meta data that should be display.
onVisibilityChange | (visible: boolean) => void | | Handles change the `AppointmentTooltip` visibility.
onAppointmentMetaChange | (appointmentMeta: [AppointmentMeta](#appointmentmeta)) => void | | Handles change the `AppointmentTooltip` appointment meta data.
layoutComponent | ComponentType&lt;[AppointmentTooltip.LayoutProps](#appointmenttooltiplayoutprops)&gt; | | A component that renders the appointment tooltip layout.
headerComponent | ComponentType&lt;[AppointmentTooltip.HeaderProps](#appointmenttooltipheaderprops)&gt; | | A component that renders the appointment tooltip header.
contentComponent | ComponentType&lt;[AppointmentTooltip.ContentProps](#appointmenttooltipcontentprops)&gt; | | A component that renders the appointment tooltip content.
commandButtonComponent | ComponentType&lt;[AppointmentTooltip.CommandButtonProps](#appointmenttooltipcommandbuttonprops)&gt; | | A component that renders the appointment tooltip command button.

## Interfaces

### AppointmentTooltip.LayoutProps

Describes properties passed to a component that renders the appointment tooltip layout.

Field | Type | Description
------|------|------------
headerComponent | ComponentType&lt;[AppointmentTooltip.HeaderProps](#appointmenttooltipheaderprops)&gt; | A component that renders the appointment tooltip header.
contentComponent | ComponentType&lt;[AppointmentTooltip.ContentProps](#appointmenttooltipcontentprops)&gt; | A component that renders the appointment tooltip content.
commandButtonComponent | ComponentType&lt;[AppointmentTooltip.CommandButtonProps](#appointmenttooltipcommandbuttonprops)&gt; | A component that renders the appointment tooltip command button.
showOpenButton | boolean | Allow to display the tooltip open button.
showCloseButton | boolean | Allow to display the tooltip close button.
showDeleteButton | boolean | Allow to display the tooltip delete button.
commandButtonIds | Array&lt;string&gt; | A list of command button identifiers.
mapAppointmentData | () => [Scheduler.MapAppointmentData](./scheduler/#schedulermapappointmentdata) | Map function used to get an appointment fields.
onOpenButtonClick | () => void | An event that initiates open appointment form.
onDeleteButtonClick | () => void | An event that initiates delete an appointment.
appointmentMeta | [AppointmentMeta](#appointmentmeta) | Specifies the appointment tooltip meta data that should be display.
visible | boolean | Specifies the appointment tooltip visibility.
onHide | () => void | An event that initiates layout hiding.
children | ReactNode | A React node used to render layout content.

### AppointmentTooltip.HeaderProps

Describes properties passed to a component that renders the appointment tooltip header.

Field | Type | Description
------|------|------------
appointmentData | object | Specifies the appointment tooltip meta data that should be display.
children | ReactNode | A React node used to render appointment tooltip header.

### AppointmentTooltip.ContentProps

Describes properties passed to a component that renders the appointment tooltip content.

Field | Type | Description
------|------|------------
appointmentData | object | Specifies the appointment tooltip meta data that should be display.
children | ReactNode | A React node used to render appointment tooltip content.

### AppointmentTooltip.CommandButtonProps

Describes properties passed to a component that renders the appointment tooltip command button.

Field | Type | Description
------|------|------------
id | `open` &#124; `delete` &#124; `close` | The command identifier.
onExecute | () => void | An event initiating the command execution.

### AppointmentMeta

An object representing a appointment tooltip meta data.

Field | Type | Description
------|------|------------
target | ReactInstance | A React component instance or a DOM element that is used for appointment tooltip positioning.
data | object | Specifies a appointment data for display in appointment tooltip.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AppointmentTooltip.Layout | ComponentType&lt;[AppointmentTooltip.LayoutProps](#appointmenttooltiplayoutprops)&gt; | A component that renders the appointment tooltip layout.
AppointmentTooltip.Header | ComponentType&lt;[AppointmentTooltip.HeaderProps](#appointmenttooltipheaderprops)&gt; | A component that renders the appointment tooltip header.
AppointmentTooltip.Content | ComponentType&lt;[AppointmentTooltip.ContentProps](#appointmenttooltipcontentprops)&gt; | A component that renders the appointment tooltip content.
AppointmentTooltip.CommandButton | ComponentType&lt;[AppointmentTooltip.CommandButtonProps](#appointmenttooltipcommandbuttonprops)&gt; | A component that renders the appointment tooltip command button.

Additional properties are added to a component's root element.
