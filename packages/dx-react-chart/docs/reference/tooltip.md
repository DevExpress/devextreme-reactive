# Tooltip Plugin Reference

The `Tooltip` plugin implements a tooltip that shows information about a point. The tooltip appears when a user hovers the mouse pointer over a series point.

## Import

Use the following statement to import the plugin:

```js
import { Tooltip } from '@devexpress/dx-react-chart-material-ui';
//import { Tooltip } from '@devexpress/dx-react-chart-bootstrap4';
```

## User Reference

### Dependencies

- [EventTracker](event-tracker.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
defaultTargetItem? | [SeriesRef](./event-tracker.md#seriesref) | | An item for which the tooltip is displayed initially.
targetItem? | [SeriesRef](./event-tracker.md#seriesref) | | An item for which the tooltip is displayed.
onTargetItemChange? | (target: [SeriesRef](./event-tracker.md#seriesref)) => void | | A function that is executed when the target item changes.
overlayComponent | ComponentType&lt;[Tooltip.OverlayProps](#tooltipoverlayprops)&gt; | | A component that renders the tooltip.
contentComponent | ComponentType&lt;[Tooltip.ContentProps](#tooltipcontentprops)&gt; | | A component that renders the tooltip content.

## Interfaces

### Tooltip.OverlayProps

Describes properties passed to a component that renders the tooltip.

Field | Type | Description
------|------|------------
target | [referenceObject]https://popper.js.org/popper-documentation.html#referenceObject | An object that provides an interface compatible with Popper.js.
children | ReactNode | A React node used to render the content.

### Tooltip.ContentProps

Describes properties passed to a component that renders the tooltip's content.

Field | Type | Description
------|------|------------
text | string | The component's text.
targetItem | [SeriesRef](./event-tracker.md#seriesref) | An item for which the tooltip is displayed.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Tooltip.Overlay | [Tooltip.OverlayProps](#tooltipoverlayprops) | A component that renders the tooltip.
Tooltip.Content | [Tooltip.ContentProps](#tooltipcontentprops) | A component that renders the tooltip content.
