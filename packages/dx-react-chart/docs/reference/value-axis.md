# ValueAxis Plugin Reference

The ValueAxis plugin allows to visualize value axis.

## Importing

Use the following import statement:

```js
import { ValueAxis } from '@devexpress/dx-react-chart-material-ui';
// import { ValueAxis } from '@devexpress/dx-react-chart-bootstrap4';
```
## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tickSize | number | 5 | Length of the tick.
position | 'left' &#124; 'right' | 'left' | Axis position.
name | string | | Axis name.
indentFromAxis | number | 10 | Indent from axis
rootComponent | ComponentType&lt;[ValueAxis.RootProps](#valueaxisrootprops)&gt; | | A component that renders the root.
tickComponent | ComponentType&lt;[ValueAxis.TickProps](#valueaxistickprops)&gt; | | A component that renders the tick.
labelComponent | ComponentType&lt;[ValueAxis.LabelProps](#valueaxislabelprops)&gt; | | A component that renders the label.
lineComponent | ComponentType&lt;[ValueAxis.LineProps](#valueaxislineprops)&gt; | | A component that renders the line.

## Interfaces

### ValueAxis.RootProps

Describes properties passed to a component that renders the root.

Field | Type | Description
------|------|------------
x | number | The x coordinate for rendering axis.
y | number | The y coordinate for rendering axis.
children | ReactNode | A React node used to render axis.

### ValueAxis.TickProps

Describes properties passed to a component that renders the tick.

Field | Type | Description
------|------|------------
x1 | number | The start of the line on the x.
x2 | number | The end of the line on the x.
y1 | number | The start of the line on the y.
y2 | number | The end of the line on the y.

### ValueAxis.LabelProps

Describes properties passed to a component that renders the label.

Field | Type | Description
------|------|------------
text | string &#124; number | A label text.
x | number | The x coordinate of a label.
y | number | The y coordinate of a label.
dominantBaseline | 'hanging' &#124; 'middle' &#124; 'baseline' | Baseline of a label.
textAnchor | 'start' &#124; 'middle' &#124; 'end' | Alignment of a label.

### ValueAxis.LineProps

Describes properties passed to a component that renders the line of axis.

Field | Type | Description
------|------|------------
width | number | The width of the line.
height | number | The height of the line.
orientation | 'horizontal' &#124; 'vertical' | Horizontal or vertical orientation of the axis.
