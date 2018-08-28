# Grid Plugin Reference

The Grid plugin visualizes a grid for the specified axis.

## Import

Use the following statement to import the plugin:

```js
import { Grid } from '@devexpress/dx-react-chart-material-ui';
// import { Grid } from '@devexpress/dx-react-chart-bootstrap4';
```

You can import the themeless plugin to use custom components:

```js
import { Grid } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | | An axis name.
lineComponent | ComponentType&lt;[Grid.LineProps](#gridlineprops)&gt; | | A component that renders a grid line.

## Interfaces

### Grid.LineProps

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
Grid.Line | [Grid.LineProps](#gridlineprops) | A component that renders a grid line.
