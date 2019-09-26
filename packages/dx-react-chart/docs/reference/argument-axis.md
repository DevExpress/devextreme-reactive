# ArgumentAxis Plugin Reference

The ArgumentAxis plugin visualizes the argument axis.

## Import

Use the following statement to import a plugin:

```js
import { ArgumentAxis } from '@devexpress/dx-react-chart-material-ui';
// import { ArgumentAxis } from '@devexpress/dx-react-chart-bootstrap4';
```

You can import the themeless plugin to use custom components:

```js
import { ArgumentAxis } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tickSize? | number | 5 | The tick size.
position? | 'bottom' &#124; 'top' &#124; 'left' &#124; 'right' | 'bottom' | The axis position.
indentFromAxis? | number | 10 | The indent from the axis.
tickFormat? | (scale: [ScaleObject](./argument-scale.md#scaleobject)) => (tick: string) => string  | | A function that returns a tick formatter function.
showTicks? | boolean | true | Specifies whether to render ticks.
showGrid? | boolean | false | Specifies whether to render the grid.
showLine? | boolean | true | Specifies whether to render the axis's line.
showLabels? | boolean | true | Specifies whether to render the axis's labels.
rootComponent | ComponentType&lt;[ArgumentAxis.RootProps](#argumentaxisrootprops)&gt; | |  A component that renders the axis's root layout.
tickComponent | ComponentType&lt;[ArgumentAxis.LineProps](#argumentaxislineprops)&gt; | | A component that renders a tick.
labelComponent | ComponentType&lt;[ArgumentAxis.LabelProps](#argumentaxislabelprops)&gt; | | A component that renders the axis's label.
lineComponent | ComponentType&lt;[ArgumentAxis.LineProps](#argumentaxislineprops)&gt; | | A component that renders the axis's line.
gridComponent | ComponentType&lt;[ArgumentAxis.LineProps](#argumentaxislineprops)&gt; | | A component that renders the grid.

## Interfaces

### ArgumentAxis.RootProps

Describes properties passed to a component that renders the axis's root layout.

Field | Type | Description
------|------|------------
x | number | The x coordinate of the top left corner of the axis's rendering area.
y | number | The y coordinate of the top left corner of the series' rendering area.
children | ReactNode | A React node used to render the axis.

### ArgumentAxis.LineProps

Describes properties passed to a component that renders the axis's line, ticks and grid.

Field | Type | Description
------|------|------------
x1 | number | The x coordinate of the line's start.
x2 | number | The x coordinate of the line's end.
y1 | number | The y coordinate of the line's start.
y2 | number | The y coordinate of the line's end.

### ArgumentAxis.LabelProps

Describes properties passed to a component that renders the axis's label.

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
ArgumentAxis.Root | [ArgumentAxis.RootProps](#argumentaxisrootprops) | A component that renders the axis's root layout.
ArgumentAxis.Tick | [ArgumentAxis.LineProps](#argumentaxislineprops) | A component that renders the tick.
ArgumentAxis.Label | [ArgumentAxis.LabelProps](#argumentaxislabelprops) | A component that renders the axis's label.
ArgumentAxis.Line | [ArgumentAxis.LineProps](#argumentaxislineprops) | A component that renders the axis's line.
ArgumentAxis.Grid | [ArgumentAxis.LineProps](#argumentaxislineprops) | A component that renders the grid.
