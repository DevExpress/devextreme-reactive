# Vue Grid - Sorting

The Grid component supports sorting data by one or several column values. Use the corresponding plugins and UI (column headers and Group Panel) to manage the sorting state and sort data programmatically.

Click several columns while holding `Shift` to sort data by these columns. Clicking a column while holding `Ctrl` (`Cmd` for MacOS) cancels sorting by this column.

## Related Plugins

The following plugins implement sorting features:

- [DxSortingState](../reference/sorting-state.md) - controls the sorting state
- [DxIntegratedSorting](../reference/integrated-sorting.md) - performs built-in data sorting
- [DxTableHeaderRow](../reference/table-header-row.md) - renders the header row with sorting indicators
- [DxGroupingPanel](../reference/grouping-panel.md) - renders the Group Panel with sorting indicators

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `DxSortingState`, `DxIntegratedSorting` and `DxTableHeaderRow` plugins to set up a Grid with simple static sorting.

Set the `DxTableHeaderRow` plugin's `showSortingControls` property to true to enable changing the sorting criteria in the header row.

Specify the sorting conditions in the `DxPagingState` plugin's `sorting` property and subscribe to the `update:sorting` event. Use the `.sync` modifier for two-way binding.

.embedded-demo({ "path": "grid-sorting/basic", "showThemeSelector": true })

## Disable Sorting by a Column

You can prevent sorting by a specific column using the [DxSortingState](../reference/sorting-state.md) plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-sorting/disable-column-sorting", "showThemeSelector": true })

## Using Sorting with Grouping

The Grid's grouping features allow you to sort groups as well as data rows. For this, set the `DxGroupingPanel` plugin's `showSortingControls` property to true, which enables the sorting UI for the Group Panel's column headers.

.embedded-demo({ "path": "grid-sorting/group-sorting", "showThemeSelector": true })

## Custom Sorting Algorithm

The [DxIntegratedSorting](../reference/integrated-sorting.md) plugin's `columnExtensions` property allows you to implement a custom sorting algorithm for a specific column.

.embedded-demo({ "path": "grid-sorting/custom-sorting", "showThemeSelector": true })

## Remote Sorting

You can perform remote sorting by handling sorting state changes, generating a request, and sending it to the server.

Sorting options are updated once an end-user interacts with a column header in the header row or Group Panel. Handle sorting option changes using the `DxSortingState` plugin's `update:sorting` event and request data from the server using the applied sorting options. Once the sorted data is received from the server, pass it to the `DxGrid` component's `rows` property.

Note that you do not need to use the `DxIntegratedSorting` plugin for remote sorting.

.embedded-demo({ "path": "grid-sorting/remote-sorting", "showThemeSelector": true })
