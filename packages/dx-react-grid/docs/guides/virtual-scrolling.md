# React Grid - Virtual Scrolling

Virtual scrolling allows the Grid component to display thousands of records on a single page. You can use this feature as an alternative to paging.

**Browser Support Notes:**

- The following browsers do not support virtual scrolling because they do not support `position: sticky`:
  - Android Browser before 5.0
  - WebView for Android before 5.0
  - Internet Explorer

- Currently, there is an issue with virtual scrolling in Microsoft Edge:
  - [sticky elements flicker on scroll](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/18769340/)

## Related Plugins

The [VirtualTable](../reference/virtual-table.md) plugin implements the virtual scrolling mode, and it should be used instead of the [Table](../reference/table.md) as they implement the same interfaces.

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

The virtual table contains only the rendered rows; others are replaced with two stub rows whose heights depend on the `estimatedRowHeight` property value and change dynamically as the user scrolls.

You can change the virtual table's height using the `height` property.

The following example demonstrates the basic Grid with virtual scrolling:

.embedded-demo({ "path": "grid-virtual-scrolling/row-virtualization", "showThemeSelector": true })

The Grid also supports column virtualization, which is demonstrated in the following demo:

.embedded-demo({ "path": "grid-virtual-scrolling/column-virtualization", "showThemeSelector": true })

## Fill the Container

If the Grid should have the same size as the container element, set the `VirtualTable` plugin's `height` property to "auto" and the Grid root element's style setting to `height: 100%`.

.embedded-demo({ "path": "grid-virtual-scrolling/stretching-to-parent-element", "showThemeSelector": true })

## Scroll to Row

To scroll the table to a particular row, call the `scrollToRow` method and pass the row ID as its parameter. To call the method, you need the `VirtualTable` plugin's ref.

In the following demo, the `scrollToRow` method is used to scroll the table to a new or saved row. When you add a new row, it is added to the top of the table, and the table is scrolled to it. When you save the row, its position is changed according to sorting, and the table is scrolled to that position.

.embedded-demo({ "path": "grid-virtual-scrolling/scroll-to-row", "showThemeSelector": true })

NOTE: Scrolling to a row cannot be used with [lazy loading](./lazy-loading.md/#react-grid---virtual-scrolling-with-remote-data-lazy-loading). This is because the Grid loads rows in parts in lazy loading mode, and scrolling to a row requires all the row IDs.

## Note on the use of `VirtualTable` with `DataTypeProvider` and custom components

If you use a custom `rowComponent` or `cellComponent`, its height and the `estimatedRowHeight` value should be equal. The same applies to a custom formatter defined in the [DataTypeProvider](../reference/data-type-provider.md) plugin.
