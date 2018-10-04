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
axisName? | string | | The associated axis.
stack? | string | | The associated stack.
color? | string | | A series color.
animationName? | string | 'transform' | Animation name for series.
seriesComponent | ComponentType&lt;[AreaSeries.SeriesProps](#areaseriesseriesprops)&gt; | | A component that renders the series.

## Interfaces

### AreaSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
x | number | The x coordinate of the top left corner of the series' rendering area.
y | number | The y coordinate of the top left corner of the series' rendering area.
coordinates | Array&lt;{ x: number, y: number, y1: number }&gt; | Coordinates of the series' points.
path | (coordinates: Array&lt;any&gt;) => string | A function used to calculate the series' path.
color | string | Series color.
style | object | Series styles.
startCoords | {x: number, y: number} | Coordinates of the start position for drawing series.
animation | (item: {x: number, y: number, index: number}, startCoords: {x: number, y: number}) => object | A function returns animation options and keyframes.
prepareAnimation | (options: object) => string | A function that gets animation options and keyframes, create style for animation and return it.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AreaSeries.Path | [AreaSeries.SeriesProps](#areaseriesseriesprops) | A component that renders the series.
