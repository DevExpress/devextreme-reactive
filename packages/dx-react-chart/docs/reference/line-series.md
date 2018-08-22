# LineSeries Plugin Reference

The LineSeries plugin visualizes the line series.

## Importing

Use the following import statement:

```js
import { LineSeries } from '@devexpress/dx-react-chart-material-ui';
// import { LineSeries } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { LineSeries } from '@devexpress/dx-react-chart';
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
seriesComponent | ComponentType&lt;[LineSeries.SeriesProps](#lineseriesseriesprops)&gt; | | A component that renders the series.

## Interfaces

### LineSeries.SeriesProps

Describes properties passed to a component that renders the series.

Field | Type | Description
------|------|------------
x | number | The x coordinate of the top left corner of the series' rendering area.
y | number | The y coordinate of the top left corner of the series' rendering area.
coordinates | Array&lt;{ x: number, y: number }&gt; | Coordinates of the series' points.
path | (coordinates: Array&lt;any&gt;) => string | A function used to calculate the series' path.

## Plugin Components

Name | Properties | Description
-----|------------|------------
LineSeries.Path | [LineSeries.SeriesProps](#lineseriesseriesprops) | A component that renders the series.
