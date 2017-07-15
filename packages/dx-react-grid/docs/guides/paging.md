# React Grid Data Paging

## Overview

The Grid's paging features are used to divide data into pages on the client side. However, if your data service supports server-side paging, you can handle the Grid's paging state changes (current page, page size) and pass this data to the server. There are also plugins that display paging controls that enable end-user interaction, for instance, page switching.

## Plugin List

Several plugins implement sorting features:
- [PagingState](../reference/paging-state.md)
- [LocalPaging](../reference/local-paging.md)
- [PagingPanel](../reference/paging-panel.md)

Note that the [plugin order](../README.md#plugin-order) is important.

## Basic Local Paging Setup

Use the `PagingState`, `LocalPaging`, and `PagingPanel` plugins to set up a common paging configuration.

In the following example, we use the uncontrolled mode and specify only the initial active page number via the `defaultCurrentPage` property of the `PagingState` plugin. In this case, the grid manages paging state changes internally.

.embedded-demo(paging/local-paging)

## Page Size Selection

Assign an array of available page sizes to the `allowedPageSizes` property of the `PagingPanel` plugin to enable page size selection. The page size selector contains the 'All' item if one of array values is 0. Use the `showAllText` property of the `PagingPanel` plugin to change its text.

The example below demonstrates the basic configuration for the uncontrolled mode. The `PagingState` plugin's `defaultPageSize` property is used to define the initial page size.

.embedded-demo(paging/page-size-selector)

## Controlled Paging State

Specify the `PagingState` plugin's `currentPage` and `pageSize` properties and handle the `onCurrentPageChange` event to control the paging state. Specify the `PagingPanel` plugin's `allowedPageSizes` property and define the `PagingState` plugin's `onPageSizeChanged` event handler to enable page size selection.

.embedded-demo(paging/local-paging-controlled)

## Remote Paging

You can handle the Grid's paging state changes to request a page from the server according to the active page number and size if your data service supports paging operations.

Handle the `PagingState` plugin's `onCurrentPageChange` event to receive updates on the current page number changes instead of using the `LocalSorting` plugin to configure remote paging. Pass the data page received from the server to the `Grid` component's `rows` property.

.embedded-demo(paging/remote-paging)

## Using Paging with Other Data Processing Plugins

Paging features are often used side by side with other features such as sorting, grouping, etc. Note that plugins are applied in the order in which they appear inside the Grid container. If you are using paging and sorting together and you put the `LocalSorting` plugin before the `LocalPaging` one,  data is sorted and then paginated. Once you change the order, unsorted rows are paginated, and only the current page is sorted after that.
