# React Grid - Virtual Scrolling

Virtual scrolling allows the Grid component to display thousands of records on a single page. You can use this feature as an alternative to paging.

*Browser Support Note:* Since virtual scrolling requires the browser to support `position: sticky`, it does not work in Android Browser/WebView for Android < 5.0 and Internet Explorer.

## Plugin List

The [VirtualTable](../reference/virtual-table.md) plugin implements the virtual scrolling mode, and it should be used instead of the [Table](../reference/table.md) as they implement the same interfaces.

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

The virtual table contains only the rendered rows; others are replaced with two stub rows whose heights depend on the `estimatedRowHeight` property value and change dynamically as the user scrolls.

You can change the virtual table's height using the `height` property.

The following example demonstrates the basic Grid with virtual scrolling:

.embedded-demo(grid-virtual-scrolling/basic)
