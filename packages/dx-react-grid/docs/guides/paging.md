# React Grid - Data Paging

The Grid component supports data paging. You can specify the page size and switch pages programmatically or via the Paging Panel's UI controls. The paging state management, Paging Panel rendering, and local paging logic are implemented in the corresponding plugins. You can also configure the Grid to use server-side paging if your data service supports it.

## Related Plugins

The following plugins implement filtering features:

- [PagingState](../reference/paging-state.md) - controls the paging state
- [LocalPaging](../reference/local-paging.md) - performs local data paging
- [PagingPanel](../reference/paging-panel.md) - renders the Paging Panel

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Local Paging Setup

Import the plugins listed above to set up a Grid with basic paging.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial active page index in the `PagingState` plugin's `defaultCurrentPage` property.

In the following example, the page size is specified using the `PagingState` plugin's `pageSize` property, which is usual for the controlled mode. However, the `onPageSizeChange` event handler is not specified because page size is not supposed to be changed internally as the Page Size Selector is not available.

.embedded-demo(paging/local-paging)

## Page Size Selection

Assign an array of available page sizes to the `PagingPanel` plugin's `pageSizes` property to enable page size selection via the UI. The Page Size Selector displays the 'All' item if the specified array contains an item whose value is 0. You can specify custom text for this Page Size Selector item using the `messages.showAll` property.

The example below demonstrates the basic configuration for the uncontrolled mode. The `PagingState` plugin's `defaultPageSize` property defines the initial page size.

.embedded-demo(paging/page-size-selector)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), specify the following `PagingState` plugin property pairs to set a state value and handle its changes:

- `currentPage` and `onCurrentPageChange` - the currently displayed page's index
- `pageSize` and `onPageSizeChange` - the page size

Note that the `onPageSizeChange` handler makes sense only if the `pageSizes` option is specified. Otherwise, a user is not able to change the page size.

.embedded-demo(paging/local-paging-controlled)

## Remote Paging

You can handle the Grid's paging state changes to request a page data from the server according to the current page index and page size if your data service supports paging.

Paging options are updated once an end-user interacts with Paging Panel controls. Handle paging option changes using the `PagingState` plugin's `onCurrentPageChange` and `onPageSizeChange` events and request data from the server using the applied paging options. Once the page data is received from the server, pass it to the `Grid` component's `rows` property.

Note that in the case of remote paging, you do not need to use the `LocalPaging` plugin.

.embedded-demo(paging/remote-paging)

## Using Paging with Other Data Processing Plugins

When you use paging features with sorting, grouping, or filtering, take a note of the order in which the plugins appear in the Grid's container. You need to choose whether to paginate filtered rows or filter the current page. In the first case, put the `LocalFiltering` plugin before the `LocalPaging` one. Otherwise, inverse the plugins' order.
