# React Grid Data Filtering

## Overview

The Grid component supports filtering by columns. It is also shipped with a number of plugins that allow end-users to filter rows by entering text within filter editors.

## Plugin List

There are several plugins that implement filtering features:
- [FilteringState](../reference/filtering-state.md)
- [LocalFiltering](../reference/local-filtering.md)
- [TableFilterRow](../reference/table-filter-row.md)

Note that [plugin order](../README.md#plugin-order) is very important.

## Set up Local Filtering with Filter Row

To set up basic filtering, use the `FilteringState`,`LocalFiltering` and `TableFilterRow` plugins.

In this example, we use the uncontrolled mode and specify only the initial filters via the `defaultFilters` property of the `FilteringState` plugin. After that, the grid will manage filter changes internally.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/filtering/local-filter-row)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/filtering/local-filter-row.jsx)

## Customizing Filter Row

You can replace built-in filter row editors with custom ones. To specify a custom editor, define a template using the `TableFilterRow` plugin's `filterCellTemplate` property.

In a custom template, you need to handle filter changes. In this example, filter configuration is specified by the `filter` parameter and configuration changes are processed by the `setFilter` action. This means that the `FilteringState` plugin handles changes internally. So, the Grid can run in both controlled and uncontrolled modes.

To process your custom filter locally, specify custom filtering predicate in the `LocalFiltering` plugin's `filterFn` property.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/filtering/custom-filter-row)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/filtering/custom-filter-row.jsx)

## Controlled Filtering State

To control the filtering state, pass an array of column filters to the `FilteringState` plugin's  `filters` property  and handle the `onFiltersChange` event.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/filtering/local-filtering-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/filtering/local-filtering-controlled.jsx)

## Remote Filtering

If your data service supports filtering operations, you can handle the Grid filtering state changes in order to request data from the server with the corresponding filters applied.

In case of remote filtering, you don't need to use the `LocalFiltering` plugin. Handle the `FilteringState` plugin's `onFiltersChange` event to receive filter changes' updates. Filter changes are updated once an end-user modifies text within the Filter Row editors or other filtering controls. Once the filtered data is received from the server, pass it to the `Grid` component's `rows` property.

## Using Filtering with Other Data Processing Plugins

When filtering features are used with other features such as paging and grouping, take note of the order in which the plugins appear in the Grid container. You need to choose whether to paginate filtered rows or filter the current page. In the first case, put the `LocalFiltering` plugin before the `LocalPaging` one. In the second one, inverse the plugins' order.

