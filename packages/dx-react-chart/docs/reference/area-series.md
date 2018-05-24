# AreaSeries Plugin Reference

The AreaSeries plugin allows to visualize area series.

## Importing

Use the following import statement:

```js
import { AreaSeries } from '@devexpress/dx-react-chart-material-ui';
// import { AreaSeries } from '@devexpress/dx-react-chart-bootstrap4';
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
seriesComponent | ComponentType&lt;[AreaSeries.SeriesProps](#areaseriesseriesprops)&gt; | | A component that renders the series.
pointComponent | ComponentType&lt;[AreaSeries.PointProps](#areaseriespointprops)&gt; | | A component that renders the points.

## Interfaces

### AreaSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
x | number | The x coordinate for a series.
y | number | The y coordinate for a sereis.
coordinates | Array&lt;{ x: number, y: number, y1: number }&gt; | Coordinates of the points of a series.
path | (coordinates: Array&lt;any&gt;) => string | A function to calculate series path.

### AreaSeries.PointProps

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
AreaSeries.Path | [AreaSeries.SeriesProps](#areaseriesseriesprops) | A component that renders the series.
AreaSeries.Point | [AreaSeries.PointProps](#areaseriespointprops) | A component that renders the point.
