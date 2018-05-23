# BarSeries Plugin Reference

The BarSeries plugin allows to visualize bar series.

## Importing

Use the following import statement:

```js
import { BarSeries } from '@devexpress/dx-react-chart-material-ui';
// import { BarSeries } from '@devexpress/dx-react-chart-bootstrap4';
```
## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A series name.
valueField | string | | Data field provides values for series points.
argumentField | string | | Data field provides arguments for series points.
axisName | string | | Axis to which the series is bonded.
stack | string | | Specifies which stack the series should belongs to.
barWidth | number | | Bar width in relative units.
groupWidth | number | | Bar group width in relative units.
pointComponent | ComponentType&lt;[BarSeries.PointProps](#barseriespointprops)&gt; | | A component that renders the bars.

## Interfaces

### BarSeries.PointProps

Describes properties passed to a component that renders the bar.

Field | Type | Description
------|------|------------
x | number | The x coordinate for a bar.
y | number | The y coordinate for a bar.
width | number | The width of a bar.
height | number | The height of a bar.
value | number | The value of a bar.

## Plugin Components

Name | Properties | Description
-----|------------|------------
BarSeries.Point | [BarSeries.PointProps](#barseriespointprops) | A component that renders the bar.
