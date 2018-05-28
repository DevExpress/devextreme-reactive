# Grid Plugin Reference

The Grid plugin allows to visualize a grid for axis.

## Importing

Use the following import statement:

```js
import { Grid } from '@devexpress/dx-react-chart-material-ui';
// import { Grid } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Grid } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | | Axis name.
rootComponent | ComponentType&lt;[Grid.RootProps](#gridrootprops)&gt; | | A component that renders the root.
lineComponent | ComponentType&lt;[Grid.LineProps](#gridlineprops)&gt; | | A component that renders the line.

## Interfaces

### Grid.RootProps

Describes properties passed to a component that renders the root.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render grid.

### Grid.LineProps

Describes properties passed to a component that renders the line.

Field | Type | Description
------|------|------------
x1 | number | The start of the line on the x.
x2 | number | The end of the line on the x.
y1 | number | The start of the line on the y.
y2 | number | The end of the line on the y.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Grid.Root | [Grid.RootProps](#gridrootprops) | A component that renders the root.
Grid.Line | [Grid.LineProps](#gridlineprops) | A component that renders the line.
