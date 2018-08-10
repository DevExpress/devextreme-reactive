# React Chart - Axes and Grid

The axes and grid improve the visualized data's readability: axes display series point arguments and values; the grid connects series points and axis values.

## Related Plugins

The following plugins implement the axes and grid:

- `ArgumentAxis` - renders an argument axis
- `ValueAxis` - renders a value axis
- `Grid` - renders vertical or horizontal grid lines
- `Scale` - process data

## Basic Setup

Import the plugins listed above to set up a Chart with two axes and a grid.

## Axis Types

The default axis type is linear which is sutable for numeric data. The following example illustrates this axis type:

.embedded-demo({ "path": "chart-basic/default-axis", "showThemeSelector": true })

The band axis type is used to display string values. To apply it, set the axis' `type` property to `"band"` as demonstrated in the following example:

.embedded-demo({ "path": "chart-basic/band-axis", "showThemeSelector": true })

## Custom Axis Types

There is possibility to set custom types to the axes. Set the `Scale` plugin's `axisExtension` property to array, each element of it is the particular scale with options. The following example illustrates the logarithmic scale using d3 plugins:

.embedded-demo({ "path": "chart-basic/logarithm", "showThemeSelector": true })
