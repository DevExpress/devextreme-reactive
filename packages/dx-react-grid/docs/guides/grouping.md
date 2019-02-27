# React Grid - Grouping

The Grid component supports grouping data by one or several column values. Use the corresponding plugins or UI (Group Panel and column headers) to manage the grouping state and group data programmatically.

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

.embedded-demo({ "path": "grid-grouping/static", "showThemeSelector": true })

### Custom Grouping

Use the `CustomGrouping` plugin if the data has a hierarchical structure (already grouped).

In the following example, the data is specified as an array of groups. Specify the `CustomGrouping` plugin's `getChildGroups` property to parse a custom group structure.

.embedded-demo({ "path": "grid-grouping/custom-grouping-static", "showThemeSelector": true })

## Configure the Grouping UI

Use the `Toolbar`, `GroupingPanel` and `TableHeaderRow` plugins in addition to those used for the basic setup to enable the grouping UI. You can configure the UI to provide any of the following methods for specifying grouping options:

- Drag a column header to or from the Group Panel
 Import the [DragDropProvider](../reference/drag-drop-provider.md) plugin.

- Use the corresponding button in a header cell
 Assign true to the `TableHeaderRow` plugin's `showGroupingControls` and the `GroupingPanel` plugin's `showGroupingControls` properties.

You can also set the `GroupingPanel` plugin's `showSortingControls` option to true to enable sorting data by a grouped column.

In the following example, the Grid functions are in the [uncontrolled mode](controlled-and-uncontrolled-modes.md). This means that the Grid controls its grouping state internally. The initial grouping options are specified in the `GroupingState` plugin's `defaultGrouping` property.

.embedded-demo({ "path": "grid-grouping/grouping-with-ui", "showThemeSelector": true })

## Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), pass a grouping options array to the `GroupingState` plugin's `grouping` property and handle the `onGroupingChange` event to control the grid grouping state.

.embedded-demo({ "path": "grid-grouping/controlled-mode", "showThemeSelector": true })

## Disable Grouping by a Column

You can disable grouping/ungrouping for a specific column using the [GroupingState](../reference/grouping-state.md) plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-grouping/disable-column-grouping", "showThemeSelector": true })

## Built-in Grouping with Custom Values

Pass a grouping criterion function to the `IntegratedGrouping` plugin’s [columnExtensions](../reference/integrated-grouping.md#properties) property to group data by a custom key based on the specified column's value. Set the columns configuration's `showWhenGrouped` field to true to avoid hiding the column when data is grouped by this column. In the following example, data is grouped by the first letter of the "city" column's values while still displaying the column.

.embedded-demo({ "path": "grid-grouping/custom", "showThemeSelector": true })

You can also assign a Boolean value to the `TableGroupRow` plugin's `showColumnsWhenGrouped` property to define what columns should remain visible when they group data.

Note that if the grouping criterion function returns a non-primitive value, you should also specify a custom group cell template using the `TableGroupRow` plugin's `cellComponent` property as demonstrated in the following example:

.embedded-demo({ "path": "grid-grouping/custom-advanced", "showThemeSelector": true })

## Remote Grouping

You can perform remote grouping by handling grouping state changes, generating a request based on the grouping state and sending it to a server that can return grouped data.

Grouping options are updated whenever an end-user interacts with the grouping UI. Handle grouping option changes using the `GroupingState` plugin's `onGroupingChange` and `onExpandedGroupsChange` events and request data from the server using the newly applied grouping options.

Use the `CustomGrouping` plugin instead of the `IntegratedGrouping` plugin for remote grouping.

While waiting for a response from a server, there is a moment when the grouping state does not match the data in the `Grid`'s `rows` property. To avoid issues, temporarily assign the `grouping` and `expandedGroups` state fields' "old" values to the properties with the same names in the `GroupingState` plugin. This means configuration changes are not applied to the `Grid` immediately. Once the grouped data is received from the server, pass it to the `Grid` component's `rows` property and reset the `CustomGrouping` plugin's `grouping` and `expandedGroups` property values (set them to `null`). At this point, the `Grid` simultaneously applies the changes to its grouping configuration and receives the updated data set.

The following example demonstrates remote grouping with local expanding/collapsing, as well as the approach described in the previous paragraph:

.embedded-demo({ "path": "grid-grouping/remote-grouping-with-local-expanding", "showThemeSelector": true })
