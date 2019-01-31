# React Scheduler - Date Navigation

The React Scheduler component provides the `ViewState` and `DateNavigator` plugins to change the current date at runtime.

## Related Plugins

The following plugins implement date navigation feature:

- [ViewState](../reference/view-state.md) - manages a current date state
- [Toolbar](../reference/toolbar.md) - renders the Scheduler Toolbar
- [DateNavigator](../reference/date-navigator.md) - renders a date navigator control

## Basic Setup

Import the plugins listed above to enable a user to change the current date at runtime.

### Uncontrolled Mode

In uncontrolled mode, specify the initial current date in the `ViewState` plugin's `defaultCurrentDate` property.

.embedded-demo({ "path": "scheduler-date-navigator/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, pass the current date to the `ViewState` plugin's `currentDate` property and handle the `onCurrentDateChange` event to control the date externally.

.embedded-demo({ "path": "scheduler-date-navigator/controlled", "showThemeSelector": true })
