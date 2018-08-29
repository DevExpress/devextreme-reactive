# React Grid - Fixed Columns

The Grid allows you to fix one or more first and last columns. Fixed columns are always on their initial places regardless of the current scrolling position.

**Browser Support Notes:**

- The following browsers do not support fixed columns because they do not suppoort `position: sticky`:  
 - Android Browser before 5.0  
 - WebView for Android before 5.0  
 - Internet Explorer  
 
- Currently, Microsoft Edge does not correctly support column fixing. See this [issue](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16792336/) for more information.

## Related Plugins

The following plugins implement the column fixing:

- [TableFixedColumns](../reference/table-fixed-columns.md) - renders fixed columns

## Basic Setup

Import the [TableFixedColumns](../reference/table-fixed-columns.md) plugin and specify the names of the columns that should be rendered as fixed. The `beforeColumnNames` property specifies columns fixed at the grid's left side, the `afterColumnNames` property - at the right side.

.embedded-demo({ "path": "grid-fixed-columns/basic", "showThemeSelector": true })

## Fixing Service Columns

You can also fix service columns, such as Selection Column or Editing Column, using the `beforeColumnTypes` and `afterColumnTypes` properties.

.embedded-demo({ "path": "grid-fixed-columns/with-selection", "showThemeSelector": true })

## With Other Plugins

You can use the [TableFixedColumns](../reference/table-fixed-columns.md) plugin with other plugins.

.embedded-demo({ "path": "grid-fixed-columns/bands", "showThemeSelector": true })

## Virtual Table

The plugin works smoothly with both regular and virtual tables.

.embedded-demo({ "path": "grid-fixed-columns/virtual-table", "showThemeSelector": true })
