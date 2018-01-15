# React Grid Data Grouping

The Grid component supports grouping data by one or several column values. Use the corresponding plugins to manage the grouping state and group data programmatically or via the UI (Group Panel and column headers).

## Related Plugins

The following plugins implement grouping features:

- [GroupingState](../reference/grouping-state.md) - controls the grouping state
- [IntegratedGrouping](../reference/integrated-grouping.md) - performs built-in data grouping
- [CustomGrouping](../reference/custom-grouping.md) - converts custom formatted grouped data to a supported format
- [TableGroupRow](../reference/table-group-row.md) - renders group rows
- [TableHeaderRow](../reference/table-header-row.md) - renders the header row and implements column dragging
- [Toolbar](../reference/toolbar.md) - renders the Grid Toolbar
- [GroupingPanel](../reference/grouping-panel.md) - renders the Group Panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `GroupingState`, `IntegratedGrouping` (or `CustomGrouping`) and `TableGroupRow` plugins to set up a Grid with simple static grouping.

In the following examples, the grouping options are specified using the `GroupingState` plugin's `grouping` property, which is usual for the controlled mode. However, the `onGroupingChange` event handler is not specified because the grouping option is not supposed to be changed internally as the grouping UI is not available.

### Built-in Grouping

In the following example, the data is specified as plain rows. In this case, the data should be grouped using the `IntegratedGrouping` plugin.

.embedded-demo(grouping/static)

### Custom Grouping

If the data has a hierarchical structure (already grouped), use the `CustomGrouping` plugin.

In the following example, the data is specified as an array of groups. Specify the `CustomGrouping` plugin's `getChildGroups` property to parse a custom group structure.

.embedded-demo(grouping/custom-grouping-static)

## Configure the Grouping UI

Use the `Toolbar`, `GroupingPanel` and `TableHeaderRow` plugins in addition to those used for the basic setup to enable the grouping UI. You can configure the UI to allow a user to use any of the following methods to specify grouping options:

- Drag a column header to or from the Group Panel
 Import the [DragDropProvider](../reference/drag-drop-provider.md) plugin.

- Use the corresponding button in a header cell
 Assign true to the `TableHeaderRow` plugin's `showGroupingControls` and the `GroupingPanel` plugin's `showGroupingControls` properties.

You can also set the `GroupingPanel` plugin's `showSortingControls` option to true to enable sorting data by a grouped column.

In the following example, the Grid functions are in [uncontrolled mode](controlled-and-uncontrolled-modes.md). This means that the Grid controls its grouping state internally. The initial grouping options are specified in the `GroupingState` plugin's `defaultGrouping` property.

.embedded-demo(grouping/grouping-with-ui)

## Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), pass a grouping options array to the `GroupingState` plugin's `grouping` property and handle the `onGroupingChange` event to control the grid grouping state.

.embedded-demo(grouping/controlled-mode)

## Built-in Grouping with Custom Values

Pass a grouping criterion function to the `IntegratedGrouping` plugin’s [columnExtensions](../reference/integrated-grouping.md#properties) property to group data by a custom key based on the specified column's value. Set the `showWhenGrouped` field of the columns configuration to true to avoid hiding the column when data is grouped by this column. In the following example, data is grouped by the first letter of the "city" column's values while still displaying the column.

.embedded-demo(grouping/custom)

You can also assign a Boolean value to the `TableGroupRow` plugin's `showColumnsWhenGrouped` property to define what columns should remain visible when data is grouped by them.

Note that if the grouping criterion function returns a non-primitive value, you should also specify a custom group cell template using the `TableGroupRow` plugin's `cellComponent` property as demonstrated in the following example:

.embedded-demo(grouping/custom-advanced)

## Remote Grouping

You can perform grouping remotely by handling grouping state changes, generating a request based on grouping state and sending it to a server that can return grouped data.

Grouping options are updated whenever an end-user interacts with the grouping UI. Handle grouping option changes using the `GroupingState` plugin's `onGroupingChange` and `onExpandedGroupsChange` events and request data from the server using the newly applied grouping options.

For remote grouping, you should use the `CustomGrouping` plugin instead of the `IntegratedGrouping` plugin.

While waiting for a response from a server, there is a timeframe where the grouping state does not match the data available to the `Grid` in its `rows` property. To avoid any issues, temporarily assign the `grouping` and `expandedGroups` state fields' "old" values to the properties with the same names in the `GroupingState` plugin. The result is that the `Grid` does not yet see the configuration change. Once the grouped data is received from the server, pass it to the `Grid` component's `rows` property and reset the `CustomGrouping` plugin's `grouping` and `expandedGroups` property values (set them to `null`). At this point, the `Grid` becomes aware of the change to its grouping configuration, and it receives the updated data set at the same time.

The following example demonstrates remote grouping with local expanding/collapsing, as well as the approach outlined in the previous paragraph:

.embedded-demo(grouping/remote-grouping-with-local-expanding)
