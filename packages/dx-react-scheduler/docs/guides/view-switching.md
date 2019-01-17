# React Scheduler - View Switching

The React Scheduler component with the `ViewState` and `ViewSwitcher` plugins provides the capability to switch between views at runtime.

## Related Plugins

The following plugins implement view switching feature:

- [ViewState](../reference/view-state.md) - manages a current view state
- [ViewSwitcher](../reference/view-switcher.md) - renders a view switcher control

## Basic Setup

Import the plugins listed above to enable a user to switch between views at runtime.

### Uncontrolled Mode

In the uncontrolled mode, specify the initial view name value in the `ViewState` plugin’s `defaultCurrentViewName` property.

.embedded-demo({ "path": "scheduler-view-switcher/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In the controlled mode, pass the view name option to the `ViewState` plugin’s `currentViewName` property and handle the `onCurrentViewNameChange` event to control the view state externally.

.embedded-demo({ "path": "scheduler-view-switcher/controlled", "showThemeSelector": true })

## External Control

To control the view state externally define the `ViewState` plugin's `currentViewName` property without adding the `ViewSwitching` plugin.

.embedded-demo({ "path": "scheduler-view-switcher/external-control", "showThemeSelector": true })
