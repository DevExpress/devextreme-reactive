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
