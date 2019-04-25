# React Grid - Controlled (Stateless) and Uncontrolled (Stateful) Modes

The Grid UI plugins typically render only a part of the whole Grid's state. The plugins automatically manage that part of the state or leave this job to the state management plugins (the plugins whose name ends with "...State"). In uncontrolled (stateful) mode, UI or state management plugins manage the state internally. In controlled (stateless) mode, the state is managed externally via the plugins' props.

## Controlled Mode

In controlled mode, the Grid's state is managed externally (for example, in the parent component, Redux store, etc.). Refer to the [React documentation](https://facebook.github.io/react/docs/forms.html#controlled-components) for more information about the controlled components concept.

This mode allows you to access the Grid's state from other application parts. For example, you can persist the state and restore it when required, or change it via an external UI.

Use the appropriate state management plugin properties to set the Grid's configuration and handle configuration changes a user makes via the Grid's UI. In the example below, sorting configuration is passed to the `SortingState` plugin's `sorting` property, and the function passed to the `onSortingChanged` property handles the sorting configuration changes.

.embedded-demo({ "path": "grid-sorting/controlled-mode", "showThemeSelector": true })

If you need to apply a new configuration to the Grid, update the parent component state using the `setState` method.

Note that all the state management plugins use a serializable state. This means that you can persist it in a [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) or any other storage that can store string values.

## Uncontrolled Mode

In uncontrolled state mode, the Grid component manages its state internally. In this case, you should only add the required state management plugins and optionally define the initial configuration using properties with the `default` prefix (for example, the `SortingState` plugin's `defaultSorting` property).

.embedded-demo({ "path": "grid-sorting/header-sorting", "showThemeSelector": true })

## Partially Controlled Mode

You can control only certain parts of the Grid's configuration. In this case, apply the [controlled mode](#controlled-mode) only to plugins whose state you want to control externally and the [uncontrolled mode](#uncontrolled-mode) to other plugins.

.embedded-demo({ "path": "grid-selection/select-all-by-all-pages", "showThemeSelector": true })

Note: We recommend avoiding the partially controlled mode due to the side-effects it can cause when using Redux and performing time traveling.
