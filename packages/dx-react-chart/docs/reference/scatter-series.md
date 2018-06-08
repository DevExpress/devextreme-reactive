# ScatterSeries Plugin Reference

The ScatterSeries plugin visualizes the scatter series.

## Importing

Use the following import statement:

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

## Plugin Components

Name | Properties | Description
-----|------------|------------
ScatterSeries.Point | [ScatterSeries.PointProps](#scatterseriespointprops) | A component that renders a series point.
