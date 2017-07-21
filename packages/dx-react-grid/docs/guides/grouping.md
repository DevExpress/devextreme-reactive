# React Grid Data Grouping

## Overview

The grouping feature allows you to display data grouped by one or several column values. We also provide a number of plugins that allow end-users to group grid data using the Grid's UI (group panel or column headers).

## Plugin List

There are several plugins that implement grouping features:
- [GroupingState](../reference/grouping-state.md)
- [LocalGrouping](../reference/local-grouping.md)
- [TableGroupRow](../reference/table-group-row.md)
- [TableHeaderRow](../reference/table-header-row.md)
- [GroupingPanel](../reference/grouping-panel.md)

Note that [plugin order](../README.md#plugin-order) is important.

## Basic setup

To set up a simple static Grid grouping, use the `GroupingState`, `LocalGrouping` and `TableGroupRow` plugins.

In the following example, the controlled mode is enabled using the `grouping` property of the `GroupingState` plugin. You do not have to handle the `onGroupingChange` event because an end-user can not change grouping options via the UI.

.embedded-demo(grouping/local-grouping-static)

## Grouping UI for an end-user

Use the `GroupPanel` and `TableHeaderRow` plugins to enable an end-user to group data by a certain column.

Set the `allowDragging` property of the `TableHeaderRow` plugin and the `allowDragging` property of the `GroupingPanel` plugin to true to allow changing of grouping options by dragging column headers to or from the group panel. Alternatively, you can set the `allowGroupingByClick` property of the `TableHeaderRow` plugin and the `allowUngroupingByClick` property of the `GroupingPanel` plugin to true to allow an end-user to change grouping option via the UI. In this case, the plugins add the appropriate buttons to header cells located in the table header row and on the grouping panel.

Define the `allowSorting` option of the `GroupingPanel` plugin to enable sorting data by grouped columns.

.embedded-demo(grouping/local-grouping-with-ui)

## Grouping Controlled Mode

To control the grouping state, pass the appropriate array to the `grouping` property of the `GroupingState` plugin and handle the `onGroupingChange` event.

.embedded-demo(grouping/local-grouping-controlled)

