# PieSeries Plugin Reference

The PieSeries plugin allows to visualize pie series.

## Importing

Use the following import statement:

```js
import { PieSeries } from '@devexpress/dx-react-chart-material-ui';
// import { PieSeries } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { PieSeries } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A series name.
valueField | string | | Data field provides values for series points.
argumentField | string | | Data field provides arguments for series points.
innerRadius? | number | 0 | Inner radius in relative units.
outerRadius? | number | 1 | Outer radius in relative units.
pointComponent | ComponentType&lt;[PieSeries.PointProps](#pieseriespointprops)&gt; | | A component that renders a slice.

## Interfaces

### PieSeries.PointProps

Describes properties passed to a component that renders the slice.

Field | Type | Description
------|------|------------
x | number | The x coordinate for a slice.
y | number | The y coordinate for a slice.
d | string | The path of a slice.
value | number | The value of a slice.

## Plugin Components

Name | Properties | Description
-----|------------|------------
PieSeries.Point | [PieSeries.PointProps](#pieseriespointprops) | A component that renders a slice.
