# React Grid - Paging

The Grid component supports data paging. You can specify the page size and switch pages programmatically or via the Paging Panel's UI controls. The paging state management, Paging Panel rendering, and built-in paging logic are implemented in the corresponding plugins. You can also configure the Grid to use server-side paging if your data service supports it.

## Related Plugins

The following plugins implement filtering features:

- [PagingState](../reference/paging-state.md) - controls the paging state
- [IntegratedPaging](../reference/integrated-paging.md) - performs built-in data paging
- [CustomPaging](../reference/custom-paging.md) - allows implementing a custom totalCount calculation logic
- [PagingPanel](../reference/paging-panel.md) - renders the Paging Panel

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Paging Setup

Use the `PagingState`, `IntegratedPaging` (or `CustomPaging`), and `PagingPanel` plugins to set up a Grid with paging.

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial active page index in the `PagingState` plugin's `defaultCurrentPage` property.

In the following example, the page size is specified using the `PagingState` plugin's `pageSize` property, which is usual for the controlled mode. However, the `onPageSizeChange` event handler is not specified because the page size is not supposed to be changed internally as the Page Size Selector is not available.

.embedded-demo({ "path": "grid-paging/uncontrolled-mode", "showThemeSelector": true })

#### Page Size Selection

Assign an array of available page sizes to the `PagingPanel` plugin's `pageSizes` property to enable page size selection via the UI. The Page Size Selector displays the 'All' item if the specified array contains an item whose value is 0. You can specify custom text for this Page Size Selector item using the `messages.showAll` property.

The example below demonstrates a basic configuration for the uncontrolled mode. The `PagingState` plugin's `defaultPageSize` property defines the initial page size.

.embedded-demo({ "path": "grid-paging/page-size-selector", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), specify the following `PagingState` plugin property pairs to set a state value and handle its changes:

- `currentPage` and `onCurrentPageChange` - the currently displayed page's index
- `pageSize` and `onPageSizeChange` - the page size

Note that the `onPageSizeChange` handler makes sense only if the `pageSizes` option is specified. Otherwise, a user is not able to change the page size.

.embedded-demo({ "path": "grid-paging/controlled-mode", "showThemeSelector": true })

## Remote Paging

You can handle the Grid's paging state changes to request page data from the server according to the current page index and the page size if your data service supports paging.

Paging options are updated once an end-user interacts with Paging Panel controls. Handle paging option changes using the `PagingState` plugin's `onCurrentPageChange` and `onPageSizeChange` events, and request data from the server using the applied paging options. Once the page data is received from the server, pass it to the `Grid` component's `rows` property.

For remote paging, use the `CustomPaging` plugin instead of the `IntegratedPaging` plugin.

.embedded-demo({ "path": "grid-paging/remote-paging", "showThemeSelector": true })

## Use Paging with Other Data Processing Plugins

When you use paging features with sorting, grouping, or filtering, take note of the order in which the plugins appear in the Grid's container. You need to choose whether to paginate filtered rows or filter the current page. In the former case, put the `IntegratedFiltering` plugin before the `IntegratedPaging` one. Otherwise, inverse the plugins' order.
