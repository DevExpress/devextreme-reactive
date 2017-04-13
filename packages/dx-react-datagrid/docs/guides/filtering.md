# DataGrid Filtering

## Overview

The DataGrid component supports filtering by one or several columns. There are also a number of plugins that allow an end-user to filter rows by entering text within the filter editors.

## Plugin List

There are several plugins that implement filtering features:
- [FilteringState](../reference/filtering-state.md)
- [LocalFiltering](../reference/local-filtering.md)
- [TableFilterRow](../reference/table-filter-row.md)

Note that [plugin order](../README.md#plugin-order) is very important.

## Setup Local Filtering with Filter Row

To setup a basic filtering you need to use the `FilteringState` plugin that manages currently applied filters, the `LocalFiltering` plugin that filters the data `rows` provided to the DataGrid and the `TableFilterRow` plugin that renders a row with editors to allow an end-user to change filters applied to different columns.

In this example we use the uncontrolled mode and specify only the initial filters via the `defaultFilters` property of the `FilteringState` plugin. After that the grid will manage filters changes internally.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/filtering/local-filter-row)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/filtering/local-filter-row.jsx)

## Controlled Filtering State

To control the filtering state from the outside you need to pass an array of column filters to the `filters` property of the `FilteringState` plugin and handle the `filtersChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/filtering/local-filtering-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/filtering/local-filtering-controlled.jsx)

## Remote Filtering

If your data service supports filtering operations, you can handle the DataGrid filtering state changes in order to request data from the server with the corresponding filters applied.

To setup remote filtering, you shouldn't use the `LocalFiltering` plugin. You should handle the `filtersChange` event of the `FilteringState` plugin in order to recieve updates on filters changes. They happen once an end-user modifies text within the Filter Row editors or other filtering controls. Having the filtered data recieved from the server just pass it to the `DataGrid` component `rows` property.

## Using Filtering with Other Data Processing Plugins

When using filtering features side by side with other features such as paging and grouping you should be carryful about the order in which the plugins appear inside the DataGrid container. You should decide if you need to paginate filtered rows or to filter the current page. In the first case put the `LocalFiltering` plugin before the `LocalPaging` one. In the second case just inverse the plugins order.

