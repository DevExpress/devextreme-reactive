# AreaSeries Plugin Reference

The AreaSeries plugin visualizes the area series.

## Import

Use the following statement to import the plugin:

```js
import { AreaSeries } from '@devexpress/dx-react-chart-material-ui';
// import { AreaSeries } from '@devexpress/dx-react-chart-bootstrap4';
```

You can import the themeless plugin to use custom components:

```js
import { AreaSeries } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A series name.
valueField | string | | The name of a data field that provides series point values.
argumentField | string | | The name of a data field that provides series point argument values.
scaleName? | string | | An associated scale.
color? | string | | The series color.
seriesComponent | ComponentType&lt;[AreaSeries.SeriesProps](#areaseriesseriesprops)&gt; | | A component that renders series.

## Interfaces

### AreaSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
coordinates | Array&lt;{ arg: number, val: number, startVal: number }&gt; | Coordinates of the series' points.
color | string | A series color.
rotated | boolean |  `true` if the chart is rotated.

### AreaSeries.PathSeriesProps

Describes properties of a component that renders series.

Extends [AreaSeries.SeriesProps](#areaseriesseriesprops)

Field | Type | Description
------|------|------------
path? | (coordinates: Array&lt;{ arg: number, val: number, startVal: number }&gt;) => string | A function used to calculate the series' path.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AreaSeries.Path | [AreaSeries.PathSeriesProps](#areaseriespathseriesprops) | A component that renders series.
