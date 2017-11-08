# React Grid Virtual Scrolling

The Grid component can process a large amount of data (thousands of records). You can use the virtual mode for single-page data presentation as an alternative to paging.

*Browser Support Note:* Virtual scrolling requires `position: sticky` support by the browser. Thus, this feature will not work in the Microsoft Interner Explorer and Android Browser/WebView (for Android <5.0).

## Plugin List

The [VirtualTableView](../reference/virtual-table-view.md) plugin implements the virtual scrolling mode, and it should be used instead of the [TableView](../reference/table-view.md) (they implement the same interfaces).

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

The virtual table renders only visible rows. Other rows that are currently hidden, replaced with a stub row. The stub row height is calculated using the `estimatedRowHeight` property value. Once a hidden row renders, the row height will be stored in the virtual table and used for future calculation of the stub row height.

The virtual table height can be changed by the `height` property.

The following example demonstrates the basic Grid with virtual scrolling:

.embedded-demo(virtual-scrolling/basic)
