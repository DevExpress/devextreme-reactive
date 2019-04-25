# React Grid - Virtual Scrolling with Remote Data: Lazy Loading

Lazy loading enables the Grid component to load row data in portions, once rows enter the viewport.

## Related Plugins

The following plugins implement lazy loading:

- [VirtualTableState](../reference/virtual-table-state.md) - requests data from the server
- [VirtualTable](../reference/virtual-table.md) - renders loaded rows

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

This feature works only in [controlled mode](controlled-and-uncontrolled-modes.md).

Grid rows are loaded in pages. The Grid maintains the visible, the previous, and the next page. The number of rows in each page is specified in the `pageSize` property. The less the `pageSize` is, the more frequently the Grid requests rows. The total number of rows in the data set is specified in the `totalRowCount` property.

Lazy loading is initiated by the `getRows` function that accepts the `skip` and `take` parameters. They specify how many rows to skip from the start of the data set and how many rows to load.

The `loading` property should indicate whether there is an active request. Once the request is completed, pass the loaded rows to the `Grid` plugin's `rows` property. In addition, pass the `skip` value to the `VirtualTableState` plugin's `skip` property so that the Grid can understand where to start rendering the rows.

.embedded-demo({ "path": "grid-virtual-scrolling/remote-data-basic", "showThemeSelector": true })

## Row Caching

Row caching helps reduce the number of data requests. Call the `createRowCache` function to instantiate the cache. You can use alternative cache implementations, such as the Apollo GraphQL cache or a custom implementation.


If users are allowed to sort or filter rows, clear the row cache each time the sort or filter settings are changed. Filtering also requires the total number of rows to be returned in every response.

*NOTE: Debounce requests on filter change to avoid fetching data on each keystroke.*

In the following demo, the Grid allows you to sort and filter rows. Loaded rows are cached.

.embedded-demo({ "path": "grid-virtual-scrolling/remote-data", "showThemeSelector": true })

## Infinite Scrolling

In infinite scrolling mode, rows are loaded in sequence. To enable this mode, set the `VirtualTableState` plugin's `infiniteScrolling` property to `true`.

.embedded-demo({ "path": "grid-virtual-scrolling/infinite-scrolling", "showThemeSelector": true })
