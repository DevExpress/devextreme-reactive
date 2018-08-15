# React Grid - Fixed Columns

The Grid allows to render some of the columns fixed to its sides.

*Browser Support Note:*

- This feature does not work in Android Browser/WebView for Android earlier than 5.0 and Internet Explorer because these browsers do not support `position: sticky`.
- It also does not work correctly in Microsoft Edge because of the following [issue](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16792336/).Your vote for it is highly appreciated.

## Related Plugins

The following plugins implement the Banded Columns feature:

- [TableFixedColumns](../reference/table-fixed-columns.md) - enables fixed columns rendering

## Basic Setup

Import the [TableFixedColumns](../reference/table-fixed-columns.md) plugin and specify the names of the column which should be rendered fixed to one of Grid's sides. Use the `beforeColumnNames` property to specify columns fixed at the start of the Grid table and the `afterColumnNames` property for the columns fixed at the end.

.embedded-demo({ "path": "grid-fixed-columns/basic", "showThemeSelector": true })

## Fixing Service Columns

It is also possible to fix service columns (e.g. Selection Column, Editing Column). Use the `beforeColumnTypes` and `afterColumnTypes` properties for this purpose.

.embedded-demo({ "path": "grid-fixed-columns/with-selection", "showThemeSelector": true })

## With Other Plugins

No special setup is required to use the [TableFixedColumns](../reference/table-fixed-columns.md) plugin with other ones.

.embedded-demo({ "path": "grid-fixed-columns/bands", "showThemeSelector": true })

## Virtual Table

The plugin works smoothly with both regular and virtual tables.

.embedded-demo({ "path": "grid-fixed-columns/virtual-table", "showThemeSelector": true })
