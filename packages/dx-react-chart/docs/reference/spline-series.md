# SplineSeries Plugin Reference

The SplineSeries plugin visualizes the spline series.

## Import

Use the following statement to import the plugin:

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
name | string | | The series name.
valueField | string | | The name of a data field that provides series point values.
argumentField | string | | The name of a data field that provides series point argument values.
scaleName? | string | | An associated scale.
color? | string | | The series color.
seriesComponent | ComponentType&lt;[SplineSeries.SeriesProps](#splineseriesseriesprops)&gt; | | A component that renders series.

## Interfaces

### SplineSeries.SeriesProps

Describes properties passed to a component that renders series.

Field | Type | Description
------|------|------------
coordinates | Array&lt;{ arg: number, val: number }&gt; | Coordinates of the series' points.
color | string | A series color.
rotated | boolean |  `true` if the chart is rotated.

### SplineSeries.PathSeriesProps

Describes properties of a component that renders series.

Extends [SplineSeries.SeriesProps](#splineseriesseriesprops)

Field | Type | Description
------|------|------------
path? | (coordinates: Array&lt;{ arg: number, val: number }&gt;) => string | A function used to calculate the series' path.

## Plugin Components

Name | Properties | Description
-----|------------|------------
SplineSeries.Path | [SplineSeries.PathSeriesProps](#splineseriespathseriesprops) | A component that renders series.
