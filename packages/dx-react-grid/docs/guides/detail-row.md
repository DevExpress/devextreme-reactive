# Grid Detail Row

## Overview

The 'Detail Row' feature allows you to display extended representation of a data row that can be expanded/collapsed either programmatically or via an end-user interaction with the Grid UI.

## Plugin List

Only one plugin is required to enable this feature:
- [TableRowDetail](../reference/table-row-detail.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Detail Row Setup

To set up a simple Grid with detail rows, you need to use the `TableRowDetail` plugin. Specify the detail row template via the `template` property of the plugin. In uncontrolled state mode, you can also pass IDs of rows that should be initially expanded into the `defaultExpandedRows` property of the same plugin, and the expanded state will be managed by the plugin internally.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/detail-row/simple-detail-row)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/detail-row/simple-detail-row.jsx)

## Controlled Expanded State Mode

To control the expanded state of the detail rows from the outside, pass an array of the expanded row IDs to the `expandedRows` property of the `TableRowDetail` plugin and handle the `onExpandedRowsChange` event of the same plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/detail-row/detail-row-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/detail-row/detail-row-controlled.jsx)

