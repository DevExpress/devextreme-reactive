# ArgumentAxis Plugin Reference

The ArgumentAxis plugin allows to visualize argument axis.

## Importing

Use the following import statement:

```js
import { ArgumentAxis } from '@devexpress/dx-react-chart-material-ui';
// import { ArgumentAxis } from '@devexpress/dx-react-chart-bootstrap4';
```
## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tickSize | number | 5 | Length of a tick.
position | 'bottom' &#124; 'top' | 'bottom' | Axis position.
name | string | | Axis name.
indentFromAxis | number | 10 | Indent from axis
rootComponent | ComponentType&lt;[ArgumentAxis.RootProps](#argumentaxisrootprops)&gt; | | A component that renders the root.
tickComponent | ComponentType&lt;[ArgumentAxis.TickProps](#argumentaxistickprops)&gt; | | A component that renders the tick.
labelComponent | ComponentType&lt;[ArgumentAxis.LabelProps](#argumentaxislabelprops)&gt; | | A component that renders the label.
lineComponent | ComponentType&lt;[ArgumentAxis.LineProps](#argumentaxislineprops)&gt; | | A component that renders the line.

## Interfaces

### ArgumentAxis.RootProps

Describes properties passed to a component that renders the root.

Field | Type | Description
------|------|------------
x | number | The x coordinate for rendering axis.
y | number | The y coordinate for rendering axis.
children | ReactNode | A React node used to render axis.

### ArgumentAxis.TickProps

Describes properties passed to a component that renders the tick.

Field | Type | Description
------|------|------------
x1 | number | The start of the line on the x.
x2 | number | The end of the line on the x.
y1 | number | The start of the line on the y.
y2 | number | The end of the line on the y.

### ArgumentAxis.LabelProps

Describes properties passed to a component that renders the label.

Field | Type | Description
------|------|------------
text | string &#124; number | A label text.
x | number | The x coordinate of a label.
y | number | The y coordinate of a label.
dominantBaseline | 'hanging' &#124; 'middle' &#124; 'baseline' | Baseline of a label.
textAnchor | 'start' &#124; 'middle' &#124; 'end' | Alignment of a label.

### ArgumentAxis.LineProps

Describes properties passed to a component that renders the line of axis.

Field | Type | Description
------|------|------------
width | number | The width of the line.
height | number | The height of the line.
orientation | 'horizontal' &#124; 'vertical' | Orientation of the axis.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ArgumentAxis.Root | [ArgumentAxis.RootProps](#argumentaxisrootprops) | A component that renders the root.
ArgumentAxis.Tick | [ArgumentAxis.TickProps](#argumentaxistickprops) | A component that renders the tick.
ArgumentAxis.Label | [ArgumentAxis.LabelProps](#argumentaxislabelprops) | A component that renders the label.
ArgumentAxis.Line | [ArgumentAxis.LineProps](#argumentaxislineprops) | A component that renders the line.
