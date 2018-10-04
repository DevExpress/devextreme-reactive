# BarSeries Plugin Reference

The BarSeries plugin visualizes the bar series.

## Import

Use the following statement to import the plugin:

```js
import { BarSeries } from '@devexpress/dx-react-chart-material-ui';
// import { BarSeries } from '@devexpress/dx-react-chart-bootstrap4';
```

You can import the themeless plugin to use custom components:

```js
import { BarSeries } from '@devexpress/dx-react-chart';
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
barWidth? | number | | The bar width in relative units.
groupWidth? | number | | The bar group width in relative units.
color? | string | | A series color.
animationName? | string | 'transform' | Animation name for series.
pointComponent | ComponentType&lt;[BarSeries.PointProps](#barseriespointprops)&gt; | | A component that renders a bar.

## Interfaces

### BarSeries.PointProps

Describes properties passed to a component that renders a bar.

Field | Type | Description
------|------|------------
x | number | The bar's x coordinate.
y | number | The bar's y coordinate.
width | number | The bar width.
height | number | The bar height.
value | number | The bar's value.
color | string | Series color.
style | object | Series styles.
startCoords | {x: number, y: number} | Coordinates of the start position for drawing series.
animation | (item: {x: number, y: number, index: number}, startCoords: {x: number, y: number}) => object | A function returns animation options and keyframes.
prepareAnimation | (options: object) => string | A function that gets animation options and keyframes, create style for animation and return it.

## Plugin Components

Name | Properties | Description
-----|------------|------------
BarSeries.Point | [BarSeries.PointProps](#barseriespointprops) | A component that renders a bar.
