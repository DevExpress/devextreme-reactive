# React Grid Virtual Scrolling

The Grid component can process a large amount of data (thousands of records). You can use the virtual mode for single-page data presentation as an alternative to paging.

## Plugin List

Virtual mode is implemented in the `VirtualTableView` plugin that should be used instead of the [TableView](../../table-view.md) one as it implements the same interfaces.

Note that the [plugin order](../README.md#plugin-order) is important.

## Basic Setup

The virtual mode requires cell size definition. By default, row height is adapted for a typical Bootstrap table. If you use custom templates, specify custom height for the required row or custom width for the required column in the corresponding plugins.

The following example demonstrates the basic Grid with virtual scrolling:

.embedded-demo(virtual-scrolling/basic)

## Integration with Other Plugins

A virtual table supports other Grid features (filtering, sorting, etc.).

If you show a Detail Row, you have to specify it's height depending on its contents using the `TableRowDetail` plugin's `rowHeight` property to provide correct Grid rendering.

.embedded-demo(virtual-scrolling/integration-with-other-plugins)
