# ArgumentGrid Plugin Reference

The ArgumentGrid plugin visualizes a grid for the argument axis.

## Import

Use the following statement to import the plugin:

```js
import { ArgumentGrid } from '@devexpress/dx-react-chart-material-ui';
// import { ArgumentGrid } from '@devexpress/dx-react-chart-bootstrap4';
```

You can import the themeless plugin to use custom components:

```js
import { ArgumentGrid } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | | An axis name.
lineComponent | ComponentType&lt;[ArgumentGrid.LineProps](#argumentgridlineprops)&gt; | | A component that renders a grid line.

## Interfaces

### ArgumentGrid.LineProps

Describes properties passed to a component that renders a grid line.

Field | Type | Description
------|------|------------
x1 | number | The line start's x coordinate.
x2 | number | The line end's x coordinate.
y1 | number | The line start's y coordinate.
y2 | number | The line end's y coordinate.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ArgumentGrid.Line | [ArgumentGrid.LineProps](#argumentgridlineprops) | A component that renders a grid line.
