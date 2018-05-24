# ScatterSeries Plugin Reference

The ScatterSeries plugin allows to visualize scatter series.

## Importing

Use the following import statement:

```js
import { ScatterSeries } from '@devexpress/dx-react-chart-material-ui';
// import { ScatterSeries } from '@devexpress/dx-react-chart-bootstrap4';
```
## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A series name.
valueField | string | | Data field provides values for series points.
argumentField | string | | Data field provides arguments for series points.
axisName? | string | | Axis to which the series is bonded.
point? | { size : number } | point: { size: 7 } | Specifies point options.
pointComponent | ComponentType&lt;[ScatterSeries.PointProps](#scatterseriespointprops)&gt; | | A component that renders the points.

## Interfaces

### ScatterSeries.PointProps

Describes properties passed to a component that renders the point.

Field | Type | Description
------|------|------------
x | number | The x coordinate for a point.
y | number | The y coordinate for a point.
d | string | The path of a point.
value | number | The value of a point.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ScatterSeries.Point | [ScatterSeries.PointProps](#scatterseriespointprops) | A component that renders the point.
