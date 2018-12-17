# React Chart - Scales, Axes, and Grid

The axes and grid improve the visualized data's readability: axes display series point arguments and values; the grid connects series points and axis values.

## Related Plugins

The following plugins implement the axes and grid:

- [ArgumentAxis](../reference/argument-axis.md) - renders an argument axis with grid lines.
- [ValueAxis](../reference/value-axis.md) - renders a value axis with grid lines.
- [ArgumentScale](../reference/argument-scale.md) - allows you to customize the argument scale.
- [ValueScale](../reference/value-scale.md) - allows you to customize the value scale.

## Basic Setup

Import the plugins listed above to set up a Chart with two axes and a grid.

## Scale Types

The default scale is linear. It is suitable for numeric data. The following example shows a linear scale:

.embedded-demo({ "path": "chart-basic/default-axis", "showThemeSelector": true })

The band scale is used to process string values. Set the scale's `factory` property to `scaleBand` as demonstrated in the following example to use a band scale:

.embedded-demo({ "path": "chart-basic/band-axis", "showThemeSelector": true })

## Custom Scales

You can also use custom scales. For this, assign a custom factory function to the `ArgumentScale` or `ValueScale` plugin's `factory` property. The following example demonstrates how to use a logarithmic scale with d3 plugins:

.embedded-demo({ "path": "chart-basic/logarithm", "showThemeSelector": true })
