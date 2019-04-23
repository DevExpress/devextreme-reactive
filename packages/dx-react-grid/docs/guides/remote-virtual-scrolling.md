# React Grid - Remote Virtual Scrolling

The Grid component supports lazy loading data from the server. That means that rows will be loaded in chunks as they enter a viewport.

## Related Plugins

The following plgins implement loading rows on-demand:

- [VirtualTableState](../reference/virtual-table-state.md) - requests remote data
- [VirtualTable](../reference/virtual-table.md) - renders loaded rows

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

This feature works only in [controlled mode](controlled-and-uncontrolled-modes.md) mode.

Configure the VirtualTableState plugin as follows: specify the `getRows` property to fetch chunks of data from server. This function should accept `skip` and `take` parameters - offset of a chunk's first row in entire data set and a chunk size, respectively. Once a response is complete pass the fetched data to the grid via `Grid` plugin's `rows` property and pass a `skip` parameter to the VirtualTableState plugin's `skip` property so that grid could understand where to render fetched rows.

.embedded-demo({ "path": "grid-virtual-scrolling/remote-virtual-scrolling", "showThemeSelector": true })

## Infinite Scrolling
