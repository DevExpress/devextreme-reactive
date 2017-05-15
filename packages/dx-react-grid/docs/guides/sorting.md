# React Grid Data Sorting

## Overview

The Grid component supports sorting data by any number of columns. It also includes plugins that enable an end-user to specify sorting criteria via the UI (by clicking column headers). The selected sort order is indicated by an arrow glyph in the header of a column. Additionaly, the grid supports multiple column sorting. Click column headers with the `Shift` key held down to select several columns for sorting.

## Plugin List

There are several plugins that implement sorting features:
- [SortingState](../reference/sorting-state.md)
- [LocalSorting](../reference/local-sorting.md)
- [TableHeaderRow](../reference/table-header-row.md)
- [GroupingPanel](../reference/grouping-panel.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Basic Local Sorting Setup

To show a grid with interactive sorting features, use the `SortingState`, `LocalSorting` and `TableHeaderRow` plugins.

In this example, we use the uncontrolled mode and specify only the initial sorting configuration via the `defaultSorting` property of the `SortingState` plugin.

By default, the `TableHeaderRow` plugin is not configured to allow an end-user to change sorting criteria. To enable this feature, set the `allowSorting` property to true.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/sorting/local-header-sorting)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/sorting/local-header-sorting.jsx)

## Using Sorting with Grouping

You can use the Grid's sorting and grouping features simultaneously. When using sorting and grouping plugins togehther, pay your attention to the order of plugins in the Grid container component. To allow an end-user to change sorting options of grouped columns by clicking the items of the group panel, set the `allowSorting` property of the `GroupingPanel` plugin to true.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/sorting/local-group-sorting)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/sorting/local-group-sorting.jsx)

## Controlled Sorting State

To control the sorting state, pass the appropriate array to the `sorting` property of the `SortingState` plugin and handle the `onSortingChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/sorting/local-sorting-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/sorting/local-sorting-controlled.jsx)

## Remote Sorting

If your data service supports sorting operations, you can handle the Grid's sorting state changes in order to request data from the server with the corresponding sorting applied.

Don't use the `LocalSorting` plugin to configure remote sorting. Handle the `sortingChange` event of the `SortingState` plugin to process sorting criteria updates. These updates are applied when an end-user changes sorting options via the UI. When sorted data was received from the server, pass it to the `Grid` component's `rows` property.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/sorting/remote-sorting)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/sorting/remote-sorting.jsx)
