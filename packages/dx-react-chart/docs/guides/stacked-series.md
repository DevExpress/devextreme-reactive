# React Chart - Stacked Series

The Chart component can collect line, spline, area and bar series in stacks. Stacked series require the `Stack` plugin.

## Basic Setup

Add the `Stack` plugin to draw several series side-by-side. The following example demonstrates how to draw bar series:

.embedded-demo({ "path": "chart-basic/band-axis", "showThemeSelector": true })

To draw several series one under another, you should also specify the same `stack` property value for the required series. To exclude a series from all stacks, set its `stack` property to null.

.embedded-demo({ "path": "chart-basic/bar-line", "showThemeSelector": true })

## Specify Series' Order and Offset

The `Stack` plugin allows you to customize the series order and offset. In the following example, a stacked area series is used to create a streamgraph. Order and offset values are calculated by calling the [`d3-shape`](https://github.com/d3/d3-shape/blob/master/README.md) library. Then, these values are passed to the `Stack` plugin's `order` and `offset` properties.

.embedded-demo({ "path": "chart-basic/streamgraph", "showThemeSelector": true })