# EventTracker Plugin Reference

The `EventTracker` plugin is used to handle series click.

## Import

Use the following statement to import the plugin:

```js
import { EventTracker } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
onClick? | (target: [ClickData](#clickdata)) => void | | A function that gets an object containing click event data.

## Interfaces

### ClickData

Contains click event data.

Field | Type | Description
------|------|------------
location | Array&lt;number&gt; | Coordinates `[x, y]` of a clicked point (relative to the area containing series).
targets | Array&lt;[SeriesRef](#seriesref)&gt; | List of clicked items.

### SeriesRef

Contains data to identify series or point.

Field | Type | Description
------|------|------------
series | string | Series name.
index? | number | Index in `data` array corresponding to a point (`undefined` if target is not a point).
