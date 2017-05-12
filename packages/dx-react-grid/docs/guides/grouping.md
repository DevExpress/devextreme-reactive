# React Grid Data Grouping

## Overview

The grouping feature allows you to display data grouped by one or several
column values. We also provide a number of plugins that allow end-users to group grid data using the Grid's UI (group panel or column headers).

## Plugin List

There are several plugins that implement grouping features:
- [GroupingState](../reference/grouping-state.md)
- [LocalGrouping](../reference/local-grouping.md)
- [TableGroupRow](../reference/table-group-row.md)
- [TableHeaderRow](../reference/table-header-row.md)
- [GroupingPanel](../reference/grouping-panel.md)

Note that [plugin order](../README.md#plugin-order) is very important.

## Basic setup

To set up simple static Grid grouping, use the `GroupingState`, `LocalGrouping` and `TableGroupRow` plugins.

In the following example, we enable the controlled mode by defining the `grouping` property of the `GroupingState` plugin. Handling the `onGroupingChange` event is not required because there is no UI allowing a user to change grouping options.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/grouping/local-grouping-static)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/grouping/local-grouping-static.jsx)

## Grouping UI for an end-user

To enable an end-user to group data by a certain column, use the `GroupPanel` and `TableHeaderRow` plugins.

By default, the `TableHeaderRow` plugin is not configured to allow an end-user to change grouping. To enable this feature, set the `allowGrouping` property to true.

You can also enable an end-user to sort data by grouped columns. Define the `allowSorting` option of the `GroupingPanel` plugin to enable this feature.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/grouping/local-grouping-with-ui)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/grouping/local-grouping-with-ui.jsx)

## Grouping Controlled Mode

To control the grouping state, pass the appropriate array to the `grouping` property of the `GroupingState` plugin and handle the `onGroupingChange` event.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/grouping/local-grouping-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/grouping/local-grouping-controlled.jsx)

