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
scaleName? | string | | An associated scale.
barWidth? | number | | The bar width in relative units.
color? | string | | The series color.
pointComponent | ComponentType&lt;[BarSeries.PointProps](#barseriespointprops)&gt; | | A component that renders a bar.

## Interfaces

### BarSeries.PointProps

Describes properties passed to a component that renders a bar.

Field | Type | Description
------|------|------------
arg | number | The bar's argument; corresponds to the bar's center.
val | number | The bar's value; corresponds to the bar's top.
startVal | number | The bar's start value; corresponds to the bar's bottom.
barWidth | number | The bar's width in relative units.
maxBarWidth | number | The maximum width that the bar can occupy, measured in pixels.
value | number | The bar's value.
color | string | A series color.
index | number | Point index.
rotated | boolean |  `true` if the chart is rotated.

## Plugin Components

Name | Properties | Description
-----|------------|------------
BarSeries.Point | [BarSeries.PointProps](#barseriespointprops) | A component that renders a bar.
