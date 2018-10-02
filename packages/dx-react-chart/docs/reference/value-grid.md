# ValueGrid Plugin Reference

The ValueGrid plugin visualizes a grid for the value axis.

## Import

Use the following statement to import the plugin:

```js
import { ValueGrid } from '@devexpress/dx-react-chart-material-ui';
// import { ValueGrid } from '@devexpress/dx-react-chart-bootstrap4';
```

You can import the themeless plugin to use custom components:

```js
import { ValueGrid } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | | An axis name.
lineComponent | ComponentType&lt;[ValueGrid.LineProps](#valuegridlineprops)&gt; | | A component that renders a grid line.

## Interfaces

### ValueGrid.LineProps

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
ValueGrid.Line | [ValueGrid.LineProps](#valuegridlineprops) | A component that renders a grid line.
