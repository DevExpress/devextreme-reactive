# PieSeries Plugin Reference

The PieSeries plugin visualizes pie series.

## Import

Use the following statement to import the plugin:

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
valueField | string | | The name of a data field that provides series point values.
argumentField | string | | The name of a data field that provides series point argument values.
innerRadius? | number | 0 | The inner radius in relative units.
outerRadius? | number | 1 | The outer radius in relative units.
pointComponent | ComponentType&lt;[PieSeries.PointProps](#pieseriespointprops)&gt; | | A component that renders a slice.

## Interfaces

### PieSeries.PointProps

Describes properties passed to a component that renders the slice.

Field | Type | Description
------|------|------------
x | number | The slice's x coordinate.
y | number | The slice's y coordinate.
d | string | The slice's [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).
value | number | The slice's value.
color | string | A series color.
style | object | Series styles.
index | number | Point index.

## Plugin Components

Name | Properties | Description
-----|------------|------------
PieSeries.Point | [PieSeries.PointProps](#pieseriespointprops) | A component that renders a slice.
