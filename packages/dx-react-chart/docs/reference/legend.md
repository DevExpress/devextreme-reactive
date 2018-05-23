# Legend Plugin Reference

The Legend plugin allows to visualize legend.

## Importing

Use the following import statement:

```js
import { Legend } from '@devexpress/dx-react-chart-material-ui';
// import { Legend } from '@devexpress/dx-react-chart-bootstrap4';
```
## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
markerComponent | ComponentType&lt;Legend.MarkerProps&gt; | | A component that renders the marker.
labelComponent | ComponentType&lt;[Legend.LabelProps](#legendlabelprops)&gt; | | A component that renders the label.
rootComponent | ComponentType&lt;[Legend.RootProps](#legendrootprops)&gt; | | A component that renders the root.
itemComponent | ComponentType&lt;[Legend.ItemProps](#legenditemprops)&gt; | | A component that renders the item.
position | 'left' &#124; 'right' &#124; 'top' &#124; 'bottom' | 'right' | Legend position.

## Interfaces

### Legend.LabelProps

Describes properties passed to a component that renders the label.

Field | Type | Description
------|------|------------
text | string &#124; number | Item text.

### Legend.RootProps

Describes properties passed to a component that renders the root.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render legend root.

### Legend.ItemProps

Describes properties passed to a component that renders the item.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render item.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Legend.Root | [Legend.RootProps](#legendrootprops) | A component that renders the root.
Legend.Item | [Legend.ItemProps](#legenditemprops) | A component that renders the item.
Legend.Marker | Legend.MarkerProps | A component that renders the marker.
Legend.Label | [Legend.LabelProps](#legendlabelprops) | A component that renders the label.
