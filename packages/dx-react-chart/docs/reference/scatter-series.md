# ScatterSeries Plugin Reference

The ScatterSeries plugin visualizes the scatter series.

## Import

Use the following statement to import the plugin:

```js
import { ScatterSeries } from '@devexpress/dx-react-chart-material-ui';
// import { ScatterSeries } from '@devexpress/dx-react-chart-bootstrap4';
```

You can import the themeless plugin if you want to use custom components:

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
scaleName? | string | | The associated scale.
point? | { size : number } | point: { size: 7 } | Point options.
color? | string | | A series color.
pointComponent | ComponentType&lt;[ScatterSeries.PointProps](#scatterseriespointprops)&gt; | | A component that renders a series point.

## Interfaces

### ScatterSeries.PointProps

Describes properties passed to a component that renders the point.

Field | Type | Description
------|------|------------
arg | number | The point's argument.
val | number | The point's value.
point | { size : number } | Point options.
value | number | The point's value.
color | string | A series color.
index | number | Point index.
rotated | boolean |  `true` if the chart is rotated.

### ScatterSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
pointComponent | ComponentType&lt;[ScatterSeries.PointProps](#scatterseriespointprops)&gt; | | A component that renders a series point.
coordinates | Array&lt;{ arg: number, val: number }&gt; | Coordinates of the series' points.
point? | { size : number } | point: { size: 7 } | Point options.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ScatterSeries.Path | [ScatterSeries.SeriesProps](#scatterseriesseriesprops) | A component that renders the series of points.
ScatterSeries.Point | [ScatterSeries.PointProps](#scatterseriespointprops) | A component that renders a series point.
