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
name | string | | The series name.
valueField | string | | The name of a data field that provides series point values.
argumentField | string | | The name of a data field that provides series point argument values.
axisName? | string | | An associated axis.
barWidth? | number | | The bar width in relative units.
color? | string | | The series color.
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
color | string | The series color.
style | object | Series styles.
index | number | Point index.

## Plugin Components

Name | Properties | Description
-----|------------|------------
BarSeries.Point | [BarSeries.PointProps](#barseriespointprops) | A component that renders a bar.
