# Stack Plugin Reference

The `Stack` plugin is used to display series points side-by-side or one under another other.

## Import

Use the following statement to import the plugin:

```js
import { Stack } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
order? | (data: Array&lt;[SeriesData](#series)&gt;) => { [index: number]: number } | | A function that gets an array of series data and returns the series order.
offset? | (data: Array&lt;[SeriesData](#series)&gt;, order: { [index: number]: number }) => void | | A function that adds the appropriate offsets to series data array depending on the series order.

## Interfaces

### SeriesData

SeriesData contains data for a single series. It is array of points (one point per argument). Each point is an array that defines the baseline and a value. For example, following array specifies a series containing points with values 10, 20, and 30 and baseline at 0: [[0, 10], [0, 20], [0, 30]].
