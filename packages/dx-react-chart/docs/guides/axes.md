# React Chart - Axes

The Chart component allows to show argument and value axes, and their grids.

## Related Plugins

The following plugins implement axes:

- ArgumentAxis - renders argument axis
- ValueAxis - renders value axis
- Grid - renders grids

## Basic Setup

Import the plugins listed above to set up a Chart with axes and grids.

## Axis Type

By default axes are linear. The following example demonstrates displaying numeric data on the argument and value axis.

.embedded-demo({ "path": "chart-basic/line.wb3", "showThemeSelector": true })

To display string values on an axis set the property type to 'band'. The following example show string values on the argument axis.

.embedded-demo({ "path": "chart-basic/group-bar.wb3", "showThemeSelector": true })
