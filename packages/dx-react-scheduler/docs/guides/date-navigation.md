# React Scheduler - Date Navigation

The React Scheduler component provides the `ViewState` and `DateNavigator` plugins to change the current date at runtime.

## Related Plugins

- [ViewState](../reference/view-state.md) - manages the state that stores the current date
- [Toolbar](../reference/toolbar.md) - renders the toolbar
- [DateNavigator](../reference/view-switcher.md) - renders the date navigator

## Basic Setup

Import the plugins listed above to enable a user to change the current date at runtime.

### Uncontrolled Mode

In uncontrolled mode, specify the initial current date in the `ViewState` plugin's `defaultCurrentDate` property.

.embedded-demo({ "path": "scheduler-date-navigator/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, pass the current date to the `ViewState` plugin's `currentDate` property and handle the `onCurrentDateChange` event to control the date externally.

.embedded-demo({ "path": "scheduler-date-navigator/controlled", "showThemeSelector": true })
