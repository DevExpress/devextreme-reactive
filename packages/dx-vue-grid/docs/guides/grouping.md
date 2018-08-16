# Vue Grid - Grouping

The Grid component supports grouping data by one or several column values. Use the corresponding plugins or UI (Group Panel and column headers) to manage the grouping state and group data programmatically.

## Related Plugins

The following plugins implement grouping features:

- [DxGroupingState](../reference/grouping-state.md) - controls the grouping state
- [DxIntegratedGrouping](../reference/integrated-grouping.md) - performs built-in data grouping
- [DxCustomGrouping](../reference/custom-grouping.md) - converts custom formatted grouped data to a supported format
- [DxTableGroupRow](../reference/table-group-row.md) - renders group rows
- [DxTableHeaderRow](../reference/table-header-row.md) - renders the header row
- [DxToolbar](../reference/toolbar.md) - renders the Grid Toolbar
- [DxGroupingPanel](../reference/grouping-panel.md) - renders the Group Panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `DxGroupingState`, `DxIntegratedGrouping` (or `DxCustomGrouping`) and `DxTableGroupRow` plugins to set up a Grid with simple static grouping.

Specify the expanded group keys in the `DxGroupingState` plugin's `expandedGroups` property and subscribe to the `update:expandedGroups` event to control group expanding/collapsing. Use the `.sync` modifier for two-way binding.

In the following examples, the grouping options are specified using the `DxGroupingState` plugin's `grouping` property. However, the `update:grouping` event handler is not specified because the grouping option is not supposed to be changed internally as the grouping UI is not available.

### Built-in Grouping

In the following example, the data is specified as plain rows. In this case, the data should be grouped using the `DxIntegratedGrouping` plugin.

.embedded-demo({ "path": "grid-grouping/static", "showThemeSelector": true })

### Custom Grouping

Use the `DxCustomGrouping` plugin if the data has a hierarchical structure (already grouped).

In the following example, the data is specified as an array of groups. Specify the `DxCustomGrouping` plugin's `getChildGroups` property to parse a custom group structure.

.embedded-demo({ "path": "grid-grouping/custom-grouping-static", "showThemeSelector": true })

## Configure the Grouping UI

Use the `DxToolbar`, `DxGroupingPanel` and `DxTableHeaderRow` plugins in addition to those used for the basic setup to enable the grouping UI. You can configure the UI to provide any of the following methods for specifying grouping options:

- Use the corresponding button in a header cell
 Assign true to the `DxTableHeaderRow` plugin's `showGroupingControls` and the `DxGroupingPanel` plugin's `showGroupingControls` properties.

You can also set the `DxGroupingPanel` plugin's `showSortingControls` option to true to enable sorting data by a grouped column.

Specify the grouping options in the `DxGroupingState` plugin's `grouping` property and subscribe to the `update:grouping` event. Use the `.sync` modifier for two-way binding.

.embedded-demo({ "path": "grid-grouping/grouping-with-ui", "showThemeSelector": true })

## Disable Grouping by a Column

You can disable grouping/ungrouping for a specific column using the [DxGroupingState](../reference/grouping-state.md) plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-grouping/disable-column-grouping", "showThemeSelector": true })

## Built-in Grouping with Custom Values

Pass a grouping criterion function to the `DxIntegratedGrouping` plugin’s [columnExtensions](../reference/integrated-grouping.md#properties) property to group data by a custom key based on the specified column's value. Set the columns configuration's `showWhenGrouped` field to true to avoid hiding the column when data is grouped by this column. In the following example, data is grouped by the first letter of the "city" column's values while still displaying the column.

.embedded-demo({ "path": "grid-grouping/custom", "showThemeSelector": true })

You can also assign a Boolean value to the `DxTableGroupRow` plugin's `showColumnsWhenGrouped` property to define what columns should remain visible when they group data.

Note that if the grouping criterion function returns a non-primitive value, you should also specify a custom group cell template using the `DxTableGroupRow` plugin's `cellComponent` property as demonstrated in the following example:

.embedded-demo({ "path": "grid-grouping/custom-advanced", "showThemeSelector": true })

## Remote Grouping

You can perform remote grouping by handling grouping state changes, generating a request based on the grouping state and sending it to a server that can return grouped data.

Grouping options are updated whenever an end-user interacts with the grouping UI. Handle grouping option changes using the `DxGroupingState` plugin's `update:grouping` and `update:expandedGroups` events and request data from the server using the newly applied grouping options.

Use the `CustomGrouping` plugin instead of the `DxIntegratedGrouping` plugin for remote grouping.

While waiting for a response from a server, there is a moment when the grouping state does not match the data in the `DxGrid`'s `rows` property. To avoid issues, temporarily assign the `grouping` and `expandedGroups` state fields' "old" values to the properties with the same names in the `DxGroupingState` plugin. This means configuration changes are not applied to the `DxGrid` immediately. Once the grouped data is received from the server, pass it to the `DxGrid` component's `rows` property and reset the `DxCustomGrouping` plugin's `grouping` and `expandedGroups` property values (set them to `null`). At this point, the `DxGrid` simultaneously applies the changes to its grouping configuration and receives the updated data set.

The following example demonstrates remote grouping with local expanding/collapsing, as well as the approach described in the previous paragraph:

.embedded-demo({ "path": "grid-grouping/remote-grouping-with-local-expanding", "showThemeSelector": true })
