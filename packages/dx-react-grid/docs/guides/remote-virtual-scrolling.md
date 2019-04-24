# React Grid - Remote Virtual Scrolling

The Grid component supports lazy loading data from the server. That means that rows will be loaded in chunks as they enter a viewport.

## Related Plugins

The following plgins implement loading rows on-demand:

- [VirtualTableState](../reference/virtual-table-state.md) - requests remote data
- [VirtualTable](../reference/virtual-table.md) - renders loaded rows

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

This feature works only in [controlled mode](controlled-and-uncontrolled-modes.md).

The rows are loaded in chunks - pages, the size of which is specified via `pageSize` property. The less pageSize the more often server requests occur. A total number of rows in a data set  The grid internally maintains 3 pages - a currently visible page, a previous page and a next one. The Grid loads 2 pages on initialization and on fast scrolling. A chunk loading is initiated with `getRows` function which accepts `skip` and `take` parameters - offset of a chunk's first row in entire data set and a chunk size, respectively. The `loading` property should indicate whether any active request exists. Once a request is completed pass the fetched data rows to the grid via `Grid` plugin's `rows` property and pass a `skip` parameter to the VirtualTableState plugin's `skip` property so that grid could understand where to render fetched rows.

.embedded-demo({ "path": "grid-virtual-scrolling/remote-data-basic", "showThemeSelector": true })

## Caching

Use data caching to avoid unnecessary requests. The `dx-react-grid` package provides an implementation of a client cache. Call the `createRemoteRowsCache` to instatiate the cache. It also possible to use any other caches such as Apollo GraphQL cache or a custom cache implementation.

### Sorting and Filtering

For the sorting and filtering to work correctly it's necessary to purge rows cache each time a sort or filter paramters change. When filtering enabled total rows count should be fetched with each query.

NOTE: debounce request on filter change to avoid fetching data on each keystroke.

The following example demonstrates a grid configuration with enabled cache, sorting and filtering.

.embedded-demo({ "path": "grid-virtual-scrolling/remote-data", "showThemeSelector": true })

## Infinite Scrolling

Set the `VirtualTableState` plugin's `infiniteScrolling` property to `true` to make rows to load consequently.

.embedded-demo({ "path": "grid-virtual-scrolling/infinite-scrolling", "showThemeSelector": true })
