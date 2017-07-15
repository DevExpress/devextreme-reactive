# React Grid Virtual Scrolling

## Overview

The Grid component can process a large amount of data. In some cases, it may be required to show thousands of records. As an alternative to dividing data by hundreds of pages, we provide the virtual mode for single-page data presentation.

## Plugin List

The `VirtualTableView` plugin is available for the Bootstrap 3 theme. It can be used instead of the `TableView` plugin.

There are no base plugins that implement virtual scrolling. It is designed as an alternative to an ordinary table template for the [TableView](table-view.md) plugin.

Note that the [plugin order](../README.md#plugin-order) is important.

## Basic Setup

Unlike the ordinary mode, the virtual mode requires cell size to be defined. By default, row height is adapted for a typical Bootstrap table.

The following example demonstrates the basic Grid with virtual scrolling:

.embedded-demo(virtual-scrolling/basic)

## Integration with Other Plugins

A virtual table also operates with other Grid features like filtering, sorting, etc.

The `TableRowDetail` plugin renders rows with auto height. It is impossible to handle row height changes at runtime. So you need to  specify the row height using the `rowHeight` property.

Here is an example:

.embedded-demo(virtual-scrolling/integration-with-other-plugins)
