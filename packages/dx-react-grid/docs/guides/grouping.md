# React Grid Data Grouping

The Grid component supports grouping data by one or several column values. Use the corresponding plugins to manage the grouping state and group data programmatically or via the UI (Group Panel and column headers).

## Related Plugins

The following plugins implement grouping features:

- [GroupingState](../reference/grouping-state.md) - controls the grouping state  
- [LocalGrouping](../reference/local-grouping.md) - performs local data grouping  
- [TableGroupRow](../reference/table-group-row.md) - renders group rows  
- [TableHeaderRow](../reference/table-header-row.md) - renders the header row and implements column dragging  
- [GroupingPanel](../reference/grouping-panel.md) - renders the Group Panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic setup

Use the `GroupingState`, `LocalGrouping` and `TableGroupRow` plugins to set up a Grid with simple static grouping. 

In the following example, the grouping options are specified using the `GroupingState` plugin's `grouping` property, which is usual for the controlled mode. However, the `onGroupingChange` event handler is not specified because the grouping option is not supposed to be changed internally as the grouping UI is not available.

.embedded-demo(grouping/local-grouping-static)

## Configure the Grouping UI

Use the `GroupPanel` and `TableHeaderRow` plugins in addition to those used for the basic setup to enable the grouping UI. You can configure the UI to allow a user to use any of the following methods to specify grouping options:

- Drag a column header to or from the Group Panel  
 Set the `TableHeaderRow` and `GroupingPanel` plugins' `allowDragging` properties to true.

- Use the corresponding button in a header cell  
 Assign true to the `TableHeaderRow` plugin's `allowGroupingByClick` and the `GroupingPanel` plugin's `allowUngroupingByClick` properties.

You can also set the `GroupingPanel` plugin's `allowSorting` option to true to enable sorting data by a grouped column.

In the following example the Grid functions in the [uncontrolled mode](controlled-and-uncontrolled-modes.md). It means that the Grid controls the grouping state internally. The initial grouping options are specified in the `GroupingState` plugin's `defaultGrouping` property.

.embedded-demo(grouping/local-grouping-with-ui)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass a grouping options array to the `GroupingState` plugin's `grouping` property and handle the `onGroupingChange` event to control the grouping state.

.embedded-demo(grouping/local-grouping-controlled)
