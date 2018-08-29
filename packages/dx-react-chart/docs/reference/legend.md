# Legend Plugin Reference

The Legend plugin visualizes the legend.

## Import

Use the following statement to import the plugin:

```js
import { Legend } from '@devexpress/dx-react-chart-material-ui';
// import { Legend } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Legend } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
markerComponent | ComponentType&lt;object&gt; | | A component that renders a marker.
labelComponent | ComponentType&lt;[Legend.LabelProps](#legendlabelprops)&gt; | | A component that renders the legend label.
rootComponent | ComponentType&lt;[Legend.RootProps](#legendrootprops)&gt; | | A component that renders the legend's root layout.
itemComponent | ComponentType&lt;[Legend.ItemProps](#legenditemprops)&gt; | | A component that renders a legend item.
position? | 'left' &#124; 'right' &#124; 'top' &#124; 'bottom' | 'right' | The legend position.

## Interfaces

### Legend.LabelProps

Describes properties passed to a component that renders the label.

Field | Type | Description
------|------|------------
text | string &#124; number | Item text.

### Legend.RootProps

Describes properties passed to a component that renders the legend's root layout.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the legend's root layout.

### Legend.ItemProps

Describes properties passed to a component that renders a legend item.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render an item.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Legend.Root | [Legend.RootProps](#legendrootprops) | A component that renders the root layout.
Legend.Item | [Legend.ItemProps](#legenditemprops) | A component that renders an item.
Legend.Marker | object | A component that renders a marker.
Legend.Label | [Legend.LabelProps](#legendlabelprops) | A component that renders the label.
