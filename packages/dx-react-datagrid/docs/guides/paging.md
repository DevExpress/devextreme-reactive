# DataGrid Paging

## Overview

The DataGrid paging features allow to perform data paging on the client side. If your data service supports server-side paging, you can handle the DataGrid paging state changes (current page, page size) and pass this data to your server in order to obtain a corresponding page data. The paging plugin set also contains plugins that display paging controls to enable end-user interactions, for instance, page switching.

## Plugin List

There are several plugins that implement sorting features:
- [PagingState](../reference/paging-state.md)
- [LocalPaging](../reference/local-paging.md)
- [PagingPanel](../reference/paging-panel.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Basic Local Paging Setup

To setup a commonly used paging configuration you need to use the mentioned above `PagingState`, `LocalPaging` and `PagingPanel` plugins.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/paging/local-paging)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/local-paging.jsx)

In this example we use uncontrolled mode by specifying just a starting active page number via the `defaultCurrentPage` property of the `PagingState` plugin. After that the grid will manage paging state changes internally.

## Controlled Paging State

To control the paging state from the outside you need to set the `currentPage` and `pageSize` properties of the `PagingState` plugin and to handle the `currentPageChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/paging/local-paging-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/local-paging-controlled.jsx)

## Remote Paging

If your data service supports paging operations, you can handle the DataGrid paging state changes in order to request a page from the server according to the active page number and page size.

To setup remote paging, you shouldn't use the `LocalPaging` plugin. You should handle the `currentPageChange` event of the `PagingState` plugin in order to recieve updates on the current page number changes. Having recieved a data page from the server just pass it to the `DataGrid` component `rows` property.

## Using Paging with Other Data Processing Plugins

It's high likely, that you will use paging features side by side with other features such as sorting, grouping, etc. In this case you should be carryful about the order in which the plugins appear inside the DataGrid container. The reason for that is quite obvious. Plugins are applied one by one in the order they appear. Let's imagine you are using paging and sorting alltother. If you put the `LocalSorting` plugin befor the `LocalPaging` one, the data will be sorted first and paginated after that. Once you change the order, the unsorted rows will be paginated and only the current page will be sorted after that.

