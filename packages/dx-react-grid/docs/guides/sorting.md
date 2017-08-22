# React Grid Data Sorting

The Grid component supports sorting data by one or several column values. Use the corresponding plugins to manage the sorting state and sort data programmatically or via the UI (column headers and Group Panel).

Click several columns while holding `Shift` to sort data by these columns. Clicking a column while holding `Ctrl` (`Cmd` for MacOS) stops sorting by this column.

## Related Plugins

The following plugins implement sorting features:

- [SortingState](../reference/sorting-state.md) - controls the sorting state  
- [LocalSorting](../reference/local-sorting.md) - performs local data sorting  
- [TableHeaderRow](../reference/table-header-row.md) - renders the header row with sorting indicators  
- [GroupingPanel](../reference/grouping-panel.md) - renders the Group Panel with sorting indicators

Note that the [plugin order](../README.md#plugin-order) is important.

## Basic Local Sorting Setup

Use the `SortingState`, `LocalSorting` and `TableHeaderRow` plugins to set up a Grid with simple static sorting.

Set the `TableHeaderRow` plugin's `allowSorting` property to true to enable changing the sorting criteria in the header row.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial sorting conditions in the `SortingState` plugin's `defaultSorting` property. 

.embedded-demo(sorting/local-header-sorting)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the sorting options to the `SortingState` plugin's `sorting` property and handle the `onSortingChange` event to control the sorting state externally.

.embedded-demo(sorting/local-sorting-controlled)

## Using Sorting with Grouping

If you use grouping features, the Grid allows you to sort groups as well as data rows. For this, set the `GroupingPanel` plugin's `allowSorting` property to true, which enables sorting UI for Group Panel's column headers.

Note that the `LocalGrouping` plugin should follow the `LocalSorting` to provide the correct group row sorting.

.embedded-demo(sorting/local-group-sorting)

## Remote Sorting

You can handle the Grid sorting state changes to request data from the server with the corresponding sorting applied if your data service supports sorting operations.

Sorting options are updated once an end-user interacts with a column header in the header row or Group Panel. Handle sorting option changes using the `SortingState` plugin's `onSortingChange` event and request data from the server using the applied sorting options. Once the sorted data is received from the server, pass it to the `Grid` component's `rows` property.

Note that in the case of remote sorting, you do not need to use the `LocalSorting` plugin.

.embedded-demo(sorting/remote-sorting)
