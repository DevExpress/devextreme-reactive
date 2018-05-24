# LineSeries Plugin Reference

The LineSeries plugin allows to visualize line series.

## Importing

Use the following import statement:

```js
import { LineSeries } from '@devexpress/dx-react-chart-material-ui';
// import { LineSeries } from '@devexpress/dx-react-chart-bootstrap4';
```
## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A series name.
valueField | string | | Data field provides values for series points.
argumentField | string | | Data field provides arguments for series points.
axisName? | string | | Axis to which the series is bonded.
stack? | string | | Specifies which stack the series should belongs to.
point? | { size : number } | point: { size: 7 } | Specifies point options.
seriesComponent | ComponentType&lt;[LineSeries.SeriesProps](#lineseriesseriesprops)&gt; | | A component that renders the series.
pointComponent | ComponentType&lt;[LineSeries.PointProps](#lineseriespointprops)&gt; | | A component that renders the points.

## Interfaces

### LineSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
x | number | The x coordinate for series
y | number | The y coordinate for sereis
coordinates | Array&lt;{ x: number, y: number }&gt; | Coordinates of the points
path | (coordinates: Array&lt;any&gt;) => string | A function to calculate path.

### LineSeries.PointProps

Describes properties passed to a component that renders the point.

Field | Type | Description
------|------|------------
x | number | The x coordinate for a point.
y | number | The y coordinate for a point.
d | string | The path of a point.
value | number | The value of a point.

## Plugin Components

Name | Properties | Description
-----|------------|------------
LineSeries.Path | [LineSeries.SeriesProps](#lineseriesseriesprops) | A component that renders the series.
LineSeries.Point | [LineSeries.PointProps](#lineseriespointprops) | A component that renders the point.
