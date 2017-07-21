# React Grid Data Grouping

## Overview

The grouping feature allows you to display data grouped by one or several column values. We also provide plugins that allow end-users to group grid data using the Grid's UI (group panel or column headers).

## Plugin List

There are several plugins that implement grouping features:
- [GroupingState](../reference/grouping-state.md)
- [LocalGrouping](../reference/local-grouping.md)
- [TableGroupRow](../reference/table-group-row.md)
- [TableHeaderRow](../reference/table-header-row.md)
- [GroupingPanel](../reference/grouping-panel.md)

Note that [plugin order](../README.md#plugin-order) is important.

## Basic setup

Use the `GroupingState`, `LocalGrouping` and `TableGroupRow` plugins to set up a simple static Grid grouping.

In the following example, the controlled mode is enabled using the `grouping` property of the `GroupingState` plugin. You do not have to handle the `onGroupingChange` event because an end-user can not change grouping state via the UI.

.embedded-demo(grouping/local-grouping-static)

## Grouping UI for an end-user

Use the `GroupPanel` and `TableHeaderRow` plugins to enable an end-user to group data by a certain column.

Set the `TableHeaderRow` plugin's `allowDragging` property and the `GroupingPanel` plugin's `allowDragging` property to true to allow changing grouping state by dragging column headers to or from the group panel. Alternatively, you can set the `TableHeaderRow` plugin's `allowGroupingByClick` property and the `GroupingPanel` plugin's `allowUngroupingByClick` property to true to allow an end-user to change grouping state via the UI. In this case, the plugins add the appropriate buttons to header cells located in the table header row and on the grouping panel.

Define the `GroupingPanel` plugin's `allowSorting` option to enable sorting data by grouped columns.

.embedded-demo(grouping/local-grouping-with-ui)

## Grouping Controlled Mode

Pass the appropriate array to the `GroupingState` plugin's `grouping` property and handle the `onGroupingChange` event to control the grouping state.

.embedded-demo(grouping/local-grouping-controlled)

