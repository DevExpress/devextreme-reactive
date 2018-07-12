# React Chart - Stacked Series

The Chart component supports stacked series. Use `Stack` plugin and property `stack` in the series to draw points side-by-side or on top of each other, customize order and offset of the series in stacks.

## Basic Setup

To draw several series side-by-side you should only use `Stack` plugin. The following example demonstrates drawing several bar series:

.embedded-demo({ "path": "chart-basic/band-axis", "showThemeSelector": true })

To draw several series in one stack assign the same value to the `stack` property of series. If you don't want a series to be in the calculation of the stack, for example, a line series, set `stack` property to null.

.embedded-demo({ "path": "chart-basic/bar-line", "showThemeSelector": true })

## Order and offset Series

The `Stack` plugin allows to customize the series order and offset. The following example demonstrate how to show streamgraph using `stackOffsetWiggle` and `stackOrderInsideOut` methods from [`d3-shape`](https://github.com/d3/d3-shape/blob/master/README.md) (a 3rd-party plugin):

.embedded-demo({ "path": "chart-basic/streamgraph", "showThemeSelector": true })
