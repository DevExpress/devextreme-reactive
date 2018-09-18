# Vue Grid - Virtual Scrolling

Virtual scrolling allows the Grid component to display thousands of records on a single page. This feature as an alternative to paging.

**Browser Support Notes:**

- The following browsers do not support virtual scrolling because they do not support `position: sticky`:
  - Android Browser before 5.0
  - WebView for Android before 5.0
  - Internet Explorer

- Currently, there is an issue with virtual scrolling in Microsoft Edge:
  - [sticky elements flicker on scroll](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/18769340/)


## Related Plugins

The [DxVirtualTable](../reference/virtual-table.md) plugin implements the virtual scrolling mode. Use this plugin instead of [DxTable](../reference/table.md).

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

The virtual table contains only visible rows; the rows that are currently invisible are replaced with two stub rows whose height depends on the `estimatedRowHeight` property value and changes dynamically during scrolling.

You can change the virtual table's height using the `height` property.

The following example demonstrates a basic Grid with virtual scrolling:

.embedded-demo({ "path": "grid-virtual-scrolling/row-virtualization", "showThemeSelector": true })

The Grid also supports column virtualization, which is demonstrated in the following demo:

.embedded-demo({ "path": "grid-virtual-scrolling/column-virtualization", "showThemeSelector": true })
