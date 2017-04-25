# DataGrid Paging

## Overview

The DataGrid's paging features are used to perform data paging on the client side. However, if your data service supports server-side paging, you can handle the DataGrid's paging state changes (the current page, the page size) and pass this data to your server. The paging plugin set also contains plugins that display paging controls for enabling end-user interaction, for instance, page switching.

## Plugin List

There are several plugins that implement sorting features:
- [PagingState](../reference/paging-state.md)
- [LocalPaging](../reference/local-paging.md)
- [PagingPanel](../reference/paging-panel.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Basic Local Paging Setup

To set up a common paging configuration, use the `PagingState`, `LocalPaging`, and `PagingPanel` plugins.

In the following example, we use the uncontrolled mode and specify only the initial active page number via the `defaultCurrentPage` property of the `PagingState` plugin. After that the grid will manage paging state changes internally.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/paging/local-paging)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/local-paging.jsx)

## Controlled Paging State

To control the paging state from the outside, set the `currentPage` and `pageSize` properties of the `PagingState` plugin and handle the `currentPageChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/paging/local-paging-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/local-paging-controlled.jsx)

## Remote Paging

If your data service supports paging operations, you can handle the DataGrid's paging state changes in order to request a page from the server according to the active page number and size.

Don't use the `LocalSorting` plugin to configure remote paging. Instead, handle the `currentPageChange` event of the `PagingState` plugin in order to receive updates on the current page number changes. Having received a data page from the server, just pass it to the `DataGrid` component's `rows` property.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/paging/remote-paging)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/remote-paging.jsx)

## Using Paging with Other Data Processing Plugins

It's high likely that you will use paging features side by side with other features such as sorting, grouping, etc. In this case, you should be careful about the order in which the plugins appear inside the DataGrid container. The reason for that is quite obvious. Plugins are applied one by one in the order they appear. Let's imagine you are using paging and sorting together. If you put the `LocalSorting` plugin before the `LocalPaging` one,  data will be sorted and then paginated. Once you change the order, unsorted rows will be paginated and only the current page will be sorted after that.

