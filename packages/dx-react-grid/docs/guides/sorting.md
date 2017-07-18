# React Grid Data Sorting

## Overview

The Grid component supports sorting data by any number of columns. It also includes plugins that enable an end-user to specify sorting criteria via the UI (by clicking column headers). An arrow glyph in the header of a column indicates the selected sort order. The grid also supports multiple column sorting. Click column headers with the `Shift` key held down to select several columns for sorting. To clear sorting by a column, click the column header with the `Ctrl` key held down or with the `Cmd` key if you are using MacOS.

## Plugin List

There are several plugins that implement sorting features:
- [SortingState](../reference/sorting-state.md)
- [LocalSorting](../reference/local-sorting.md)
- [TableHeaderRow](../reference/table-header-row.md)
- [GroupingPanel](../reference/grouping-panel.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Basic Local Sorting Setup

Use the `SortingState`, `LocalSorting` and `TableHeaderRow` plugins to show a grid with interactive sorting features.

In this example, we use the uncontrolled mode and specify only the initial sorting configuration via the `defaultSorting` property of the `SortingState` plugin.

The `TableHeaderRow` plugin is not configured to allow an end-user to change sorting criteria by default. Set the `allowSorting` property to true to enable this feature.

.embedded-demo(sorting/local-header-sorting)

## Using Sorting with Grouping

You can use the Grid's sorting and grouping features simultaneously. When using sorting and grouping plugins together, pay attention to the order of plugins in the Grid container component. Set the `allowSorting` property of the `GroupingPanel` plugin to true to allow an end-user to change sorting options of grouped columns by clicking the group panel's items.

.embedded-demo(sorting/local-group-sorting)

## Controlled Sorting State

Pass the appropriate array to the `sorting` property of the `SortingState` plugin and handle the `onSortingChange` event of the same plugin to control the sorting state.

.embedded-demo(sorting/local-sorting-controlled)

## Remote Sorting

You can handle the Grid's sorting state changes to request data from the server with the corresponding sorting applied if your data service supports sorting operations.

Do not use the `LocalSorting` plugin to configure remote sorting. Handle the `sortingChange` event of the `SortingState` plugin to process sorting criteria updates. These updates are applied when end-users change sorting options via the UI. When sorted data was received from the server, pass it to the `Grid` component's `rows` property.

.embedded-demo(sorting/remote-sorting)
