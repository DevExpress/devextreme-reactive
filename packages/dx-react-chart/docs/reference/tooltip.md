# Tooltip Plugin Reference

The `Tooltip` plugin  implements a tooltip to show information about a point. The tooltip appears when the user hovers the points of a series.

## Import

Use the following statement to import the plugin:

```js
import { Tooltip } from '@devexpress/dx-react-chart-material-ui';
//import { Tooltip } from '@devexpress/dx-react-chart-bootstrap4';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
defaultTargetItem? | [SeriesRef](./event-tracker.md#seriesref) | | An item on which the tooltip is initially displayed.
targetItem? | [SeriesRef](./event-tracker.md#seriesref) | | An item on which the tooltip is displayed.
onTargetItemChange? | (target: [SeriesRef](./event-tracker.md#seriesref)) => void | | A function that is executed when the item for tooltip is changed.
overlayComponent | ComponentType&lt;[Tooltip.OverlayProps](#tooltipoverlayprops)&gt; | | A component that renders the tooltip.
contentComponent | ComponentType&lt;[Tooltip.ContentProps](#tooltipcontentprops)&gt; | | A component that renders the tooltip content.

## Interfaces

### Tooltip.OverlayProps

Describes properties passed to a component that renders the tooltip.

Field | Type | Description
------|------|------------
target | () => HTMLElement | A function that returns an HTML element that is used for tooltip positioning.
children | ReactNode | A React node used to render the axis.

### Tooltip.ContentProps

Describes properties passed to a component that renders the tooltip content.

Field | Type | Description
------|------|------------
text | string | A text of the component.
targetItem | [SeriesRef](./event-tracker.md#seriesref) | An item on which the tooltip is displayed.
