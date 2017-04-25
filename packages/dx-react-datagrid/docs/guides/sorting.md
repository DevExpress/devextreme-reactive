# DataGrid Sorting

## Overview

The DataGrid component supports sorting by any number of columns. We also provide a set of plugins that allow end-users to sort the grid by clicking the header of the column (or a group item in case of a groupable grid) by which the grid should be sorted. The sort order is indicated by an arrow glyph within the sorted column. You can sort the grid against multiple columns by clicking required column headers with the `shift` key held down.

## Plugin List

There are several plugins that implement sorting features:
- [SortingState](../reference/sorting-state.md)
- [LocalSorting](../reference/local-sorting.md)
- [TableHeaderRowSorting](../reference/table-header-row-sorting.md)
- [GroupingPanelSorting](../reference/grouping-panel-sorting.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Basic Local Sorting Setup

To show a grid with interactive sorting features, use the `SortingState`, `LocalSorting`, and `TableHeaderRowSorting` plugins.

In this example, we use the uncontrolled mode and specify only the initial sorting configuration via the `defaultSortings` property of the `SortingState` plugin. After that, the grid will manage sorting changes internally.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/sorting/local-header-sorting)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/sorting/local-header-sorting.jsx)

## Using Sorting with Grouping

If you have enabled the DataGrid grouping features, you might want to use them with sorting. The sorting and grouping plugins can work together and don't require any additional configuration.Just keep the proper order of those plugins in the DataGrid container component. If you also want to allow end-users to change the sorting of grouped columns by clicking the items of the group panel, add the `GroupingPanelSorting` plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/sorting/local-group-sorting)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/sorting/local-group-sorting.jsx)

## Controlled Sorting State

To control the sorting state from the outside, pass an array of column sortings to the `sortings` property of the `SortingState` plugin and handle the `sortingsChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/sorting/local-sorting-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/sorting/local-sorting-controlled.jsx)

## Remote Sorting

If your data service supports sorting operations, you can handle the DataGrid's sorting state changes in order to request data from the server with the corresponding sorting applied.

Don't use the `LocalSorting` plugin to set up remote sorting. Instead, handle the `sortingsChange` event of the `SortingState` plugin in order to receive updates on sorting changes. These updates take place once an end-user changes sortings that interact with the grid. Having the sorted data received from the server, just pass it to the `DataGrid` component's `rows` property.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/sorting/remote-sorting)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/sorting/remote-sorting.jsx)
