# ValueAxis Plugin Reference

The ValueAxis plugin visualizes the value axis.

## Import

Use the following statement to import the plugin:

```js
import { ValueAxis } from '@devexpress/dx-react-chart-material-ui';
// import { ValueAxis } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { ValueAxis } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tickSize? | number | 5 | The tick size.
position? | 'bottom' &#124; 'top' &#124; 'left' &#124; 'right' | 'left' | The axis position.
scaleName? | string | | The scale name.
indentFromAxis? | number | 10 | The indent from the axis.
tickFormat? | (scale: [ScaleObject](./argument-scale.md#scaleobject)) => (tick: string) => string  | | A function that returns a tick formatter function.
showTicks? | boolean | false | Specifies whether to render ticks.
showGrid? | boolean | true | Specifies whether to render the grid.
showLine? | boolean | false | Specifies whether to render the axis's line.
showLabels? | boolean | true | Specifies whether to render the axis's labels.
rootComponent | ComponentType&lt;[ValueAxis.RootProps](#valueaxisrootprops)&gt; | | A component that renders the axis root layout.
tickComponent | ComponentType&lt;[ValueAxis.LineProps](#valueaxislineprops)&gt; | | A component that renders a tick.
labelComponent | ComponentType&lt;[ValueAxis.LabelProps](#valueaxislabelprops)&gt; | | A component that renders the axis label.
lineComponent | ComponentType&lt;[ValueAxis.LineProps](#valueaxislineprops)&gt; | | A component that renders the axis line.
gridComponent | ComponentType&lt;[ValueAxis.LineProps](#valueaxislineprops)&gt; | | A component that renders the grid.

## Interfaces

### ValueAxis.RootProps

Describes properties passed to a component that renders the axis root layout.

Field | Type | Description
------|------|------------
x | number | The x coordinate of the top left corner of the axis' rendering area.
y | number | The y coordinate of the top left corner of the series' rendering area.
children | ReactNode | A React node used to render the axis.

### ValueAxis.LineProps

Describes properties passed to a component that renders the axis's line, ticks and grid.

Field | Type | Description
------|------|------------
x1 | number | The line start's x coordinate.
x2 | number | The line end's x coordinate.
y1 | number | The line start's y coordinate.
y2 | number | The line end's y coordinate.

### ValueAxis.LabelProps

Describes properties passed to a component that renders the axis label.

Field | Type | Description
------|------|------------
text | string &#124; number | The label text.
x | number | The x coordinate of the label's top left corner.
y | number | The y coordinate of the label's top left corner.
dy | string | The label's offset from the baseline in CSS units.
textAnchor | 'start' &#124; 'middle' &#124; 'end' | The label's text alignment.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ValueAxis.Root | [ValueAxis.RootProps](#valueaxisrootprops) | A component that renders the axis root layout.
ValueAxis.Tick | [ValueAxis.LineProps](#valueaxislineprops) | A component that renders the tick.
ValueAxis.Label | [ValueAxis.LabelProps](#valueaxislabelprops) | A component that renders the axis label.
ValueAxis.Line | [ValueAxis.LineProps](#valueaxislineprops) | A component that renders the axis line.
ValueAxis.Grid | [ValueAxis.LineProps](#valueaxislineprops) | A component that renders the grid.
