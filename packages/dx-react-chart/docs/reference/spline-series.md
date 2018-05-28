# SplineSeries Plugin Reference

The SplineSeries plugin allows to visualize spline series.

## Importing

Use the following import statement:

```js
import { SplineSeries } from '@devexpress/dx-react-chart-material-ui';
// import { SplineSeries } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { SplineSeries } from '@devexpress/dx-react-chart';
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
seriesComponent | ComponentType&lt;[SplineSeries.SeriesProps](#splineseriesseriesprops)&gt; | | A component that renders the series.
pointComponent | ComponentType&lt;[SplineSeries.PointProps](#splineseriespointprops)&gt; | | A component that renders the points.

## Interfaces

### SplineSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
x | number | The x coordinate for series
y | number | The y coordinate for sereis
coordinates | Array&lt;{ x: number, y: number }&gt; | Coordinates of the points
path | (coordinates: Array&lt;any&gt;) => string | A function to calculate path.

### SplineSeries.PointProps

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
SplineSeries.Path | [SplineSeries.SeriesProps](#splineseriesseriesprops) | A component that renders the series.
SplineSeries.Point | [SplineSeries.PointProps](#splineseriespointprops) | A component that renders the point.
