# DataGrid Grouping

## Overview

The grouping feature allows you to display data grouped by one or several
column values. We also provide a number of plugins that allow end-users to group data within the grid interacting with the DataGrid's grouping UI such as a group panel or column headers.

## Plugin List

There are several plugins that implement grouping features:
- [GroupingState](../reference/grouping-state.md)
- [LocalGrouping](../reference/local-grouping.md)
- [TableGroupRow](../reference/table-group-row.md)
- [TableHeaderRowGrouping](../reference/table-header-row-grouping.md)
- [GroupingPanel](../reference/grouping-panel.md)
- [GroupingPanelSorting](../reference/grouping-panel-sorting.md)

Note that [plugin order](../README.md#plugin-order) is very important.

## Basic setup

To set up a simple static DataGrid grouping, use the `GroupingState`, `LocalGrouping` and `TableGroupRow` plugins.

In the following example, we use the controlled mode by specifying the `grouping` property of the `GroupingState` plugin. Since there is no UI and the end-user can't change grouping, it's not necessary to handle the `groupingChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/grouping/local-grouping-static)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/grouping/local-grouping-static.jsx)

## Grouping UI for an end-user

Sometimes it's necessary to allow end-users to manage which columns should be used to group by. It can be handy for different analysis or data search scenarios.

To add this functionality, use the `GroupingPanel` and `TableHeaderRowGrouping` plugins. In case you are using the DataGrid's sorting features, you might also need the `GroupingPanelSorting` plugin to allow the end-user to change sorting by grouped columns.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/grouping/local-grouping-with-ui)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/grouping/local-grouping-with-ui.jsx)

## Grouping Controlled Mode

To control the grouping state from the outside, pass the grouping array to the `grouping` property of the `GroupingState` plugin and handle the `groupingChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/grouping/local-grouping-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/grouping/local-grouping-controlled.jsx)

