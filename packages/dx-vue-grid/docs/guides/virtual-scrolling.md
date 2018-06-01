# Vue Grid - Virtual Scrolling

Virtual scrolling allows the Grid component to display thousands of records on a single page. This feature as an alternative to paging.

**Browser Support Note: Virtual scrolling does not work in Android Browser/WebView for Android earler than 5.0 and Internet Explorer because these browsers do not support `position: sticky`.**

## Related Plugins

The [DxVirtualTable](../reference/virtual-table.md) plugin implements the virtual scrolling mode. Use this plugin instead of the [DxTable](../reference/table.md) one.

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

The virtual table contains only visible rows; the rows that are currently invisible are replaced with two stub rows whose height depends on the `estimatedRowHeight` property value and changes dynamically during scrolling.

You can change the virtual table's height using the `height` property.

The following example demonstrates the basic Grid with virtual scrolling:

.embedded-demo({ "path": "grid-virtual-scrolling/row-virtualization", "showThemeSelector": true })

The Grid also supports column virtualization, which is demonstrated in the following demo:

.embedded-demo({ "path": "grid-virtual-scrolling/column-virtualization", "showThemeSelector": true })
