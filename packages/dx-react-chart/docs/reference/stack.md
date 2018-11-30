# Stack Plugin Reference

The `Stack` plugin is used to display series points one under another and display bars side-by-side.

## Import

Use the following statement to import the plugin:

```js
import { Stack } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
stacks? | Array&lt;[StackData](#stackdata)&gt; | [] | A list of stacks.
order? | (data: Array&lt;[SeriesData](#seriesdata)&gt;) => Array&lt;number&gt; | [ d3.stackOrderNone](https://github.com/d3/d3-shape#stackOrderNone) | A function that gets an array of series data and returns the series order.
offset? | (data: Array&lt;[SeriesData](#seriesdata)&gt;, order: Array&lt;number&gt;) => void | [d3.stackOffsetDiverging](https://github.com/d3/d3-shape#stackOffsetDiverging) | A function that adds offsets to series data array depending on the series order.

## Interfaces

### StackData

Field | Type | Description
------|------|------------
series | Array&lt;string&gt; | A list of series names.

### SeriesData

Type: `Array<number>`

SeriesData contains data for a single series. It is an array of points (one point per argument). Each array item is an array that stores the baseline and the point value.

For example, the following array specifies a series containing points with values `10`, `20`, and `30` and the baseline at `0`: `[[0, 10], [0, 20], [0, 30]]`.
