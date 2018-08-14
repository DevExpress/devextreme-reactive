# React Grid - Fixed Columns

The Grid allows to render some of the columns fixed to its sides.

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
