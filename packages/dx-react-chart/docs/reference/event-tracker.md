# EventTracker Plugin Reference

The `EventTracker` plugin allows you to handle a click on the point or series.

## Import

Use the following statement to import the plugin:

```js
import { EventTracker } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
onClick? | (target: [ClickData](#clickdata)) => void | | A function that is executed when the chart's plot is clicked.

## Interfaces

### ClickData

The click event data.

Field | Type | Description
------|------|------------
location | Array&lt;number&gt; | The clicked point's coordinates `[x, y]` (relative to the chart's plot).
targets | Array&lt;[SeriesRef](#seriesref)&gt; | An array of clicked series and points.

### SeriesRef

The object that points at a clicked series or point.

Field | Type | Description
------|------|------------
series | string | Series name.
index? | number | The point's index within the `data` array (`undefined` if the object points at a series).
