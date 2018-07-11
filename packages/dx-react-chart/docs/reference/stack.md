# Stack Plugin Reference

The `Stack` plugin is used to display series points side-by-side or on top of each other.

## Importing

Use the following import statement:

```js
import { Stack } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
order? | (data: Array&lt;[SeriesData](#series)&gt;) => { [index: number]: number } | | A function that gets array of series data and returns a series order.
offset? | (data: Array&lt;[SeriesData](#series)&gt;, order: { [index: number]: number }) => void | | A function that modify series data array with proper offsets using series order.

## Interfaces

### SeriesData

SeriesData is the data for one series. It has array of points (one point per argument), and each point is the array of a lower and upper value defining the baseline and topline. For example, series with values 10, 20 and 30 and baseline equal to 0 has the following array: [[0, 10], [0, 20], [0, 30]].
