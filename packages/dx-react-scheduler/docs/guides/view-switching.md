# React Scheduler - View Switching

The React Scheduler component allows a user to switch between views at runtime.

## Related Plugins

The following plugins implement this feature:

- [ViewSwitcher](../reference/view-switcher.md) - renders the view switcher
- [ViewState](../reference/view-state.md) - manages the current view's state
- [Toolbar](../reference/toolbar.md) - renders the Toolbar

## Basic Setup

Import the plugins listed above to enable a user to switch between views at runtime.

### Uncontrolled Mode

In uncontrolled mode, use the `ViewState` plugin's `defaultCurrentViewName` property to specify the initial view:

.embedded-demo({ "path": "scheduler-view-switcher/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, use the `ViewState` plugin's `currentViewName` property to specify the view and handle the `onCurrentViewNameChange` event to control the view's state externally. Use the `name` property to specify the view's unique identifier and the `displayName` property to specify the view's display name:

.embedded-demo({ "path": "scheduler-view-switcher/controlled", "showThemeSelector": true })

## Control the View Externally

Define the `ViewState` plugin's `currentViewName` property. The `ViewSwitcher` plugin is not required in this case:

.embedded-demo({ "path": "scheduler-view-switcher/external-control", "showThemeSelector": true })
