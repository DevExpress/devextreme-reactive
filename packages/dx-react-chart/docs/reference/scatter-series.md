# ScatterSeries Plugin Reference

The ScatterSeries plugin visualizes the scatter series.

## Import

Use the following statement to import the plugin:

```js
import { ScatterSeries } from '@devexpress/dx-react-chart-material-ui';
// import { ScatterSeries } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { ScatterSeries } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A series name.
valueField | string | | The name of a data field that provides series point values.
argumentField | string | | The name of a data field that provides series point argument values.
axisName? | string | | The associated axis.
point? | { size : number } | point: { size: 7 } | Point options.
color? | string | | A series color.
animationName? | string | 'translate' | Animation name for series.
pointComponent | ComponentType&lt;[ScatterSeries.PointProps](#scatterseriespointprops)&gt; | | A component that renders a series point.

## Interfaces

### ScatterSeries.PointProps

Describes properties passed to a component that renders the point.

Field | Type | Description
------|------|------------
x | number | The point's x coordinate.
y | number | The point's y coordinate.
d | string | The point's [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).
value | number | The point's value.
color | string | Series color.
style | object | Series styles.
startCoords | {x: number, y: number} | Coordinates of the start position for drawing series.
animation | (item: {x: number, y: number, index: number}, startCoords: {x: number, y: number}) => object | A function returns animation options and keyframes.
prepareAnimation | (options: object) => string | A function that gets animation options and keyframes, create style for animation and return it.

### ScatterSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
pointComponent | ComponentType&lt;[ScatterSeries.PointProps](#scatterseriespointprops)&gt; | | A component that renders a series point.
coordinates | Array&lt;{ x: number, y: number }&gt; | Coordinates of the series' points.
point? | { size : number } | point: { size: 7 } | Point options.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ScatterSeries.Path | [ScatterSeries.SeriesProps](#scatterseriesseriesprops) | A component that renders the series of points.
ScatterSeries.Point | [ScatterSeries.PointProps](#scatterseriespointprops) | A component that renders a series point.
