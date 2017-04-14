# DataGrid Filtering

## Overview

The DataGrid component supports filtering by columns. It is also shipped with a number of plugins that allow end-users to filter rows by entering text within filter editors.

## Plugin List

There are several plugins that implement filtering features:
- [FilteringState](../reference/filtering-state.md)
- [LocalFiltering](../reference/local-filtering.md)
- [TableFilterRow](../reference/table-filter-row.md)

Note that [plugin order](../README.md#plugin-order) is very important.

## Set up Local Filtering with Filter Row

To set up basic filtering, use the `FilteringState`,`LocalFiltering` and `TableFilterRow` plugins.

In this example, we use the uncontrolled mode and specify only the initial filters via the `defaultFilters` property of the `FilteringState` plugin. After that, the grid will manage filter changes internally.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/filtering/local-filter-row)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/filtering/local-filter-row.jsx)

## Controlled Filtering State

To control the filtering state, you need to pass an array of column filters to the `filters` property of the `FilteringState` plugin and handle the `filtersChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/filtering/local-filtering-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/filtering/local-filtering-controlled.jsx)

## Remote Filtering

If your data service supports filtering operations, you can handle the DataGrid filtering state changes in order to request data from the server with the corresponding filters applied.

In the case of remote filtering, don't use the `LocalFiltering` plugin. You need to handle the `filtersChange` event of the `FilteringState` plugin in order to recieve updates on filter changes. They happen once an end-user modifies text within the Filter Row editors or other filtering controls. Once the filtered data is recieved from the server, pass it to the `DataGrid` component's `rows` property.

## Using Filtering with Other Data Processing Plugins

When filtering features are used with other features such as paging and grouping, take note of the order in which the plugins appear in the DataGrid container. You need to choose whether to paginate filtered rows or filter the current page. In the first case, put the `LocalFiltering` plugin before the `LocalPaging` one. In the second one, inverse the plugins' order.

