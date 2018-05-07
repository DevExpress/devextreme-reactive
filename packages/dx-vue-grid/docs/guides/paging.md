# Vue Grid - Paging

The Grid component supports data paging. You can specify the page size and switch pages programmatically or via the Paging Panel's UI controls. The paging state management, Paging Panel rendering, and built-in paging logic are implemented in the corresponding plugins. You can also configure the Grid to use server-side paging if your data service supports it.

## Related Plugins

The following plugins implement filtering features:

- [DxPagingState](../reference/paging-state.md) - controls the paging state
- [DxIntegratedPaging](../reference/integrated-paging.md) - performs built-in data paging
- [DxCustomPaging](../reference/custom-paging.md) - allows implementing a custom totalCount calculation logic
- [DxPagingPanel](../reference/paging-panel.md) - renders the Paging Panel

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Paging Setup

Use the `DxPagingState`, `DxIntegratedPaging` (or `DxCustomPaging`), and `DxPagingPanel` plugins to set up a Grid with paging.

Specify the active page index in the `DxPagingState` plugin's `currentPage` property and subscribe to the `update:currentPage` event. Use the `.sync` modifier for two-way binding.

In the following example, the page size is specified using the `DxPagingState` plugin's `pageSize` property. However, the `update:pageSize` event handler is not specified because the page size is not supposed to be changed internally as the Page Size Selector is not available.

.embedded-demo({ "path": "grid-paging/basic", "showThemeSelector": true })

## Page Size Selection

Assign an array of available page sizes to the `DxPagingPanel` plugin's `pageSizes` property to enable page size selection via the UI. The Page Size Selector displays the 'All' item if the specified array contains an item whose value is 0. You can specify custom text for this Page Size Selector item using the `messages.showAll` property.

Specify the page size in the `DxPagingState` plugin's `pageSize` property and subscribe to the `update:pageSize` event. Use the `.sync` modifier two-way binding.

.embedded-demo({ "path": "grid-paging/page-size-selector", "showThemeSelector": true })

## Remote Paging

You can handle the Grid's paging state changes to request page data from the server according to the current page index and the page size if your data service supports paging.

Paging options are updated once an end-user interacts with Paging Panel controls. Handle paging option changes using the `DxPagingState` plugin's `update:currentPage` and `update:pageSize` events, and request data from the server using the applied paging options. Once the page data is received from the server, pass it to the `DxGrid` component's `rows` property.

For remote paging, use the `DxCustomPaging` plugin instead of the `DxIntegratedPaging` plugin.

.embedded-demo({ "path": "grid-paging/remote-paging", "showThemeSelector": true })

## Using Paging with Other Data Processing Plugins

When you use paging features with sorting, grouping, or filtering, take note of the order in which the plugins appear in the Grid's container. You need to choose whether to paginate filtered rows or filter the current page. In the former case, put the `DxIntegratedFiltering` plugin before the `DxIntegratedPaging` one. Otherwise, inverse the plugins' order.
