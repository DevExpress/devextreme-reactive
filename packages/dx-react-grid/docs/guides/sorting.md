# React Grid - Sorting

The Grid component supports sorting data by one or several column values. Use the corresponding plugins and UI (column headers and Group Panel) to manage the sorting state and sort data programmatically.

Click several columns while holding `Shift` to sort data by these columns. Clicking a column while holding `Ctrl` (`Cmd` for MacOS) cancels sorting by this column.

## Related Plugins

The following plugins implement sorting features:

- [SortingState](../reference/sorting-state.md) - controls the sorting state
- [IntegratedSorting](../reference/integrated-sorting.md) - performs built-in data sorting
- [TableHeaderRow](../reference/table-header-row.md) - renders the header row with sorting indicators
- [GroupingPanel](../reference/grouping-panel.md) - renders the Group Panel with sorting indicators

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `SortingState`, `IntegratedSorting` and `TableHeaderRow` plugins to set up a Grid with simple static sorting.

Set the `TableHeaderRow` plugin's `showSortingControls` property to true to enable changing the sorting criteria in the header row.

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial sorting conditions in the `SortingState` plugin's `defaultSorting` property.

.embedded-demo({ "path": "grid-sorting/header-sorting", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), pass the sorting options to the `SortingState` plugin's `sorting` property and handle the `onSortingChange` event to control the sorting state externally.

.embedded-demo({ "path": "grid-sorting/controlled-mode", "showThemeSelector": true })

## Disable Sorting by a Column

You can prevent sorting by a specific column using the [SortingState](../reference/sorting-state.md) plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-sorting/disable-column-sorting", "showThemeSelector": true })

## Use Sorting with Grouping

The Grid's grouping features allow you to sort groups and data rows. For this, set the `GroupingPanel` plugin's `showSortingControls` property to true to enable the sorting UI for the Group Panel's column headers.

.embedded-demo({ "path": "grid-sorting/group-sorting", "showThemeSelector": true })

## Custom Sorting Algorithm

The [IntegratedSorting](../reference/integrated-sorting.md) plugin's `columnExtensions` property allows you to implement a custom sorting algorithm for a specific column.

.embedded-demo({ "path": "grid-sorting/custom-sorting", "showThemeSelector": true })

## Custom Sort Label

You can override the [TableHeaderRow](../reference/table-header-row.md) plugin's `sortLabelComponent` property to render sort labels using a custom component.

.embedded-demo({ "path": "grid-sorting/custom-sort-label", "showThemeSelector": true })

## Remote Sorting

You can sort remotely by handling sorting state changes, generating a request, and sending it to the server.

Sorting options are updated when an end-user interacts with a column header in the header row or Group Panel. Use the `SortingState` plugin's `onSortingChange` event to handle sorting option changes and use these options to request data from the server. Once the sorted data is received from the server, pass it to the `Grid` component's `rows` property.

Note that you do not need to use the `IntegratedSorting` plugin for remote sorting.

.embedded-demo({ "path": "grid-sorting/remote-sorting", "showThemeSelector": true })
