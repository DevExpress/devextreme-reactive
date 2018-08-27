# ArgumentAxis Plugin Reference

The ArgumentAxis plugin visualizes the argument axis.

## Import

Use the following statement to import the plugin:

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
position? | 'bottom' &#124; 'top' | 'bottom' | The axis position.
name? | string | | The axis name.
indentFromAxis? | number | 10 | The indent from the axis.
type? | 'band' &#124; 'linear' | | Axis type.
rootComponent | ComponentType&lt;[ArgumentAxis.RootProps](#argumentaxisrootprops)&gt; | |  A component that renders the axis root layout.
tickComponent | ComponentType&lt;[ArgumentAxis.TickProps](#argumentaxistickprops)&gt; | | A component that renders a tick.
labelComponent | ComponentType&lt;[ArgumentAxis.LabelProps](#argumentaxislabelprops)&gt; | | A component that renders the axis label.
lineComponent | ComponentType&lt;[ArgumentAxis.LineProps](#argumentaxislineprops)&gt; | | A component that renders the axis line.

## Interfaces

### ArgumentAxis.RootProps

Describes properties passed to a component that renders the axis root layout.

Field | Type | Description
------|------|------------
x | number | The x coordinate of the top left corner of the axis' rendering area.
y | number | The y coordinate of the top left corner of the series' rendering area.
children | ReactNode | A React node used to render the axis.

### ArgumentAxis.TickProps

Describes properties passed to a component that renders a tick line.

Field | Type | Description
------|------|------------
x1 | number | The x coordinate of the line's start.
x2 | number | The x coordinate of the line's end.
y1 | number | The y coordinate of the line's start.
y2 | number | The y coordinate of the line's end.

### ArgumentAxis.LabelProps

Describes properties passed to a component that renders the axis label.

Field | Type | Description
------|------|------------
text | string &#124; number | The label text.
x | number | The x coordinate of the label's top left corner.
y | number | The y coordinate of the label's top left corner.
dominantBaseline | 'hanging' &#124; 'middle' &#124; 'baseline' | The label's baseline.
textAnchor | 'start' &#124; 'middle' &#124; 'end' | The label's text alignment.

### ArgumentAxis.LineProps

Describes properties passed to a component that renders the axis line.

Field | Type | Description
------|------|------------
width | number | The line width.
height | number | The line height.
orientation | 'horizontal' &#124; 'vertical' | The axis orientation.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ArgumentAxis.Root | [ArgumentAxis.RootProps](#argumentaxisrootprops) | A component that renders the axis root layout.
ArgumentAxis.Tick | [ArgumentAxis.TickProps](#argumentaxistickprops) | A component that renders the tick.
ArgumentAxis.Label | [ArgumentAxis.LabelProps](#argumentaxislabelprops) | A component that renders the axis label.
ArgumentAxis.Line | [ArgumentAxis.LineProps](#argumentaxislineprops) | A component that renders the axis line.
