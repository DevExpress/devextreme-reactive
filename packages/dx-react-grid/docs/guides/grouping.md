# React Grid Data Grouping

The Grid component supports grouping data by one or several column values. Use the corresponding plugins to manage the grouping state and group data programmatically or via the UI (Group Panel and column headers).

## Related Plugins

The following plugins implement grouping features:

- [GroupingState](../reference/grouping-state.md) - controls the grouping state
- [LocalGrouping](../reference/local-grouping.md) - performs local data grouping
- [CustomGrouping](../reference/custom-grouping.md) - converts custom formatted grouped data to a supported format
- [TableGroupRow](../reference/table-group-row.md) - renders group rows
- [TableHeaderRow](../reference/table-header-row.md) - renders the header row and implements column dragging
- [GroupingPanel](../reference/grouping-panel.md) - renders the Group Panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Grouping Setup

Use the `GroupingState`, `LocalGrouping` (or `CustomGrouping`) and `TableGroupRow` plugins to set up a Grid with simple static grouping.

In the following examples, the grouping options are specified using the `GroupingState` plugin's `grouping` property, which is usual for the controlled mode. However, the `onGroupingChange` event handler is not specified because the grouping option is not supposed to be changed internally as the grouping UI is not available.

### Local Grouping

In the following example, the data is specified as plain rows. In this case, the data should be grouped locally using the `LocalGrouping` plugin.

.embedded-demo(grouping/local-grouping-static)

### Custom Grouping

If the data has a hierarchical structure (already grouped), use the `CustomGrouping` plugin.

In the following example, the data is specified as an array of groups. Specify the `CustomGrouping` plugin's `getChildGroups` property to parse a custom group structure.

.embedded-demo(grouping/custom-grouping-static)

## Configure the Grouping UI

Use the `GroupPanel` and `TableHeaderRow` plugins in addition to those used for the basic setup to enable the grouping UI. You can configure the UI to allow a user to use any of the following methods to specify grouping options:

- Drag a column header to or from the Group Panel
 Set the `TableHeaderRow` and `GroupingPanel` plugins' `allowDragging` properties to true.

- Use the corresponding button in a header cell
 Assign true to the `TableHeaderRow` plugin's `allowGroupingByClick` and the `GroupingPanel` plugin's `allowUngroupingByClick` properties.

You can also set the `GroupingPanel` plugin's `allowSorting` option to true to enable sorting data by a grouped column.

In the following example the Grid functions are in the [uncontrolled mode](controlled-and-uncontrolled-modes.md). This means that the Grid controls the grouping state internally. The initial grouping options are specified in the `GroupingState` plugin's `defaultGrouping` property.

.embedded-demo(grouping/local-grouping-with-ui)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass a grouping options array to the `GroupingState` plugin's `grouping` property and handle the `onGroupingChange` event to control the grouping state.

.embedded-demo(grouping/local-grouping-controlled)

## Local Grouping with Custom Values

Pass a grouping function to the `LocalGrouping` plugin’s [getColumnIdentity](../reference/local-grouping.md#properties) property to group data by a custom key based on the specified column's value. Set the `showWhenGrouped` field of the columns configuration to true to avoid hiding the column when data is grouped by this column. In the following example, data is grouped by the first letter of the "city" column's values while still displaying the column.

.embedded-demo(grouping/local-grouping-custom)

You can also assign a function that returns a Boolean value depending on the `columnName` parameter value to the `TableGroupRow` plugin's `showColumnWhenGrouped` property to define which columns should remain visible when data is grouped by them.

```js
  <Grid>
    <GroupingState
      grouping={[{ columnName: 'city' }, { columnName: 'car' }]}
    />
    <LocalGrouping />
    <TableView />
    <TableHeaderRow showColumnWhenGrouped={columnName => columnName === 'city' || columnName === 'car'}/>
    <TableGroupRow />
  </Grid>
```

Note that if the `getColumnIdentity` function returns an object, you should also specify a custom group cell template using the `TableGroupRow` plugin's `groupCellTemplate` property as demonstrated in the following example:

.embedded-demo(grouping/local-grouping-custom-advanced)

## Remote Grouping

You can perform grouping remotely by handling grouping state changes, generating a request based on grouping state and sending it to a server that can return grouped data.

Grouping options are updated whenever an end-user interacts with the grouping UI. Handle grouping option changes using the `GroupingState` plugin's `onGroupingChange` and `onExpandedGroupsChange` events and request data from the server using the newly applied grouping options.

For remote grouping, you should use the `CustomGrouping` plugin instead of the `LocalGrouping` plugin.

While waiting for a response from a server, there is a timeframe where the grouping state does not match the data available to the `Grid` in its `rows` property. To avoid any issues due to this discrepancy, you should temporarily assign the "old" values of the `grouping` and `expandedGroups` state fields to the properties with the same names on the `GroupingState` plugin. The result is that the `Grid` does not yet see the configuration change. Once the grouped data is received from the server, pass it to the `Grid` component's `rows` property and reset the `CustomGrouping` plugin's `grouping` and `expandedGroups` property values (set them to `null`). At this point, the `Grid` becomes aware of the change to its grouping configuration, and it reeceives the updated set of data at the same time.

The following example demonstrates remote grouping with local expanding/collapsing, as well as the approach outlined in the previous paragraph:

.embedded-demo(grouping/remote-grouping-with-local-expanding)
