# Chart Reference

The Chart is a root container component designed to process and display data specified via the `data` property. The Chart's functionality (data visualization and data processing) is implemented in several plugins specified as child components.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Chart } from '@devexpress/dx-react-chart-material-ui';
// import { Chart } from '@devexpress/dx-react-chart-bootstrap4';
```

You can import the themeless plugin to use custom components:

```js
import { Chart } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
data | Array&lt;any&gt; | | An array containing custom data.
width? | number | undefined | Chart width.
height? | number | 500 | Chart height.
rotated | boolean | false | Rotates the chart.
rootComponent | ComponentType&lt;[Chart.RootProps](#chartrootprops)&gt; | | A component that renders the chart's root layout.
children? | ReactNode | | A React node used to render the chart content.

## Interfaces

### Chart.RootProps

Describes properties passed to a component that renders the chart root layout.

Field | Type | Description
------|------|------------
children | ReactNode | A React node to be placed in the root layout.

### Chart.LabelProps

Describes properties passed to a component that renders the chart's label.

Field | Type | Description
------|------|------------
children | string &#124; number | The label text.
x | number | The x coordinate of the label's top left corner.
y | number | The y coordinate of the label's top left corner.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Chart.Label | [Chart.LabelProps](#chartlabelprops) | A component that renders the chart's label.
