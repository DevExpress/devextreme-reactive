# React Grid Data Paging

## Overview

The Grid's paging features are used to perform data paging on the client side. However, if your data service supports server-side paging, you can handle the Grid's paging state changes (the current page, the page size) and pass this data to your server. The paging plugin set also contains plugins that display paging controls for enabling end-user interaction, for instance, page switching.

## Plugin List

There are several plugins that implement sorting features:
- [PagingState](../reference/paging-state.md)
- [LocalPaging](../reference/local-paging.md)
- [PagingPanel](../reference/paging-panel.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Basic Local Paging Setup

To set up a common paging configuration, use the `PagingState`, `LocalPaging`, and `PagingPanel` plugins.

In the following example, we use the uncontrolled mode and specify only the initial active page number via the `defaultCurrentPage` property of the `PagingState` plugin. After that, the grid manages paging state changes internally.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/paging/local-paging)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/local-paging.jsx)

## Page Size Selection

To enable page size selection, specify the `allowedPageSizes` property of the `PagingPanel` plugin.

The example below demonstrates the basic configuration for the uncontrolled mode. The `defaultPageSize` property of the `PagingState` plugin is used to define the initial page size.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/paging/page-size-selector)
[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/page-size-selector.jsx)

## Controlled Paging State

To control the paging state, specify the `currentPage` and `pageSize` properties of the `PagingState` plugin and handle the `onCurrentPageChange` event. Specify the `allowedPageSizes` property of the `PagingPanel` plugin and define the `onPageSizeChanged` event handler of the `PagingState` plugin to enable page size selection.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/paging/local-paging-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/local-paging-controlled.jsx)

## Remote Paging

If your data service supports paging operations, you can handle the Grid's paging state changes to request a page from the server according to the active page number and size.

Handle the `onCurrentPageChange` event of the `PagingState` plugin to receive updates on the current page number changes instead of using the `LocalSorting` plugin to configure remote paging. Pass the data page received from the server to the `Grid` component's `rows` property.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/paging/remote-paging)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/paging/remote-paging.jsx)

## Using Paging with Other Data Processing Plugins

Paging features are often used side by side with other features such as sorting, grouping, etc. Note that plugins are applied in the order in which they appear inside the Grid container. If you are using paging and sorting together and you put the `LocalSorting` plugin before the `LocalPaging` one,  data is sorted and then paginated. Once you change the order, unsorted rows are paginated, and only the current page is sorted after that.

