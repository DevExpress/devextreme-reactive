# React Chart - Axes and Grid

The axes and grid help the viewer read the visualized data: axes - by displaying series point arguments and values; grid - by connecting series points with axis values.

## Related Plugins

The following plugins implement the axes and grid:

- `ArgumentAxis` - renders an argument axis
- `ValueAxis` - renders a value axis
- `Grid` - renders vertical or horizontal grid lines

## Basic Setup

Import the plugins listed above to set up a Chart with two axes and a grid.

## Axis Types

The default type for both axes is linear. It is sutable for numeric data. The following example illustrates this axis type:

.embedded-demo({ "path": "chart-basic/line.wb3", "showThemeSelector": true })

Another axis type, band, is used to display string values. To apply it, set the axis' `type` property to `"band"` as it is done in the following example:

.embedded-demo({ "path": "chart-basic/group-bar.wb3", "showThemeSelector": true })
