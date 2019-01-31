# React Scheduler - Date Navigation

The React Scheduler component with the `ViewState` and `DateNavigator` plugins allows to change current date at runtime.

## Related Plugins

The following plugins implement date navigation feature:

- [ViewState](../reference/view-state.md) - manages a current date state
- [Toolbar](../reference/toolbar.md) - renders the Scheduler Toolbar
- [DateNavigator](../reference/date-navigator.md) - renders a date navigator control

## Basic Setup

Import the plugins listed above to enable a user to change current date at runtime.

## Uncontrolled Mode

In the uncontrolled mode, specify the initial current date value in the `ViewState` plugin’s `defaultCurrentDate` property.

.embedded-demo({ "path": "scheduler-date-navigator/uncontrolled", "showThemeSelector": true })

## Controlled Mode

In the controlled mode, pass the current date to the `ViewState` plugin’s `currentDate` property and handle the `onCurrentDateChange` event to control the view date state externally.

.embedded-demo({ "path": "scheduler-date-navigator/controlled", "showThemeSelector": true })
