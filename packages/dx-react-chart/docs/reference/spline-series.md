# SplineSeries Plugin Reference

The SplineSeries plugin visualizes the spline series.

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
valueField | string | | The name of a data field that provides series point values.
argumentField | string | | The name of a data field that provides series point argument values.
axisName? | string | | The associated axis.
stack? | string | | The associated stack.
point? | { size : number } | point: { size: 7 } | Point options.
seriesComponent | ComponentType&lt;[SplineSeries.SeriesProps](#splineseriesseriesprops)&gt; | | A component that renders the series.
pointComponent | ComponentType&lt;[SplineSeries.PointProps](#splineseriespointprops)&gt; | | A component that renders a series point.

## Interfaces

### SplineSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
x | number | The x coordinate of the top left corner of the series' rendering area.
y | number | The y coordinate of the top left corner of the series' rendering area.
coordinates | Array&lt;{ x: number, y: number }&gt; | Coordinates of the series' points.
path | (coordinates: Array&lt;any&gt;) => string | A function used to calculate the series' path.

### SplineSeries.PointProps

Describes properties passed to a component that renders the point.

Field | Type | Description
------|------|------------
x | number | The point's x coordinate.
y | number | The point's y coordinate.
d | string | The point's [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).
value | number | The point's value.

## Plugin Components

Name | Properties | Description
-----|------------|------------
SplineSeries.Path | [SplineSeries.SeriesProps](#splineseriesseriesprops) | A component that renders the series.
SplineSeries.Point | [SplineSeries.PointProps](#splineseriespointprops) | A component that renders a series point.
